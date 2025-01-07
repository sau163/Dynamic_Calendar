
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button"; 
import { useDispatch } from "react-redux";
import { addEvent, editEvent } from "../slice/CalSlice";

const EventForm = ({ event, date, onClose }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(event ? event.description : "");
  const [startTime, setStartTime] = useState(event ? event.startTime : "");
  const [endTime, setEndTime] = useState(event ? event.endTime : "");
  const [eventDate, setEventDate] = useState(date); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setEventDate(event.date);
    }
  }, [event]);

  const handleSubmit = () => {
    const newEvent = {
      id: event ? event.id : new Date().getTime(),
      title,
      description,
      startTime,
      endTime,
      date: eventDate, 
    };

    if (event) {
      dispatch(editEvent(newEvent));
    } else {
      dispatch(addEvent(newEvent));
    }

    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-lg">
        <DialogTitle>Event Details</DialogTitle>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-semibold">
              Start Time
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-sm font-semibold">
              End Time
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
          {/* Display the selected event date */}
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-sm font-semibold">
              Event Date
            </label>
            <input
              id="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
        </form>
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="solid" onClick={handleSubmit}>{event ? "Update" : "Add"} Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
