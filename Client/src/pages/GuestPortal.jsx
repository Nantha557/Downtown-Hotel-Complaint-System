import {

  Wrench,

  Laptop,

  Sparkles,

  UtensilsCrossed,

  BellRing,

  CarTaxiFront,

  WashingMachine,

  Wifi,

} from "lucide-react";

function GuestPortal() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#f7f9fc] to-[#ffffff] p-4 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-14">

          <div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-3">

              Downtown Hotel

            </h1>

            <p className="text-gray-500 text-lg md:text-xl">

              Smart Guest Experience Portal

            </p>

          </div>

          <div className="mt-6 md:mt-0 bg-white px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3">

            <Wifi className="text-green-500" />

            <span className="text-gray-700 font-semibold">

              Connected Services

            </span>

          </div>

        </div>

        {/* MAIN SERVICE SECTION */}

        <div className="mb-16">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">

            Guest Support Services

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* IT */}

            <a

              href="https://docs.google.com/forms/d/e/1FAIpQLSf36b6PLg0Hs8k0nzpEj3PZxD0idMWW9p7U5i5kKOHOME7Fhw/viewform?usp=publish-editor"

              target="_blank"

              rel="noreferrer"

              className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100"

            >

              <div className="bg-purple-100 w-24 h-24 rounded-3xl flex items-center justify-center mb-8">

                <Laptop size={45} className="text-purple-600" />

              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">

                IT Support

              </h3>

              <p className="text-gray-500 leading-7">

                WiFi connectivity, TV issues, smart device assistance and all technical support requests.

              </p>

            </a>

            {/* HOUSEKEEPING */}

            <a

              href=" https://docs.google.com/forms/d/e/1FAIpQLSdD94W508apwD0dR4HNmTXDh-KGGBZ7c17bTmph1Qf7pzaygw/viewform?usp=publish-editor"

              target="_blank"

              rel="noreferrer"

              className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"

            >

              <div className="bg-blue-100 w-24 h-24 rounded-3xl flex items-center justify-center mb-8">

                <Sparkles size={45} className="text-blue-600" />

              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">

                Housekeeping

              </h3>

              <p className="text-gray-500 leading-7">

                Cleaning requests, room service support, toiletries and housekeeping assistance.

              </p>

            </a>

            {/* MAINTENANCE */}

            <a

              href=" https://docs.google.com/forms/d/e/1FAIpQLSfN2FTEcXQSb3t6tdQIgP8iBhOsd5k9R5ne1GUzLKqcMQTmrg/viewform?usp=publish-editor"

              target="_blank"

              rel="noreferrer"

              className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-yellow-100"

            >

              <div className="bg-yellow-100 w-24 h-24 rounded-3xl flex items-center justify-center mb-8">

                <Wrench size={45} className="text-yellow-600" />

              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">

                Maintenance

              </h3>

              <p className="text-gray-500 leading-7">

                AC repair, electrical issues, plumbing support and room maintenance services.

              </p>

            </a>

          </div>

        </div>

        {/* FUTURE SERVICES */}

        <div>

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-800">

                Upcoming Smart Services

              </h2>

              <p className="text-gray-500 mt-2">

                Future developments planned for Downtown Hotel

              </p>

            </div>

            <span className="bg-green-100 text-green-600 px-5 py-2 rounded-xl font-semibold">

              Future Expansion

            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* FOOD */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 opacity-90">

              <div className="bg-red-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">

                <UtensilsCrossed size={35} className="text-red-500" />

              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">

                Food Ordering

              </h3>

              <p className="text-gray-500">

                In-room dining and restaurant ordering directly from your phone.

              </p>

            </div>

            {/* LAUNDRY */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 opacity-90">

              <div className="bg-cyan-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">

                <WashingMachine size={35} className="text-cyan-600" />

              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">

                Laundry

              </h3>

              <p className="text-gray-500">

                Schedule laundry pickup and track cleaning progress digitally.

              </p>

            </div>

            {/* ROOM SERVICE */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 opacity-90">

              <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">

                <BellRing size={35} className="text-orange-500" />

              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">

                Room Service

              </h3>

              <p className="text-gray-500">

                Request extra pillows, towels and premium room assistance instantly.

              </p>

            </div>

            {/* TAXI */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 opacity-90">

              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">

                <CarTaxiFront size={35} className="text-green-600" />

              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">

                Taxi Booking

              </h3>

              <p className="text-gray-500">

                Book local transport and airport pickups directly from the portal.

              </p>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="mt-16 text-center">

          <p className="text-gray-400 text-sm md:text-base">

            Downtown Hotel • Smart Hospitality Experience Platform

          </p>

        </div>

      </div>

    </div>

  );

}

export default GuestPortal;