import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import API from "../services/api";

function Complaints() {

  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [status, setStatus] = useState("All");

  const [, setRefresh] = useState(0);

  // SELECTED COMPLAINT FOR VIEW MODAL
  const [selectedComplaint, setSelectedComplaint] = useState(null);


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

      setRefresh(prev => prev + 1);

    }, 1000);

    return () => clearInterval(interval);

  }, []);


  // TIMER
  const getTimer = (createdAt, status, updatedAt) => {

    const created = new Date(createdAt);

    const endTime = status === "Resolved"
      ? new Date(updatedAt)
      : new Date();

    const diff = Math.floor((endTime - created) / 1000);

    const minutes = Math.floor(diff / 60);

    const seconds = diff % 60;

    return {

      time: `${minutes}m ${seconds}s`,

      minutes,

    };

  };


  // FORMAT DATE + TIME
  const formatDateTime = (date) => {

    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  };


  // FILTERS

  const totalComplaints = complaints.length;

  const resolvedComplaints =
    complaints.filter(
      item => item.status === "Resolved"
    ).length;

  const pendingComplaints =
    complaints.filter(
      item => item.status === "Pending"
    ).length;

  const onHoldComplaints =
    complaints.filter(
      item => item.status === "On Hold"
    ).length;


  const filteredComplaints = complaints.filter((item) => {

    const matchesSearch =

      item.roomNo
        .toString()
        .includes(search) ||

      item.complaint
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesDepartment =

      department === "All" ||

      item.category === department;


    const matchesStatus =

      status === "All" ||

      item.status === status;


    return (

      matchesSearch &&

      matchesDepartment &&

      matchesStatus

    );

  });


  return (

    <Layout>

      <div className="p-4 md:p-8">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">

            Complaints Center

          </h1>

          <p className="text-gray-500">

            Monitor and manage all hotel complaints

          </p>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Total Complaints

            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">

              {totalComplaints}

            </h2>

          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Completed

            </p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">

              {resolvedComplaints}

            </h2>

          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              To Complete

            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">

              {pendingComplaints}

            </h2>

          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">

              Pending

            </p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">

              {onHoldComplaints}

            </h2>

          </div>

        </div>


        {/* FILTERS */}

        <div className="bg-white rounded-3xl p-5 shadow-sm mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* SEARCH */}

            <input

              type="text"

              placeholder="Search room or complaint..."

              value={search}

              onChange={(e) => setSearch(e.target.value)}

              className="border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"

            />


            {/* DEPARTMENT */}

            <select

              value={department}

              onChange={(e) => setDepartment(e.target.value)}

              className="border rounded-2xl p-4 outline-none"

            >

              <option value="All">

                All Departments

              </option>

              <option value="Housekeeping">

                Housekeeping

              </option>

              <option value="Maintenance">

                Maintenance

              </option>

            </select>


            {/* STATUS */}

            <select

              value={status}

              onChange={(e) => setStatus(e.target.value)}

              className="border rounded-2xl p-4 outline-none"

            >

              <option value="All">

                All Status

              </option>

              <option value="Pending">

                To Complete

              </option>

              <option value="On Hold">

                Pending

              </option>

              <option value="Resolved">

                Completed

              </option>

            </select>

          </div>

        </div>


        {/* MOBILE CARDS */}

        <div className="md:hidden space-y-5">

          {filteredComplaints.map((item) => {

            const timer = getTimer(

              item.createdAt,

              item.status,

              item.updatedAt

            );


            return (

              <div

                key={item._id}

                className={`bg-white rounded-3xl p-6 shadow-sm border-l-8

                ${timer.minutes >= 30 && item.status === "Pending"

                  ? "border-red-500"

                  : timer.minutes >= 20 && item.status === "Pending"

                  ? "border-yellow-500"

                  : "border-green-500"

                }`}

              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold text-gray-800">

                    Room {item.roomNo}

                  </h2>


                  <span

                    className={`px-3 py-1 rounded-xl text-sm font-bold text-white

                    ${timer.minutes < 20

                      ? "bg-green-500"

                      : timer.minutes < 30

                      ? "bg-yellow-500"

                      : "bg-red-500"

                    }`}

                  >

                    {timer.time}

                  </span>

                </div>


                <p className="text-lg font-semibold text-gray-700 mb-2">

                  {item.complaint}

                </p>


                <p className="text-gray-500 mb-4">

                  {item.description}

                </p>


                <div className="flex justify-between items-center">

                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">

                    {item.category}

                  </span>


                  <span

                    className={`px-4 py-2 rounded-xl text-sm font-semibold

                    ${item.status === "Resolved"

                      ? "bg-green-100 text-green-600"

                      : "bg-red-100 text-red-600"

                    }`}

                  >

                    {item.status}

                  </span>

                </div>


                {/* MOBILE VIEW BUTTON */}

                <button

                  onClick={() => setSelectedComplaint(item)}

                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition"

                >

                  View

                </button>

              </div>

            );

          })}

        </div>


        {/* DESKTOP TABLE */}

        <div className="hidden md:block bg-white rounded-3xl shadow-sm overflow-hidden">

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

                  Department

                </th>

                <th className="text-left p-5">

                  Timer

                </th>

                <th className="text-left p-5">

                  Status

                </th>

                <th className="text-left p-5">

                  View

                </th>

              </tr>

            </thead>


            <tbody>

              {filteredComplaints.map((item) => {

                const timer = getTimer(

                  item.createdAt,

                  item.status,

                  item.updatedAt

                );


                return (

                  <tr

                    key={item._id}

                    className={`border-b

                    ${timer.minutes >= 30 && item.status === "Pending"

                      ? "bg-red-50"

                      : timer.minutes >= 20 && item.status === "Pending"

                      ? "bg-yellow-50"

                      : ""

                    }`}

                  >

                    <td className="p-5 font-semibold">

                      {item.roomNo}

                    </td>


                    <td className="p-5">

                      {item.complaint}

                    </td>


                    <td className="p-5">

                      {item.category}

                    </td>


                    <td className="p-5">

                      <span

                        className={`px-4 py-2 rounded-xl text-sm font-bold text-white

                        ${timer.minutes < 20

                          ? "bg-green-500"

                          : timer.minutes < 30

                          ? "bg-yellow-500"

                          : "bg-red-500"

                        }`}

                      >

                        {timer.time}

                      </span>

                    </td>


                    <td className="p-5">

                      <span

                        className={`px-4 py-2 rounded-xl text-sm font-semibold

                        ${item.status === "Resolved"

                          ? "bg-green-100 text-green-600"

                          : "bg-red-100 text-red-600"

                        }`}

                      >

                        {item.status}

                      </span>

                    </td>


                    {/* VIEW BUTTON */}

                    <td className="p-5">

                      <button

                        onClick={() => setSelectedComplaint(item)}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition"

                      >

                        View

                      </button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>


        {/* VIEW COMPLAINT MODAL */}

        {selectedComplaint && (

          <div

            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"

            onClick={() => setSelectedComplaint(null)}

          >

            <div

              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"

              onClick={(e) => e.stopPropagation()}

            >

              {/* MODAL HEADER */}

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">

                    Complaint Details

                  </h2>

                  <p className="text-gray-500 mt-1">

                    Room {selectedComplaint.roomNo}

                  </p>

                </div>


                <button

                  onClick={() => setSelectedComplaint(null)}

                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl font-bold"

                >

                  ×

                </button>

              </div>


              {/* COMPLAINT */}

              <div className="space-y-4">

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500 mb-1">

                    Complaint

                  </p>

                  <p className="font-semibold text-gray-800">

                    {selectedComplaint.complaint}

                  </p>

                </div>


                {/* DESCRIPTION */}

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500 mb-1">

                    Description

                  </p>

                  <p className="text-gray-700">

                    {selectedComplaint.description || "No description provided"}

                  </p>

                </div>


                {/* DEPARTMENT */}

                <div className="flex gap-4">

                  <div className="flex-1 bg-blue-50 rounded-2xl p-4">

                    <p className="text-sm text-gray-500 mb-1">

                      Department

                    </p>

                    <p className="font-semibold text-blue-600">

                      {selectedComplaint.category}

                    </p>

                  </div>


                  <div className="flex-1 bg-gray-50 rounded-2xl p-4">

                    <p className="text-sm text-gray-500 mb-1">

                      Status

                    </p>

                    <p

                      className={`font-semibold

                      ${selectedComplaint.status === "Resolved"

                        ? "text-green-600"

                        : selectedComplaint.status === "On Hold"

                        ? "text-yellow-600"

                        : "text-red-600"

                      }`}

                    >

                      {selectedComplaint.status}

                    </p>

                  </div>

                </div>


                {/* COMPLAINT TIME */}

                <div className="bg-blue-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500 mb-1">

                    🕐 Complaint Received

                  </p>

                  <p className="font-semibold text-gray-800">

                    {formatDateTime(selectedComplaint.createdAt)}

                  </p>

                </div>


                {/* RESOLVED TIME */}

                {selectedComplaint.status === "Resolved" ? (

                  <div className="bg-green-50 rounded-2xl p-4">

                    <p className="text-sm text-gray-500 mb-1">

                      ✅ Resolved At

                    </p>

                    <p className="font-semibold text-green-700">

                      {formatDateTime(selectedComplaint.updatedAt)}

                    </p>

                  </div>

                ) : (

                  <div className="bg-yellow-50 rounded-2xl p-4">

                    <p className="text-sm text-gray-500 mb-1">

                      ⏳ Resolution

                    </p>

                    <p className="font-semibold text-yellow-700">

                      Not resolved yet

                    </p>

                  </div>

                )}


                {/* TOTAL TIME */}

                <div className="bg-purple-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500 mb-1">

                    ⏱️ Time Taken

                  </p>

                  <p className="font-semibold text-purple-700">

                    {getTimer(

                      selectedComplaint.createdAt,

                      selectedComplaint.status,

                      selectedComplaint.updatedAt

                    ).time}

                  </p>

                </div>


                {/* HOLD REASON */}

                {selectedComplaint.status === "On Hold" &&

                  selectedComplaint.holdReason && (

                    <div className="bg-yellow-50 rounded-2xl p-4">

                      <p className="text-sm text-gray-500 mb-1">

                        🟡 Hold Reason

                      </p>

                      <p className="font-semibold text-yellow-700">

                        {selectedComplaint.holdReason}

                      </p>

                    </div>

                  )

                }

              </div>


              {/* CLOSE BUTTON */}

              <button

                onClick={() => setSelectedComplaint(null)}

                className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition"

              >

                Close

              </button>

            </div>

          </div>

        )}

      </div>

    </Layout>

  );

}

export default Complaints;