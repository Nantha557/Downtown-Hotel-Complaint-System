import { useState } from "react";
import axios from "axios";

function ITGuest() {

  const [roomNo, setRoomNo] = useState("");
  const [complaint, setComplaint] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://downtown-hotel-complaint-system.onrender.com/api/complaints/create",
        {
          roomNo,
          category: "IT",
          complaint,
          description,
        }
      );

      setSubmitted(true);

    } catch (error) {

      console.log(error);

      alert("Failed to submit request");

    }

  };

  if (submitted) {

    return (

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">

          <div className="text-6xl mb-4">✅</div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Request Submitted
          </h1>

          <p className="text-gray-600">
            Your IT request has been registered successfully.
          </p>

          <p className="text-gray-600 mt-2">
            Our team will assist shortly.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setRoomNo("");
              setComplaint("");
              setDescription("");
            }}
            className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-xl"
          >
            Submit Another Request
          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-900">
          💻 IT Request
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Please register your IT request.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Room Number
            </label>

            <input
              type="text"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              required
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Type Of Request
            </label>

            <select
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
              className="w-full border rounded-xl p-3"
            >

              <option value="">
                Select Request
              </option>

              <option value="WiFi">
                WiFi
              </option>

              <option value="TV">
                TV
              </option>

              <option value="Intercom">
                Intercom
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Describe The Request
            </label>

            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded-xl p-3"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold"
          >
            Submit Request
          </button>

        </form>

      </div>

    </div>

  );

}

export default ITGuest;