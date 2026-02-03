import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import clsx from "clsx"
import {
  HiOutlineViewGrid,
  HiOutlineDownload,
  HiOutlineUpload,
  HiOutlineCollection,
  HiOutlineDocumentReport,
  HiOutlineDatabase,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
} from "react-icons/hi"

interface MenuItem {
  name: string
  icon: React.ReactNode
  path?: string
  children?: { name: string; path: string }[]
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    name: "Inbound",
    icon: <HiOutlineDownload className="w-5 h-5" />,
    path: "/inbound",
  },
  {
    name: "Outbound",
    icon: <HiOutlineUpload className="w-5 h-5" />,
    children: [{ name: "Create DO", path: "/outbound/create-do" }],
  },
  {
    name: "Inv Management",
    icon: <HiOutlineCollection className="w-5 h-5" />,
    children: [{ name: "Stock Overview", path: "/inventory/stock" }],
  },
  {
    name: "Report",
    icon: <HiOutlineDocumentReport className="w-5 h-5" />,
    children: [{ name: "Stock Report", path: "/report/stock" }],
  },
  {
    name: "Master Data",
    icon: <HiOutlineDatabase className="w-5 h-5" />,
    children: [{ name: "Items", path: "/master/items" }],
  },
]

export function Sidebar() {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Outbound"])

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    )
  }

  const isPathActive = (path?: string, children?: { path: string }[]) => {
    if (path && location.pathname.startsWith(path)) return true
    if (children) {
      return children.some((child) => location.pathname.startsWith(child.path))
    }
    return false
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.08)] flex flex-col z-50">
      {/* Logo */}
      <div className="p-4 ">
        <div className="flex items-center gap-2">
          <img
            src="/public/logo_tirtamas.png"
            alt="TCL Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl text-gray-800">TCL</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = isPathActive(item.path, item.children)
            const isExpanded = expandedItems.includes(item.name)
            const hasChildren = item.children && item.children.length > 0

            return (
              <li key={item.name}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={clsx(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        {
                          "bg-primary-500 text-white": isActive,
                          "text-gray-600 hover:bg-gray-100": !isActive,
                        },
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      {isExpanded ? (
                        <HiOutlineChevronDown className="w-4 h-4" />
                      ) : (
                        <HiOutlineChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.children?.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                clsx(
                                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                                  {
                                    "text-primary-600 font-medium": isActive,
                                    "text-gray-600 hover:bg-gray-100":
                                      !isActive,
                                  },
                                )
                              }
                            >
                              {child.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path || "#"}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        {
                          "bg-primary-500 text-white": isActive,
                          "text-gray-600 hover:bg-gray-100": !isActive,
                        },
                      )
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-medium">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              System Admin
            </p>
            <p className="text-xs text-gray-500 truncate">
              systemadmin123@gmail.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
