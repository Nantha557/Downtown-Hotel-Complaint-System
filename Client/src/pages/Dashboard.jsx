import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import API from "../services/api";

import Layout from "../components/Layout";

import alertSound from "../assets/alert.wav";

import notificationSound from "../assets/notification.wav";

function Dashboard() {

  const [complaints, setComplaints] = useState([]);

  const [, setRefresh] = useState(0);

  const lastAlertTime = useRef(0);

  const [settings, setSettings] = useState({
  yellowTime: 20,
  redTime: 30,
});

  const [notifiedComplaints, setNotifiedComplaints] = useState(() => {

  const saved = localStorage.getItem(

    "notifiedComplaints"

  );

  return saved ? JSON.parse(saved) : [];

});
  // FETCH COMPLAINTS

  const fetchComplaints = async () => {

    try {

      const response = await API.get("/complaints");

// GET SETTINGS

const settingsResponse = await API.get("/settings");

const viewHours =

  settingsResponse.data.viewHours || 24;

  setSettings({
  yellowTime:
    settingsResponse.data.yellowTime || 20,

  redTime:
    settingsResponse.data.redTime || 30,
});

// FILTER COMPLAINTS

const filteredComplaints = response.data.filter(

  (item) => {

    const created = new Date(

      item.createdAt

    );

    const now = new Date();

    const diffHours =

      (now - created) /

      (1000 * 60 * 60);

    return diffHours <= viewHours;

  }

);

const newComplaints = filteredComplaints;

      // NEW COMPLAINT NOTIFICATION

     // NEW COMPLAINT NOTIFICATION

const existingIds = JSON.parse(

  localStorage.getItem("notifiedComplaints")

) || [];

const newIds = [...existingIds];

newComplaints.forEach((item) => {

  if (!existingIds.includes(item._id)) {

    // PLAY SOUND

    const notifyAudio = new Audio(notificationSound);

    notifyAudio.volume = 0.4;

    notifyAudio.play();

    // SHOW TOAST

    toast.info(

      `🚨 Room ${item.roomNo} - ${item.complaint}`,

      {

        position: "top-right",

        autoClose: 5000,

      }

    );

    // SAVE NEW ID

    newIds.push(item._id);

  }

});

// UPDATE STORAGE

localStorage.setItem(

  "notifiedComplaints",

  JSON.stringify(newIds)

);

setNotifiedComplaints(newIds);

      setComplaints(newComplaints);

      // CRITICAL ALERT SOUND

      const criticalComplaints = newComplaints.filter(

        item => {

          const created = new Date(item.createdAt);

          const now = new Date();

          const minutes = Math.floor(

            (now - created) / 1000 / 60

          );

          return (

            item.status === "Pending" &&

           minutes >= settings.redTime

          );

        }

      );

      // PLAY SOUND ONLY ONCE EVERY 1 MIN

      if (criticalComplaints.length > 0) {

        const now = Date.now();

        if (

          now - lastAlertTime.current > 60000

        ) {

          const latestRoom = criticalComplaints[0];

          const audio = new Audio(alertSound);

          audio.volume = 0.7;

          audio.play();

          toast.error(

            `🚨 Critical Delay - Room ${latestRoom.roomNo}`,

            {

              position: "top-right",

              autoClose: 5000,

            }

          );

          lastAlertTime.current = now;

        }

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComplaints();

    // FETCH EVERY 5 SECONDS

    const interval = setInterval(() => {

      fetchComplaints();

    }, 5000);

    // LIVE TIMER

    const timerInterval = setInterval(() => {

      setRefresh(prev => prev + 1);

    }, 1000);

    return () => {

      clearInterval(interval);

      clearInterval(timerInterval);

    };

  }, []);

  // TIMER FUNCTION

  const getTimer = (

    createdAt,

    status,

    updatedAt

  ) => {

    const created = new Date(createdAt);

    const endTime =
  status === "Resolved" ||
  status === "On Hold"
    ? new Date(updatedAt)
    : new Date();

    const diff = Math.floor(

      (endTime - created) / 1000

    );

    const minutes = Math.floor(diff / 60);

    const seconds = diff % 60;

    return {

      time: `${minutes}m ${seconds}s`,

      minutes,

    };

  };

  // COUNTS

  const pendingCount = complaints.filter(

    item => item.status === "Pending"

  ).length;

  const maintenanceCount = complaints.filter(

    item => item.category === "Maintenance"

  ).length;

  const housekeepingCount = complaints.filter(

    item => item.category === "Housekeeping"

  ).length;

  const itCount = complaints.filter(

    item => item.category === "IT"

  ).length;

  return (

    <Layout>

      <div className="flex-1 p-4 md:p-8">

        {/* HEADER */}

        <div className="
flex
justify-between
items-start
mb-10
">

  <div>

    <h1 className="
    text-3xl
    md:text-5xl
    font-bold
    text-gray-800
    ">

      Hotel Operations

    </h1>

    <p className="
    text-gray-500
    mt-2
    text-sm
    md:text-lg
    ">

      👤 Logged in as:
      <span className="font-semibold ml-1">

        {localStorage.getItem("username")}

      </span>

    </p>

    <p className="
    text-gray-500
    mt-1
    text-sm
    md:text-lg
    ">

      Real-time Complaint Monitoring Dashboard

    </p>

  </div>

</div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10">

          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              Total Complaints

            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-gray-800">

              {complaints.length}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              To Complete

            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-red-500">

              {pendingCount}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              IT

            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-purple-500">

              {itCount}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              Maintenance

            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-yellow-500">

              {maintenanceCount}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              Housekeeping

            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-blue-500">

              {housekeepingCount}

            </h2>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-semibold text-gray-800">

              Active Complaints

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-5 text-gray-500 font-medium">

                    Room

                  </th>

                  <th className="text-left p-5 text-gray-500 font-medium">

                    Category

                  </th>

                  <th className="text-left p-5 text-gray-500 font-medium">

                    Complaint

                  </th>

                  <th className="text-left p-5 text-gray-500 font-medium">

                    Description

                  </th>

                  <th className="text-left p-5 text-gray-500 font-medium">

                    Timer

                  </th>

                  <th className="text-left p-5 text-gray-500 font-medium">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {complaints.map((item) => {

                  const timer = getTimer(

                    item.createdAt,

                    item.status,

                    item.updatedAt

                  );

                  return (

                    <tr

                      key={item._id}

                      className={`border-b transition-all duration-500

${timer.minutes >= settings.redTime + 15

  ? "bg-red-100 animate-pulse"

  : timer.minutes >= settings.redTime

  ? "bg-red-50"

  : timer.minutes >= settings.yellowTime

  ? "bg-yellow-50"

  : "hover:bg-gray-50"

}`}

                    >

                      {/* ROOM */}

                      <td className="p-5 font-semibold text-gray-700">

                        {item.roomNo}

                      </td>

                      {/* CATEGORY */}

                      <td className="p-5">

                        <span

                          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap

                          ${item.category === "IT"

                            ? "bg-purple-100 text-purple-600"

                            : item.category === "Maintenance"

                            ? "bg-yellow-100 text-yellow-700"

                            : "bg-blue-100 text-blue-600"

                          }`}

                        >

                          {item.category}

                        </span>

                      </td>

                      {/* COMPLAINT */}

                      <td className="p-5 text-gray-700 font-medium">

                        {item.complaint}

                      </td>

                      {/* DESCRIPTION */}

                      <td className="p-5 text-gray-500 max-w-xs">

                        {item.description}

                      </td>

                      {/* TIMER */}

                      <td className="p-5">

                        <span

                          className={`px-4 py-2 rounded-xl text-sm font-bold text-white whitespace-nowrap

                          ${timer.minutes < settings.yellowTime
                            ? "bg-green-500"
                            : timer.minutes < settings.redTime
                            ? "bg-yellow-500"
                            : timer.minutes < settings.redTime + 15
                            ? "bg-red-500"
                            : "bg-red-800 animate-pulse"
                          }`}

                        >

                          {timer.time}

                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="p-5">

                      {item.status === "Pending" && (

                        <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-100 text-red-600 whitespace-nowrap">

                          To Complete

                        </span>

                      )}

                      {item.status === "Resolved" && (

                        <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-100 text-green-600 whitespace-nowrap">

                          Completed

                        </span>

                      )}

                      {item.status === "On Hold" && (

                        <div>

                          <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-100 text-yellow-700 whitespace-nowrap">

                            Pending

                          </span>

                          <p className="text-xs text-gray-500 mt-2">

                            {item.holdReason}

                          </p>

                        </div>

                      )}

                    </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default Dashboard;