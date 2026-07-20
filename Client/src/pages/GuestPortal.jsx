import { useNavigate } from "react-router-dom";
import {

  Wrench,

  Sparkles,

  UtensilsCrossed,

  HandPlatter ,

  Utensils ,

  ChefHat,

  BellRing,

  CarTaxiFront,

  WashingMachine,

} from "lucide-react";

function GuestPortal() {

  const navigate = useNavigate();

  const FOOD_ORDERING_URL =
  "https://downtown-food-ordering-system.vercel.app/menu";

return (

  <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#f7f9fc] to-[#ffffff] p-4">

    <div className="max-w-md mx-auto">

      {/* HEADER */}

      <div className="text-center py-4">

        <h1 className="text-3xl font-bold text-gray-800">

          Downtown Business Hotel

        </h1>

        <p className="text-gray-500 mt-2">

          Guest Service Hub

        </p>

      </div>

      {/* ASSISTANCE */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">

          At Your Assistance

        </h2>

        <div className="space-y-4">
           
          <div
  onClick={() => (window.location.href = FOOD_ORDERING_URL)}
  className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-lg transition"
>
  <div className="flex items-center gap-4">

    <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center">
     <ChefHat  size={28} className="text-red-600" />
    </div>

    <div>
      <h3 className="font-bold text-gray-800">
        Room Service
      </h3>

      <p className="text-sm text-gray-500">
        Browse menu and place room service orders
      </p>
    </div>

  </div>

  <span className="text-xl text-gray-400">
    ›
  </span>
</div>

          <div

            onClick={() => navigate("/maintenance")}

            className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-lg transition"

          >
            

            <div className="flex items-center gap-4">

              <div className="bg-yellow-100 w-14 h-14 rounded-2xl flex items-center justify-center">

                <Wrench size={28} className="text-yellow-600" />

              </div>

              <div>

                <h3 className="font-bold text-gray-800">

                  Maintenance

                </h3>

                <p className="text-sm text-gray-500">

                  AC, TV, WiFi, Plumbing

                </p>

              </div>

            </div>

            <span className="text-xl text-gray-400">

              ›

            </span>

          </div>

          <div

            onClick={() => navigate("/housekeeping")}

            className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-lg transition"

          >

            <div className="flex items-center gap-4">

              <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center">

                <Sparkles size={28} className="text-blue-600" />

              </div>

              <div>

                <h3 className="font-bold text-gray-800">

                  Housekeeping

                </h3>

                <p className="text-sm text-gray-500">

                  Cleaning, Towels, Toiletries

                </p>

              </div>

            </div>

            <span className="text-xl text-gray-400">

              ›

            </span>

          </div>

        </div>

      </div>

      {/* AVAILABLE SERVICES */}

<div>

  <div className="grid grid-cols-1 gap-4">

   

  </div>

</div>

    </div>

  </div>

);

}
export default GuestPortal;