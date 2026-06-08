import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function UserManagement() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [role, setRole] = useState("Maintenance");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
const [editingUser, setEditingUser] = useState(null);

const fetchUsers = async () => {

  try {

    const response = await API.get(
      "/auth/users"
    );

    setUsers(response.data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchUsers();

}, []);

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
      fetchUsers();
      setUsername("");
      setPassword("");
      setRole("Maintenance");

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

  const updateRole = async (
  id,
  role
) => {

  try {

    await API.put(
      `/auth/users/${id}`,
      {
        role,
      }
    );

    fetchUsers();

    setEditingUser(null);

  } catch (error) {

    console.log(error);

  }

};

const deleteUser = async (
  id
) => {

  const confirmDelete =
    window.confirm(
      "Delete this user?"
    );

  if (!confirmDelete)
    return;

  try {

    await API.delete(
      `/auth/users/${id}`
    );

    fetchUsers();

  } catch (error) {

    console.log(error);

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

        <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

  <h2 className="text-2xl font-bold mb-6">

    Existing Users

  </h2>

  <div className="space-y-4">

    {users.map((user) => (

      <div

        key={user._id}

        className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"

      >

        <div>

          <h3 className="font-bold">

            {user.username}

          </h3>

        </div>

        {editingUser === user._id ? (

          <div className="flex gap-2">

            <select

              defaultValue={user.role}

              onChange={(e) =>
                updateRole(
                  user._id,
                  e.target.value
                )
              }

              className="border rounded-xl px-3 py-2"

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

        ) : (

          <div className="flex items-center gap-3">

            <span className="font-medium">

              {user.role}

            </span>

            <button

              onClick={() =>
                setEditingUser(
                  user._id
                )
              }

              className="bg-blue-500 text-white px-3 py-2 rounded-xl"

            >

              Edit

            </button>

            {user.username !==
              localStorage.getItem(
                "username"
              ) && (

              <button

                onClick={() =>
                  deleteUser(
                    user._id
                  )
                }

                className="bg-red-500 text-white px-3 py-2 rounded-xl"

              >

                Delete

              </button>

            )}

          </div>

        )}

      </div>

    ))}

  </div>

</div>

      </div>

    </Layout>

    

  );

}

export default UserManagement;