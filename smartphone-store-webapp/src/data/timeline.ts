export interface TimelineEvent {
  id: string
  year: string
  titleKey: string
  descKey: string
  image: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    year: '2010',
    titleKey: 'timeline.e1Title',
    descKey: 'timeline.e1Desc',
    image: '/assets/images/showroom.jpg',
  },
  {
    id: '2',
    year: '2014',
    titleKey: 'timeline.e2Title',
    descKey: 'timeline.e2Desc',
    image: '/assets/images/retail.jpg',
  },
  {
    id: '3',
    year: '2018',
    titleKey: 'timeline.e3Title',
    descKey: 'timeline.e3Desc',
    image: '/assets/brands/apple.jpg',
  },
  {
    id: '4',
    year: '2021',
    titleKey: 'timeline.e4Title',
    descKey: 'timeline.e4Desc',
    image: '/assets/brands/samsung.jpg',
  },
  {
    id: '5',
    year: '2023',
    titleKey: 'timeline.e5Title',
    descKey: 'timeline.e5Desc',
    image: '/assets/brands/xiaomi.jpg',
  },
  {
    id: '6',
    year: '2025',
    titleKey: 'timeline.e6Title',
    descKey: 'timeline.e6Desc',
    image: '/assets/images/technology.jpg',
  },
]
