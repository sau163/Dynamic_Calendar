
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { incrementMonth, decrementMonth } from "../slice/CalSlice";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Calendar from "./Calendear";

const Header = () => {
  // const { currentMonth, currentYear } = useSelector((state) => state.calendar);
  // const dispatch = useDispatch();

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 p-4 rounded-lg shadow-lg mb-6">
      
      <div className="flex items-center">
       
        <h1 className="text-2xl font-bold justify-center items-center">Event Calendar</h1>

{/*   
        <div className="flex items-center space-x-4">
     
          <button
            onClick={() => dispatch(decrementMonth())}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <AiOutlineLeft size={18} />
          </button>

          <span className="text-lg font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })}
          </span>
          <span className="text-lg font-semibold">{currentYear}</span>

          <button
            onClick={() => dispatch(incrementMonth())}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <AiOutlineRight size={18} />
          </button>
        </div> */}

        {/* Add Event Button */}
        {/* <button
          className="bg-blue-500 text-white font-medium rounded-full px-4 py-2 shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          + Add Event
        </button> */}
      </div>

      <div className="mt-4">
        <Calendar />
      </div>
    </div>
  );
};

export default Header;
