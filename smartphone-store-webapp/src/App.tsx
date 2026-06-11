import { BrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { AppRoutes } from '@/routes'
import { useLenis } from '@/hooks/useLenis'

function AppContent() {
  useLenis()

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
