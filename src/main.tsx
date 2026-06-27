import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './i18n'
import './styles/globals.css'
import './styles/animations.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, staleTime: 1000 * 60 * 5 } },
})

async function startApp() {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <Toaster position="top-center" reverseOrder />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

startApp()
