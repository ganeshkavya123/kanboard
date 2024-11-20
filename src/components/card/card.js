import React, { useState } from "react";
import "./card.css";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import { useDrag } from "react-dnd";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { OverlayTrigger, Popover } from "react-bootstrap";
import defaultUserImg from "../../assets/default-user.jpeg";

export const Card = ({ card, boardId, deleteCard }) => {
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

  const deleteCardHandler = (cardId) => {
    deleteCard(cardId, boardId);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Are you sure you want to delete this card?
        <br />
        <div className="popover-btns">
          <button
            onClick={() => deleteCardHandler(card.id)}
            className="btn btn-danger btn-sm custom-pop-btn"
          >
            Delete
          </button>
          {/* <button onClick={closePopOver} className="btn btn-secondary btn-sm custom-pop-btn">
              Cancel
            </button> */}
        </div>
      </Popover.Body>
    </Popover>
  );

  const getDueDateStyle = (dueDate) => {
    const date = new Date(dueDate);

    if (isToday(date)) {
      return { color: "blue" };
    } else if (isPast(date)) {
      return { color: "red" };
    } else if (isTomorrow(date)) {
      return { color: "green" };
    } else {
      return {}; // Default styling
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
        <span className="align-card-more">
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <MoreHorizontal className="more-icon" />
          </OverlayTrigger>
        </span>
      </div>

      <div className="card-title">{card.title}</div>

      <div className="cards-footer">
        <div className="user-info">
          <img
            src={defaultUserImg}
            // alt="User"
            className="user-avatar"
          />
          <p className="decor-user">{card.user}</p>
        </div>
        <div>
          <p className="decor-date" style={getDueDateStyle(card.dueDate)}>
            {/* <Clock />  */}
            {card.dueDate ? formateDueDate(card.dueDate) : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
