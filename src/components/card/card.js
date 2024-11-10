import React, { useState } from "react";
import "./card.css";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import { useDrag } from "react-dnd";
import { format, isToday, isTomorrow } from "date-fns";

export const Card = ({ card, boardId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const formateDueDate = (dueDate) => {
    const date = new Date(dueDate);

    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "MM/dd/yyy");
    }
  };

  return (
    <div
      className="card"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div className="card-top">
        <div className="card-top-label">
          <label>{card.label}</label>
        </div>
      </div>

      <div className="card-title">{card.title}</div>

      <div className="cards-footer">
        <p>{card.user}</p>
        <p>
          <Clock /> {card.dueDate ? formateDueDate(card.dueDate) : "N/A"}
        </p>
        {/* <p><CheckSquare /> 1/4</p> */}
      </div>
    </div>
  );
};
