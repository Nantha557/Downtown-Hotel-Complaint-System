import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import Departments from "./pages/Departments";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ITDashboard from "./pages/ITDashboard";
import GuestPortal from "./pages/GuestPortal";

import HousekeepingDashboard from "./pages/HousekeepingDashboard";

import MaintenanceDashboard from "./pages/MaintenanceDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import UserManagement from "./pages/UserManagement";

import MaintenanceGuest from "./pages/MaintenanceGuest";

import HousekeepingGuest from "./pages/HousekeepingGuest";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        

        <Route
          path="/guest"
          element={<GuestPortal />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/it-dashboard"
          element={
            <ProtectedRoute allowedRole="IT">

              <ITDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/housekeeping-dashboard"
          element={
            <ProtectedRoute allowedRole="Housekeeping">

              <HousekeepingDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance-dashboard"
          element={
            <ProtectedRoute allowedRole="Maintenance">

              <MaintenanceDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={<Complaints />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
  path="/maintenance"
  element={<MaintenanceGuest />}
/>



<Route
  path="/housekeeping"
  element={<HousekeepingGuest />}
/>

      </Routes>

    </BrowserRouter>
    

  );

}

export default App;