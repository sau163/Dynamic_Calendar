
import React from "react";
import { Button } from "@/components/ui/button"; 

const EventCard = ({ event, onEdit, onDelete }) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="relative bg-white p-1 shadow-md rounded-md"
    >
     
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-semibold text-blue-600">{event.title}</p>
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>

      <div className="flex justify-between">
      <div>
      <p className="text-xs text-gray-500">{event.description}</p>
      </div>
      
      <div className="text-xs text-gray-500">
        <p>Start Time: {event.startTime}</p>
        <p>End Time: {event.endTime}</p>
      </div>
      </div>

      <div className="flex justify-between mt-2">
        <Button variant="ghost" onClick={onEdit} className="text-blue-500 px-2 py-1">
          Edit
        </Button>
        <Button
          variant="ghost"
          onClick={() => onDelete(event.id)}
          className="text-red-500 px-2 py-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
