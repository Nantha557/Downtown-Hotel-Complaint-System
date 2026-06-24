
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { useEffect, useState } from "react";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (token && role) {

    if (role === "Admin") {

      navigate(
        "/admin-orders"
      );

    }

    else if (
      role === "Kitchen"
    ) {

      navigate(
        "/kitchen-orders"
      );

    }

    else if (
      role === "RoomService"
    ) {

      navigate(
        "/room-service"
      );

    }

    else if (
      role === "Manager"
    ) {

      navigate(
        "/menu-management"
      );

    }

  }

}, []);

  const [formData, setFormData] = useState({

    username: "",

    password: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(

        "/auth/login",

        formData

      );

      console.log(response.data);

      // SAVE LOGIN DATA

      localStorage.setItem(

        "token",

        response.data.token

      );

      localStorage.setItem(

        "role",

        response.data.role.toLowerCase()

      );

      localStorage.setItem(

        "username",

        response.data.username

      );

      // REDIRECT BASED ON ROLE

      const role = response.data.role.toLowerCase();

      if (role === "admin") {

        navigate("/dashboard");

      }

      else if (role === "it") {

        navigate("/it-dashboard");

      }

      else if (role === "housekeeping") {

        navigate("/housekeeping-dashboard");

      }

      else if (role === "maintenance") {

        navigate("/maintenance-dashboard");

      }
      else if (role === "supervisor") {

        navigate("/supervisor-dashboard");

      }

      else {

        navigate("/departments");

      }

    } catch (error) {

      alert("Invalid credentials");

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb] p-4">

      <form

        onSubmit={handleLogin}

        className="bg-white p-8 md:p-10 rounded-3xl shadow-md w-full max-w-md"

      >

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">

          DownTown Login

        </h1>

        <input

          type="text"

          name="username"

          placeholder="Username"

          onChange={handleChange}

          className="w-full border p-4 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500"

        />

        <input

          type="password"

          name="password"

          placeholder="Password"

          onChange={handleChange}

          className="w-full border p-4 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-blue-500"

        />

        <button

          type="submit"

          className="w-full bg-[#111827] hover:bg-black transition text-white p-4 rounded-xl font-semibold"

        >

          Login

        </button>

      </form>

    </div>

  );

}

export default Login;