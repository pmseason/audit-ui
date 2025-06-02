import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { store } from './store'
import './index.css'
import ClosedRoleAudit from './pages/ClosedRoleAudit'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClosedRoleAudit />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <RouterProvider router={router} />
      </SidebarProvider>
    </Provider>
  </StrictMode>,
)
