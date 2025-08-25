import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSideBar = () => {

    const user = {
        firstName: 'Adaku',
        lastName: 'Onyechere',
        imageUrl: assets.profile,
    }

    const adminNavlinks = [
        {name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon},
        {name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon},
        {name: 'List Shows', path: '/admin/list-shows', icon: ListIcon},
        {name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon},
    ]

  return (
    <div className="fixed left-0 top-16 h-full z-40 flex h-screen w-16 md:w-60 flex-col items-center pt-8 border-r border-gray-300/20 bg-black/60">
      <img className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto" src={user.imageUrl} 
        alt="sidebar" 
      />
      <p className="mt-2 text-base hidden md:block">
        {user.firstName} {user.lastName}
      </p>

      <div className="mt-6 w-full flex-1">
        {adminNavlinks.map((link, index) => (
          <NavLink key={index} to={link.path} end className={({ isActive }) =>
              `relative flex items-center md:justify-start justify-center gap-2 px-2 md:px-6 py-2.5 text-gray-400 hover:text-primary transition ${isActive ? "bg-primary/15 text-primary" : ""}`
            }
          >
            <link.icon className="w-5 h-5" />
            <p className="hidden md:block">{link.name}</p>
            {({ isActive }) =>
              isActive && <span className="absolute right-0 w-1.5 h-10 bg-primary rounded-l" />
            }
          </NavLink>
        ))}
      </div>
    </div>

  )
}

export default AdminSideBar
