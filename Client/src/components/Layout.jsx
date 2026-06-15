import {

  LayoutDashboard,

  ClipboardList,

  Building2,

  Bell,

  Settings,

  LogOut,

  Menu,

} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

function Layout({ children }) {

  const role = localStorage.getItem("role");

  const theme =
  localStorage.getItem("theme") || "light";

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

    navigate("/");

  };

  const dashboardRoute =
  role === "admin"
    ? "/dashboard"
    : role === "maintenance"
    ? "/maintenance-dashboard"
    : role === "housekeeping"
    ? "/housekeeping-dashboard"
    : role === "supervisor"
    ? "/supervisor-dashboard"
    : "/";

  return (

    <div
  className={`min-h-screen flex ${
    theme === "dark"
      ? "bg-gray-900 text-white"
      : "bg-[#f4f7fb]"
  }`}
>

      {/* MOBILE TOPBAR */}

      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#111827] text-white px-5 py-4 flex items-center justify-between z-50 shadow-lg">

        <h1 className="text-2xl font-bold">

          Downtown Business hotel

        </h1>

        <button

          onClick={() => setOpen(!open)}

        >

          <Menu size={30} />

        </button>

      </div>

      {/* MOBILE MENU */}

      {

        open && (

          <div className="md:hidden fixed top-16 left-0 right-0 bg-[#111827] text-white p-6 z-40 shadow-lg rounded-b-3xl">

            <div className="space-y-4">

              <Link

                to={dashboardRoute}

                className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl"

                onClick={() => setOpen(false)}

              >

                <LayoutDashboard size={20} />

                Dashboard

              </Link>

              <Link

                to="/complaints"

                className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition"

                onClick={() => setOpen(false)}

              >

                <ClipboardList size={20} />

                Complaints

              </Link>

              <Link

                to="/departments"

                className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition"

                onClick={() => setOpen(false)}

              >

                <Building2 size={20} />

                Departments

              </Link>

              <Link

                to="/notifications"

                className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition"

                onClick={() => setOpen(false)}

              >

                <Bell size={20} />

                Notifications

              </Link>

              <Link

                to="/settings"

                className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition"

                onClick={() => setOpen(false)}

              >

                <Settings size={20} />

                Settings

              </Link>

              <button

                onClick={handleLogout}

                className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition mt-4"

              >

                <LogOut size={20} />

                Logout

              </button>

            </div>

          </div>

        )

      }

      {/* DESKTOP SIDEBAR */}

      <div className="hidden md:flex w-72 bg-[#111827] text-white p-6 flex-col">

        {/* LOGO */}

        <div className="mb-2">

          <h1 className="text-2xl font-bold tracking-wide">

            DownTown Business Hotel

          </h1>

          <p className="text-gray-400 mt-2 text-sm">

          </p>

        </div>

        {/* MENU */}

        <div className="space-y-3">

          <Link

            to={dashboardRoute}

            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl px-5 py-4 transition"

          >

            <LayoutDashboard size={22} />

            Dashboard

          </Link>

          <Link

            to="/complaints"

            className="flex items-center gap-4 hover:bg-white/10 rounded-2xl px-5 py-4 transition"

          >

            <ClipboardList size={22} />

            Complaints

          </Link>

          <Link

            to="/departments"

            className="flex items-center gap-4 hover:bg-white/10 rounded-2xl px-5 py-4 transition"

          >

            <Building2 size={22} />

            Departments

          </Link>

          <Link

            to="/notifications"

            className="flex items-center gap-4 hover:bg-white/10 rounded-2xl px-5 py-4 transition"

          >

            <Bell size={22} />

            Notifications

          </Link>

          <Link

            to="/settings"

            className="flex items-center gap-4 hover:bg-white/10 rounded-2xl px-5 py-4 transition"

          >

            <Settings size={22} />

            Settings

          </Link>

        </div>

        {role === "admin" && (

  <Link

    to="/users"

    className="flex items-center gap-4 hover:bg-white/10 rounded-2xl px-5 py-4 transition"

  >

    User Management

  </Link>

)}

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="mt-auto flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-2xl transition"

        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

      {/* PAGE CONTENT */}

      <div
  className={`flex-1 pt-20 md:pt-0 overflow-x-hidden ${
    theme === "dark"
      ? "bg-gray-900 text-white"
      : ""
  }`}
>

        {children}

      </div>

    </div>

  );

}

export default Layout;