import React, { useState } from "react";
import "./card.css";
import {
  CheckSquare,
  Clock,
  Edit,
  MoreHorizontal,
  Trash2,
} from "react-feather";
import { useDrag } from "react-dnd";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { OverlayTrigger, Popover } from "react-bootstrap";
import defaultUserImg from "../../assets/default-user.jpeg";
import CustomModal from "../custom-modal/custom-modal";

export const Card = ({ card, boardId, deleteCard, updateCard }) => {
  const [ShowModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
    <Popover id="popover-basic" className="sticky-alert">
      <Popover.Body>
        Are you sure you want to make a change?
        <br />
        <div className="popover-btns">
          {/* <button
            onClick={() => deleteCardHandler(card.id)}
            className="btn btn-danger btn-sm custom-pop-btn"
          >
            Delete
          </button> */}
          {/* <button onClick={closePopOver} className="btn btn-secondary btn-sm custom-pop-btn">
              Cancel
            </button> */}
          <Trash2 onClick={() => deleteCardHandler(card.id)} />
          <Edit onClick={handleShowModal}></Edit>
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

  const handleEditCard = (title, label, user, dueDate) => {
    dueDate = dueDate.split("T")[0];
    updateCard(boardId, card.id, { title, label, user, dueDate });
    handleCloseModal();
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
        <div className="card-title">{card.title}</div>
        <span className="align-card-more">
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <MoreHorizontal className="more-icon" />
          </OverlayTrigger>
        </span>
      </div>

      <div className="cards-footer">
        <div className="user-info">
          <img
            src={defaultUserImg}
            // alt="User"
            className="user-avatar"
          />
          <p className="decor-user" style={getDueDateStyle(card.dueDate)}>
            {card.dueDate ? formateDueDate(card.dueDate) : "N/A"}
          </p>
        </div>
        <div className="card-l-s">
          <p className="card-f-label">
            <label>{card.label}</label>
          </p>
        </div>
      </div>

      <CustomModal
        show={ShowModal}
        handleClose={handleCloseModal}
        title="Card"
        isEditCard={true}
        currentData={card}
        onSubmit={handleEditCard}
      />
    </div>
  );
};
