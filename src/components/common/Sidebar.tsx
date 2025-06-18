import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Briefcase, FileCheck, FileSearch } from "lucide-react"
import { Link } from "react-router"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold">Audit UI</h2>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link to="/" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <FileCheck className="mr-2 h-4 w-4" />
              Closed Role Audit
            </Button>
          </Link>
          <Link to="/open-role-audit" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <FileSearch className="mr-2 h-4 w-4" />
              Open Role Audit
            </Button>
          </Link>
          <Link to="/scraped-positions" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              Scraped Positions
            </Button>
          </Link>
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