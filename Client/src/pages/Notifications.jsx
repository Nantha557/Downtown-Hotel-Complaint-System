import { useEffect, useState } from "react";

import {

  Bell,

  AlertTriangle,

  CheckCircle,

  Clock3,

} from "lucide-react";

import Layout from "../components/Layout";

import API from "../services/api";

function Notifications() {

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {

    try {

      const response = await API.get("/complaints");

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComplaints();

    const interval = setInterval(() => {

      fetchComplaints();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // TIMER

  const getMinutes = (createdAt) => {

    const created = new Date(createdAt);

    const now = new Date();

    const diff = Math.floor((now - created) / 1000 / 60);

    return diff;

  };

  // GENERATE NOTIFICATIONS

  const notifications = complaints.map((item) => {

    const minutes = getMinutes(item.createdAt);

    // DELAY ALERT

    if (

      item.status === "Pending" &&

      minutes >= 30

    ) {

      return {

        type: "critical",

        icon: <AlertTriangle size={24} />,

        title: "Critical Delay Alert",

        message: `Room ${item.roomNo} complaint delayed for ${minutes} mins`,

        time: minutes,

      };

    }

    // WARNING

    if (

      item.status === "Pending" &&

      minutes >= 20

    ) {

      return {

        type: "warning",

        icon: <Clock3 size={24} />,

        title: "Pending Complaint",

        message: `Room ${item.roomNo} still pending after ${minutes} mins`,

        time: minutes,

      };

    }

    // RESOLVED

    if (item.status === "Resolved") {

      return {

        type: "success",

        icon: <CheckCircle size={24} />,

        title: "Complaint Resolved",

        message: `${item.category} resolved complaint for Room ${item.roomNo}`,

        time: 0,

      };

    }

    // NEW COMPLAINT

    return {

      type: "info",

      icon: <Bell size={24} />,

      title: "New Complaint",

      message: `${item.category} complaint raised from Room ${item.roomNo}`,

      time: minutes,

    };

  });

  // SORT

  notifications.sort((a, b) => b.time - a.time);

  return (

    <Layout>

      <div className="p-4 md:p-8">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">

            Notifications Center

          </h1>

          <p className="text-gray-500 text-sm md:text-lg">

            Real-time alerts and hotel activity feed

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Total Alerts

            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">

              {notifications.length}

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Critical

            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">

              {

                notifications.filter(

                  item => item.type === "critical"

                ).length

              }

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Pending

            </p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">

              {

                notifications.filter(

                  item => item.type === "warning"

                ).length

              }

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Resolved

            </p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">

              {

                notifications.filter(

                  item => item.type === "success"

                ).length

              }

            </h2>

          </div>

        </div>

        {/* NOTIFICATION FEED */}

        <div className="space-y-5">

          {

            notifications.map((item, index) => (

              <div

                key={index}

                className={`bg-white rounded-3xl shadow-sm p-6 border-l-8 transition-all

                ${item.type === "critical"

                  ? "border-red-500"

                  : item.type === "warning"

                  ? "border-yellow-500"

                  : item.type === "success"

                  ? "border-green-500"

                  : "border-blue-500"

                }`}

              >

                <div className="flex items-start gap-5">

                  {/* ICON */}

                  <div

                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white

                    ${item.type === "critical"

                      ? "bg-red-500"

                      : item.type === "warning"

                      ? "bg-yellow-500"

                      : item.type === "success"

                      ? "bg-green-500"

                      : "bg-blue-500"

                    }`}

                  >

                    {item.icon}

                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                      <h2 className="text-xl font-bold text-gray-800">

                        {item.title}

                      </h2>

                      <span className="text-sm text-gray-400">

                        {item.time} mins ago

                      </span>

                    </div>

                    <p className="text-gray-500 mt-2 text-base">

                      {item.message}

                    </p>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </Layout>

  );

}

export default Notifications;