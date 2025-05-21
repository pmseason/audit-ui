import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <a href="/" className="text-sm font-medium">Dashboard</a>
              <a href="/jobs" className="text-sm font-medium">Jobs</a>
              <a href="/analytics" className="text-sm font-medium">Analytics</a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-4 flex items-center space-x-4">
          <h1 className="text-xl font-bold">Career Season Audit //</h1>
        </div>
      </div>
    </header>
  )
} 