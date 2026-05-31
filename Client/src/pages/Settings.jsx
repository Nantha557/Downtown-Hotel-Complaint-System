import { useEffect, useState } from "react";

import {

  Bell,

  Volume2,

  Save,

} from "lucide-react";

import Layout from "../components/Layout";

import API from "../services/api";

function Settings() {

  const [yellowTime, setYellowTime] = useState(20);

  const [redTime, setRedTime] = useState(30);

  const [soundEnabled, setSoundEnabled] = useState(true);

  const [theme, setTheme] = useState("light");

  const [viewHours, setViewHours] = useState(24);

  // FETCH SETTINGS

  const fetchSettings = async () => {

    try {

      const response = await API.get("/settings");

      const data = response.data;

      setYellowTime(data.yellowTime);

      setRedTime(data.redTime);

      setSoundEnabled(data.soundEnabled);

      setTheme(data.theme || "light");

      setViewHours(data.viewHours || 24);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchSettings();

  }, []);

  // SAVE SETTINGS

  const handleSave = async () => {

    try {

      await API.put("/settings", {

        yellowTime,

        redTime,

        soundEnabled,

        theme,

        viewHours,

      });

      localStorage.setItem("theme", theme);

      localStorage.setItem(
  "soundEnabled",
  soundEnabled
);

if (theme === "dark") {

  document.documentElement.classList.add("dark");

} else {

  document.documentElement.classList.remove("dark");

}

      alert("Settings Saved Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to save settings");

    }

  };

  return (

    <Layout>

      <div className="p-4 md:p-8">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">

            System Settings

          </h1>

          <p className="text-gray-500 text-sm md:text-lg">

            Configure hotel operations and preferences

          </p>

        </div>

        {/* SETTINGS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ALERT TIMINGS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                <Bell size={30} className="text-yellow-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  Alert Timings

                </h2>

                <p className="text-gray-500">

                  Configure escalation timings

                </p>

              </div>

            </div>

            <div className="space-y-6">

              <div>

                <label className="block text-gray-600 mb-2">

                  Yellow Alert (mins)

                </label>

                <input

                  type="number"

                  value={yellowTime}

                  onChange={(e) =>

                    setYellowTime(e.target.value)

                  }

                  className="w-full border rounded-2xl p-4 outline-none"

                />

              </div>

              <div>

                <label className="block text-gray-600 mb-2">

                  Red Alert (mins)

                </label>

                <input

                  type="number"

                  value={redTime}

                  onChange={(e) =>

                    setRedTime(e.target.value)

                  }

                  className="w-full border rounded-2xl p-4 outline-none"

                />

              </div>

            </div>

          </div>

          {/* SOUND */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                <Volume2 size={30} className="text-blue-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  Sound Alerts

                </h2>

                <p className="text-gray-500">

                  Manage notification sounds

                </p>

              </div>

            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">

              <div>

                <h3 className="font-semibold text-gray-800">

                  Enable Sounds

                </h3>

                <p className="text-sm text-gray-500">

                  Play alert sounds for complaints

                </p>

              </div>

              <button

                onClick={() =>

                  setSoundEnabled(!soundEnabled)

                }

                className={`w-16 h-8 rounded-full transition-all relative

                ${soundEnabled

                  ? "bg-green-500"

                  : "bg-gray-300"

                }

                `}

              >

                <div

                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all

                  ${soundEnabled

                    ? "right-1"

                    : "left-1"

                  }

                  `}

                />

              </button>

            </div>

          </div>

          {/* THEME */}

<div className="bg-white rounded-3xl shadow-sm p-8">

  <div className="flex items-center gap-4 mb-8">

    <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">

      🌙

    </div>

    <div>

      <h2 className="text-2xl font-bold text-gray-800">

        Theme Mode

      </h2>

      <p className="text-gray-500">

        Switch dashboard appearance

      </p>

    </div>

  </div>

  <div className="grid grid-cols-2 gap-4">

    <button

      onClick={() => setTheme("light")}

      className={`p-4 rounded-2xl border-2 transition-all

      ${theme === "light"

        ? "border-blue-500 bg-blue-50"

        : "border-gray-200"

      }`}

    >

      ☀️ Light

    </button>

    <button

      onClick={() => setTheme("dark")}

      className={`p-4 rounded-2xl border-2 transition-all

      ${theme === "dark"

        ? "border-gray-900 bg-gray-100"

        : "border-gray-200"

      }`}

    >

      🌙 Dark

    </button>

  </div>

</div>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8">

  <h2 className="text-2xl font-bold mb-6">

    Complaint Visibility

  </h2>

  <select

    value={viewHours}

    onChange={(e) =>

      setViewHours(Number(e.target.value))

    }

    className="w-full border rounded-2xl p-4"

  >

    <option value={24}>
      Last 24 Hours
    </option>

    <option value={48}>
      Last 48 Hours
    </option>

    <option value={168}>
      Last 7 Days
    </option>

    <option value={999999}>
      All Complaints
    </option>

  </select>

</div>

        {/* SAVE BUTTON */}

        <div className="mt-10 flex justify-end">

          <button

            onClick={handleSave}

            className="flex items-center gap-3 bg-[#111827] hover:bg-black text-white px-8 py-4 rounded-2xl transition-all"

          >

            <Save size={22} />

            Save Settings

          </button>

        </div>

      </div>

    </Layout>

  );

}

export default Settings;