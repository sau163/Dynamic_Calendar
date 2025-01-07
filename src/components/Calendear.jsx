import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import { addEvent, deleteEvent, editEvent } from "../slice/CalSlice";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { incrementMonth, decrementMonth } from "../slice/CalSlice";

const Calendar = () => {
  const { currentMonth, currentYear, events } = useSelector((state) => state.calendar);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      storedEvents.forEach((event) => {
        dispatch(addEvent(event));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    selectedDate.setHours(12, 0, 0, 0);
    setSelectedDay(selectedDate.toISOString().split("T")[0]);
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  const eventsThisMonth = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-white shadow-md rounded-lg flex flex-col lg:flex-row gap-6">
      {/* Calendar Section */}
      <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => dispatch(decrementMonth())}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <AiOutlineLeft size={20} />
          </button>
          <div className="text-lg font-bold justify-between text-gray-800">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
          </div>
          <button
            onClick={() => dispatch(incrementMonth())}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>

        <div className="overflow-auto" style={{ maxHeight: "500px" }}>
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <th
                    key={day}
                    className="p-2 border bg-gray-100 text-center text-gray-600"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil((startDay + daysInMonth) / 7) }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 7 }).map((_, colIndex) => {
                    const day = rowIndex * 7 + colIndex - startDay + 1;
                    if (day > 0 && day <= daysInMonth) {
                      const isToday =
                        todayDate === day &&
                        todayMonth === currentMonth &&
                        todayYear === currentYear;
                      const eventForTheDay = events.filter(
                        (event) =>
                          new Date(event.date).getDate() === day &&
                          new Date(event.date).getMonth() === currentMonth
                      );
                      return (
                        <td
                          key={colIndex}
                          className={`p-2 h-16 w-16 text-center border ${
                            isToday
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100 cursor-pointer"
                          }`}
                          onClick={() => handleDayClick(day)}
                        >
                          <div className="text-lg font-semibold">{day}</div>
                          {eventForTheDay.length > 0 && (
                            <div className="text-xs mt-1 text-blue-600 truncate">
                              {eventForTheDay.map((event) => (
                                <div key={event.id} className="truncate">
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      );
                    }
                    return <td key={colIndex} className="p-2 h-16 w-16"></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event List Section */}
      <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow" style={{ maxHeight: "500px" }}>
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Your Events</h4>
        {isFormOpen ? (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <EventForm
              event={selectedEvent}
              date={selectedDay}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        ) : (
          <div className="space-y-4 overflow-auto" style={{ maxHeight: "400px" }}>
            {eventsThisMonth.length === 0 ? (
              <p className="text-gray-500">No events this month.</p>
            ) : (
              eventsThisMonth.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={() => handleEditEvent(event)}
                  onDelete={() => handleDeleteEvent(event.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
