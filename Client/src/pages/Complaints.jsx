import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import API from "../services/api";

function Complaints() {

  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [status, setStatus] = useState("All");

  const [, setRefresh] = useState(0);

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
      Resolved
    </p>
    <h2 className="text-3xl font-bold text-green-500 mt-2">
      {resolvedComplaints}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <p className="text-gray-500 text-sm">
      Pending
    </p>
    <h2 className="text-3xl font-bold text-red-500 mt-2">
      {pendingComplaints}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <p className="text-gray-500 text-sm">
      On Hold
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

                Pending

              </option>

<option value="On Hold">
  On Hold
</option>

              <option value="Resolved">

                Resolved

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

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );

}

export default Complaints;