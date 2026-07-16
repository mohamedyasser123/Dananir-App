import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/globals.css"
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { router } from './routes';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster richColors position="top-center" />
        </QueryClientProvider>
  </StrictMode>,
)
