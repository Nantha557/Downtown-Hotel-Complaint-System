import { useEffect, useState } from "react";

import {

  Laptop,

  Sparkles,

  Wrench,

} from "lucide-react";

import Layout from "../components/Layout";

import API from "../services/api";

function Departments() {

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

  // DEPARTMENT DATA

  const getDepartmentData = (department) => {

    const deptComplaints = complaints.filter(

      item => item.category === department

    );

    const pending = deptComplaints.filter(

      item => item.status === "Pending"

    ).length;

    const resolved = deptComplaints.filter(

      item => item.status === "Resolved"

    ).length;

    // AVG RESOLUTION TIME

    const resolvedItems = deptComplaints.filter(

      item => item.status === "Resolved"

    );

    let avgMinutes = 0;

    if (resolvedItems.length > 0) {

      const totalMinutes = resolvedItems.reduce(

        (acc, item) => {

          const created = new Date(item.createdAt);

          const updated = new Date(item.updatedAt);

          const diff = Math.floor(

            (updated - created) / 1000 / 60

          );

          return acc + diff;

        },

        0

      );

      avgMinutes = Math.floor(

        totalMinutes / resolvedItems.length

      );

    }

    // HEALTH STATUS

    let health = "Excellent";

    let color = "green";

    if (pending === 0) {

      health = "Excellent";

      color = "green";

    }

    else if (pending <= 3) {

      health = "Active";

      color = "blue";

    }

    else if (pending <= 6) {

      health = "Busy";

      color = "yellow";

    }

    else {

      health = "Critical";

      color = "red";

    }

    return {

      total: deptComplaints.length,

      pending,

      resolved,

      avgMinutes,

      health,

      color,

    };

  };

  const IT = getDepartmentData("IT");

  const HK = getDepartmentData("Housekeeping");

  const MTComplaints = complaints.filter(
  item =>
    item.category === "Maintenance" ||
    item.category === "IT"
);

const pending = MTComplaints.filter(
  item => item.status === "Pending"
).length;

const resolved = MTComplaints.filter(
  item => item.status === "Resolved"
).length;

const resolvedItems = MTComplaints.filter(
  item => item.status === "Resolved"
);

let avgMinutes = 0;

if (resolvedItems.length > 0) {

  const totalMinutes =
    resolvedItems.reduce(
      (acc, item) => {

        const created =
          new Date(item.createdAt);

        const updated =
          new Date(item.updatedAt);

        const diff = Math.floor(
          (updated - created) /
          1000 /
          60
        );

        return acc + diff;

      },
      0
    );

  avgMinutes = Math.floor(
    totalMinutes /
    resolvedItems.length
  );

}

let health = "Excellent";
let color = "green";

if (pending === 0) {

  health = "Excellent";
  color = "green";

}

else if (pending <= 3) {

  health = "Active";
  color = "blue";

}

else if (pending <= 6) {

  health = "Busy";
  color = "yellow";

}

else {

  health = "Critical";
  color = "red";

}

const MT = {

  total: MTComplaints.length,

  pending,

  resolved,

  avgMinutes,

  health,

  color,

};
  return (

    <Layout>

      <div className="p-4 md:p-8">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">

            Departments Overview

          </h1>

          <p className="text-gray-500 text-sm md:text-lg">

            Live department performance and activity monitoring

          </p>

        </div>

        {/* DEPARTMENT CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* HOUSEKEEPING */}

          <div className="bg-white rounded-3xl shadow-sm p-8 border border-blue-100">

            <div className="flex items-center justify-between mb-8">

              <div className="bg-blue-100 w-20 h-20 rounded-3xl flex items-center justify-center">

                <Sparkles size={40} className="text-blue-600" />

              </div>

              <span

                className={`px-4 py-2 rounded-xl text-sm font-bold text-white

                ${HK.color === "green"

                  ? "bg-green-500"

                  : HK.color === "blue"

                  ? "bg-blue-500"

                  : HK.color === "yellow"

                  ? "bg-yellow-500"

                  : "bg-red-500"

                }`}

              >

                {HK.health}

              </span>

            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">

              Housekeeping

            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Total Complaints

                </span>

                <span className="font-bold text-gray-800">

                  {HK.total}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Pending

                </span>

                <span className="font-bold text-red-500">

                  {HK.pending}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Resolved

                </span>

                <span className="font-bold text-green-500">

                  {HK.resolved}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Avg Resolution

                </span>

                <span className="font-bold text-blue-600">

                  {HK.avgMinutes} mins

                </span>

              </div>

            </div>

          </div>

          {/* MAINTENANCE */}

          <div className="bg-white rounded-3xl shadow-sm p-8 border border-yellow-100">

            <div className="flex items-center justify-between mb-8">

              <div className="bg-yellow-100 w-20 h-20 rounded-3xl flex items-center justify-center">

                <Wrench size={40} className="text-yellow-600" />

              </div>

              <span

                className={`px-4 py-2 rounded-xl text-sm font-bold text-white

                ${MT.color === "green"

                  ? "bg-green-500"

                  : MT.color === "blue"

                  ? "bg-blue-500"

                  : MT.color === "yellow"

                  ? "bg-yellow-500"

                  : "bg-red-500"

                }`}

              >

                {MT.health}

              </span>

            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">

              Maintenance

            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Total Complaints

                </span>

                <span className="font-bold text-gray-800">

                  {MT.total}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Pending

                </span>

                <span className="font-bold text-red-500">

                  {MT.pending}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Resolved

                </span>

                <span className="font-bold text-green-500">

                  {MT.resolved}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Avg Resolution

                </span>

                <span className="font-bold text-blue-600">

                  {MT.avgMinutes} mins

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default Departments;