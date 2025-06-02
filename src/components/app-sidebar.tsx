import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { HomeIcon, SettingsIcon, UsersIcon } from "lucide-react"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Audit UI</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button variant="ghost" className="w-full justify-start">
            <HomeIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <UsersIcon className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-sm text-muted-foreground">
          © 2024 Audit UI
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 