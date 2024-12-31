

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import { addEvent, deleteEvent, editEvent } from "../slice/CalSlice";
import { Button } from "@/components/ui/button";

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
      dispatch(addEvent(storedEvents));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (day) => {
    setSelectedDay(`${currentYear}-${currentMonth + 1}-${day}`);
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
    <div className="max-w-screen-lg mx-auto p-4">
      {isFormOpen && (
        <EventForm event={selectedEvent} date={selectedDay} onClose={() => setIsFormOpen(false)} />
      )}
      
      <h3 className="text-lg font-bold mb-4">Events for {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}</h3>
      
      <div>
        {eventsThisMonth.length === 0 ? (
          <p>No events this month.</p>
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

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day} className="p-2 border bg-gray-200 text-center">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil((startDay + daysInMonth) / 7) }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 7 }).map((_, colIndex) => {
                const day = rowIndex * 7 + colIndex - startDay + 1;
                if (day > 0 && day <= daysInMonth) {
                  const isToday = todayDate === day && todayMonth === currentMonth && todayYear === currentYear;
                  const eventForTheDay = events.filter(event => new Date(event.date).getDate() === day && new Date(event.date).getMonth() === currentMonth);
                  return (
                    <td
                      key={colIndex}
                      className={`p-4 text-center ${isToday ? "bg-blue-500 text-white" : "hover:bg-gray-100 cursor-pointer"}`}
                      onClick={() => handleDayClick(day)}
                    >
                      <div>{day}</div>
                      {eventForTheDay.length > 0 && (
                        <div className="text-xs mt-1 text-blue-600">
                          {eventForTheDay.map(event => (
                            <div key={event.id} className="truncate">{event.title}</div>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                }
                return <td key={colIndex} className="p-4"></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
