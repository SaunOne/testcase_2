import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { AppBar } from "./AppBar"

const getBreadcrumb = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumb: { label: string; href?: string }[] = []

  if (segments[0] === "outbound") {
    breadcrumb.push({ label: "Outbound", href: "/outbound" })
    if (segments[1] === "create-do") {
      breadcrumb.push({ label: "Create DO" })
    }
  }

  return breadcrumb
}

export function MainLayout() {
  const location = useLocation()
  const breadcrumb = getBreadcrumb(location.pathname)

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="ml-60 flex flex-col min-h-screen">
        {/* AppBar - sticky */}
        <AppBar breadcrumb={breadcrumb} />

        {/* Content wrapper - background gray */}
        <div className="flex-1 bg-gray-100">
          {/* Inner content dengan rounded top-left */}
          <main className="bg-gray-50 min-h-full rounded-tl-3xl p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
