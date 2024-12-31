
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { useDispatch } from "react-redux";
import { deleteEvent } from "../slice/CalSlice";

const EventCard = ({ event, onEdit, onDelete }) => {
  // Format the date for display
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white p-3 shadow-lg rounded-lg mt-2 hover:bg-gray-50">
      <p className="text-sm font-semibold text-blue-600">{event.title}</p>
      <p className="text-xs text-gray-500">{event.description}</p>
      <p className="text-xs text-gray-400">{event.startTime} - {event.endTime}</p>
      <p className="text-xs text-gray-400">Date: {formattedDate}</p> {/* Display event date */}
      <div className="flex justify-between mt-3">
        <Button variant="ghost" onClick={onEdit} className="text-blue-500">
          Edit
        </Button>
        <Button variant="ghost" onClick={() => onDelete(event.id)} className="text-red-500">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
