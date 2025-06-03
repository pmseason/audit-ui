import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { store } from './store'
import './index.css'
import ClosedRoleAudit from './pages/ClosedRoleAudit'
import { SidebarProvider } from './components/ui/sidebar'
import OpenRoleAudit from './pages/OpenRoleAudit'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClosedRoleAudit />,
  },
  {
    path: "/open-role-audit",
    element: <OpenRoleAudit />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SidebarProvider defaultOpen={false}>
        <RouterProvider router={router} />
      </SidebarProvider>
    </Provider>
  </StrictMode>,
)
