import { useCallback, useEffect, useRef } from 'react'

export function useEngineHum() {
  const audioRef = useRef<{
    context: AudioContext
    oscillator: OscillatorNode
    gain: GainNode
    filter: BiquadFilterNode
  } | null>(null)

  const stopHum = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const { context, oscillator, gain } = audio
    const now = context.currentTime
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(gain.gain.value, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    window.setTimeout(() => {
      oscillator.stop()
      oscillator.disconnect()
      gain.disconnect()
      audio.filter.disconnect()
      void context.close()
      audioRef.current = null
    }, 400)
  }, [])

  const playHum = useCallback(() => {
    if (audioRef.current) {
      stopHum()
      return
    }

    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const filter = context.createBiquadFilter()
    const lfo = context.createOscillator()
    const lfoGain = context.createGain()

    oscillator.type = 'sawtooth'
    oscillator.frequency.value = 52

    lfo.type = 'sine'
    lfo.frequency.value = 6
    lfoGain.gain.value = 8
    lfo.connect(lfoGain)
    lfoGain.connect(oscillator.frequency)

    filter.type = 'lowpass'
    filter.frequency.value = 180
    filter.Q.value = 0.8

    gain.gain.value = 0.0001
    oscillator.connect(filter)
    filter.connect(gain)
    gain.connect(context.destination)

    const now = context.currentTime
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.12)

    oscillator.start()
    lfo.start()

    audioRef.current = { context, oscillator, gain, filter }
  }, [stopHum])

  useEffect(() => () => stopHum(), [stopHum])

  return { playHum, stopHum, isPlaying: () => audioRef.current !== null }
}
