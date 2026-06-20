import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import Layout from "../components/Layout";

import API from "../services/api";

import alertSound from "../assets/alert.wav";

import notificationSound from "../assets/notification.wav";

import InstallButton
from "../components/InstallButton";

function SupervisorDashboard() {

  const [complaints, setComplaints] = useState([]);

  const [settings, setSettings] = useState({
  yellowTime: 20,
  redTime: 30,
});

  const [, setRefresh] = useState(0);

  const lastAlertTime = useRef(0);

  const notifiedComplaints = useRef([]);

  // FETCH COMPLAINTS

  const fetchComplaints = async () => {

    try {

     const response = await API.get("/complaints");

// GET SETTINGS

const settingsResponse = await API.get("/settings");

setSettings({
  yellowTime:
    settingsResponse.data.yellowTime || 20,

  redTime:
    settingsResponse.data.redTime || 30,
});     

const viewHours =

  settingsResponse.data.viewHours || 24;

// FILTER MAINTENANCE

const filtered =
  response.data.filter(
    item =>
      item.category === "Maintenance" ||
      item.category === "Housekeeping" ||
      item.category === "IT"
  );
// FILTER BY HOURS

const recentComplaints = filtered.filter(

  item => {

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

setComplaints(recentComplaints);

      // NEW COMPLAINT NOTIFICATION

      filtered.forEach((item) => {

        if (

          !notifiedComplaints.current.includes(item._id)

        ) {

          const notifyAudio = new Audio(notificationSound);

          notifyAudio.volume = 0.4;

          notifyAudio.play();

          toast.info(

            `🛠 Maintenance Alert - Room ${item.roomNo}`,

            {

              position: "top-right",

              autoClose: 5000,

            }

          );

          notifiedComplaints.current.push(item._id);

        }

      });

      setComplaints(filtered);

      // CRITICAL ALERT SOUND

      const criticalComplaints = filtered.filter(

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

      // PLAY SOUND EVERY 1 MIN

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

  // MARK RESOLVED

  const markResolved = async (id) => {

    try {

      await API.put(`/complaints/${id}/resolve`);

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };

  const markHold = async (id) => {

  const reason = prompt(
    "Why is this complaint being put on hold?"
  );

  if (!reason) return;

  try {

    await API.put(
      `/complaints/${id}/onhold`,
      {
        reason,
      }
    );

    fetchComplaints();

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

  

  return (

    <Layout>

      <div className="p-4 md:p-8">

        {/* HEADER */}

      <div className="
flex
justify-between
items-start
mb-8
">

  <div>

    <h1 className="
    text-3xl
    md:text-5xl
    font-bold
    text-yellow-600
    mb-2
    ">

      Supervisor Department

    </h1>
    <InstallButton />

    <p className="
    text-gray-500
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
    text-sm
    md:text-lg
    ">

      Live maintenance and housekeeping complaint management system

    </p>

  </div>

</div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-6">

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              Total

            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 mt-2 md:mt-4">

              {complaints.length}

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              To Complete

            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mt-2 md:mt-4">

              {

                complaints.filter(

                  item => item.status === "Pending"

                ).length

              }

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">

            <p className="text-gray-500 text-xs md:text-sm">

              Completed

            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-green-500 mt-2 md:mt-4">

              {

                complaints.filter(

                  item => item.status === "Resolved"

                ).length

              }

            </h2>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-semibold text-gray-800">

              Active Maintenance and Housekeeping Complaints

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-5">

                    Room

                  </th>

                  <th className="text-left p-5">

                    Complaint

                  </th>

                  <th className="text-left p-5">

                    Description

                  </th>

                  <th className="text-left p-5">

                    Timer

                  </th>

                  <th className="text-left p-5">

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

                      <td className="p-5 font-semibold">

                        {item.roomNo}

                      </td>

                      <td className="p-5 font-medium text-gray-700">

                        {item.complaint}

                      </td>

                      <td className="p-5 text-gray-500 max-w-xs">

                        {item.description}

                      </td>

                      {/* TIMER */}

                      <td className="p-5">

                        <span

                          className={`px-4 py-2 rounded-xl text-sm font-bold text-white

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

                        <div className="flex gap-2">

                          <button
                            onClick={() => markResolved(item._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                          >
                            Completed
                          </button>

                          <button
                            onClick={() => markHold(item._id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
                          >
                            Pending
                          </button>

                        </div>

                      )}

                      {item.status === "Resolved" && (

                        <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-sm font-semibold">

                          Completed

                        </span>

                      )}

                      {item.status === "On Hold" && (

                        <div>

                          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold">

                            Pending

                          </span>

                          <p className="text-xs text-gray-500 mt-2">

                            {item.holdReason}

                          </p>

                          <button
                            onClick={() => markResolved(item._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl mt-2"
                          >
                            Completed
                          </button>

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

export default SupervisorDashboard;