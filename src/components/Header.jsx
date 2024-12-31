
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementMonth, decrementMonth } from "../slice/CalSlice";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Calendar from "./Calendear";

const Header = () => {
  const { currentMonth, currentYear } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  return (
    <div className="max-w-sm mx-auto bg-sky-500 text-white p-4 rounded-lg shadow-lg">
      <div className="max-w-sm mx-auto bg-sky-500 text-white p-4 rounded-lg shadow-lg">
        <button
          onClick={() => dispatch(decrementMonth())}
          className="w-8 h-8 flex items-center justify-center"
        >
          <AiOutlineLeft size={18} />
        </button>
        <span className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })}
        </span>
        <span className="text-lg font-semibold">{currentYear}</span>
        <button
          onClick={() => dispatch(incrementMonth())}
          className="w-8 h-8 flex items-center justify-center"
        >
          <AiOutlineRight size={18} />
        </button>
        <Calendar />
      </div>
    </div>
  );
};

export default Header;
