import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/globals.css"
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
  </StrictMode>,
)
