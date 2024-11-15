import React, { useState } from "react";
import "./board.css";
import { MoreHorizontal, Plus } from "react-feather";
import { Card } from "./card/card";
import CustomModal from "./custom-modal/custom-modal";
import { useDrop } from "react-dnd";
import { Popover, OverlayTrigger } from "react-bootstrap";

export const Board = ({
  board,
  index,
  addCard,
  clearAllCards,
  moveCardToBoard,
  deleteBoard,
  addBoardHandler
}) => {
  const [ShowModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  
  //add section between sections
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const togglePopover = () => setShowPopover(!showPopover);
  //add section between
  
  const handleOpenAddSectionModal = () => setShowAddSectionModal(true);
  const handleCloseAddSectionModal = () => setShowAddSectionModal(false);


  const addCardForBoard = (title, label, user, dueDate) => {
    addCard(board.id, title, label, user, dueDate);
    handleCloseModal();
  };

  //  drop target for this board
  const [,drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      // only move card if the source and target boards are different
      if (item.boardId !== board.id) {
        moveCardToBoard(item.id, item.boardId, board.id);
      }
    },
  });

  const closePopOver = () => {
    setShowPopover(false);
    console.log(showPopover);
  };

  const handleAddSection = (title) => {
    addBoardHandler(title, index); 
    handleCloseAddSectionModal();
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Are you sure you want to delete this board?
        <br />
        <div className="popover-btns">
          <button
            onClick={() => deleteBoard(board.id)}
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

  
  return (
    <div className="board" ref={drop}>
      <div className="board-top">
        <p className="board-title">
          {board.title} <span>{board.cards.length}</span>{" "}
        </p>
        <span>
        <Plus size={20} onClick={handleOpenAddSectionModal} style={{ cursor: 'pointer' }} />
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <MoreHorizontal />
        </OverlayTrigger>
        </span>
       
      </div>
      <div className="board-cards custom-scroll">
        {board.cards.map((card) => (
          <Card key={card.id} card={card} boardId={board.id} />
        ))}

        {/* <AddCard /> */}
        <button className="add-card-trans-btn" onClick={handleShowModal}>
          <span className="icon-text">
            <Plus size={16} />
            Add Task
          </span>
        </button>
        {/* <button onClick={() => clearAllCards(board.id)}>Clear All Cards</button> */}
      </div>
      <CustomModal
        show={ShowModal}
        handleClose={handleCloseModal}
        title="Card"
        onSubmit={(title, label, user, dueDate) =>
          addCardForBoard(title, label, user, dueDate)
        }
      />

      <CustomModal
        show={showAddSectionModal}
        handleClose={handleCloseAddSectionModal}
        title="Add Section"
        onSubmit={(title)=>handleAddSection(title)}
        
      />
    </div>
  );
};
