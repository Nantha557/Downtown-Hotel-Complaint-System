import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function UserManagement() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("IT");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post("/auth/register", {
        username,
        password,
        role,
      });

      alert("User Created Successfully");

      setUsername("");
      setPassword("");
      setRole("IT");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create user"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Layout>

      <div className="p-4 md:p-8">

        <div className="mb-8">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">

            User Management

          </h1>

          <p className="text-gray-500 mt-2">

            Create staff accounts for hotel departments

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 max-w-2xl">

          <form
            onSubmit={handleCreateUser}
            className="space-y-6"
          >

            <div>

              <label className="block text-gray-700 font-medium mb-2">

                Username

              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block text-gray-700 font-medium mb-2">

                Password

              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block text-gray-700 font-medium mb-2">

                Department

              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              >

                <option value="Maintenance">
                  Maintenance
                </option>

                <option value="Housekeeping">
                  Housekeeping
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >

              {loading
                ? "Creating User..."
                : "Create User"}

            </button>

          </form>

        </div>

      </div>

    </Layout>

  );

}

export default UserManagement;