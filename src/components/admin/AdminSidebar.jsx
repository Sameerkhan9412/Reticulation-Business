import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  UserCheck,
} from "lucide-react";

const AdminSidebar = () => {
  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: UserCheck },
    { to: "/admin/jobseekers", label: "Jobseekers", icon: Users },
    { to: "/admin/suppliers", label: "Suppliers", icon: Briefcase },
    { to: "/admin/payments", label: "Payments", icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 flex flex-col">
      {/* Logo / Title */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
