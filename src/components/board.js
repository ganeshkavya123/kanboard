import React, { useEffect, useState } from "react";
import "./board.css";
import { Edit, Edit2, MoreHorizontal, Plus, Trash2 } from "react-feather";
import { Card } from "./card/card";
import CustomModal from "./custom-modal/custom-modal";
import { useDrop } from "react-dnd";
import { Popover, OverlayTrigger, Button, Alert } from "react-bootstrap";
import axios from "axios";

export const Board = ({
  board,
  index,
  addCard,
  clearAllCards,
  moveCardToBoard,
  deleteBoard,
  addBoardHandler,
  setBoards,
}) => {
  const [ShowModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  // const [boards, setBoards] = useState([]);

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

  const fetchBoards = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        "http://localhost:3001/api/board/get-boards",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("---", response.data);
      // board = response.data.boards;

      setBoards(response.data.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  //  drop target for this board
  const [, drop] = useDrop({
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

  const handleAddSection = (name) => {
    addBoardHandler(name, index);
    handleCloseAddSectionModal();
  };

  const popover = (
    <Popover id="popover-basic" className="sticky-alert">
      <Popover.Body>
        Are you sure you want to make a change ?
        <br />
        <div className="popover-btns">
          <Trash2 onClick={() => deleteBoard(board.id)} />
          <Edit
            onClick={handleOpenAddSectionModal}
            style={{ cursor: "pointer" }}
          ></Edit>
        </div>
      </Popover.Body>
    </Popover>
  );

  const deleteCard = async (cardId, boardId) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/card/delete/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 1) {
        setBoards((prevBoards) =>
          prevBoards.map((boardItem) =>
            boardItem.id === board.id
              ? {
                  ...boardItem,
                  cards: boardItem.cards.filter((card) => card.id !== cardId),
                }
              : boardItem
          )
        );
      } else {
        console.error("Error deleting card:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const updateCard = async (boardId, cardId, updateData) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `http://localhost:3001/api/card/update/${cardId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 1) {
        console.log("res after update", response.data);

        fetchBoards();
      } else {
        console.error("Error updating card:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleEditBoard = async (updatedData, boardId) => {
    // updateBoard(title);
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `http://localhost:3001/api/board/update/${boardId}`,
        { title: updatedData },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 1) {
        // console.log("res after update", response.data);
        handleCloseModal();
        fetchBoards();
      } else {
        console.error("Error updating card:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="board" ref={drop}>
        <div className="board-top">
          <p className="board-title">
            {board.title} <span>{board.cards.length}</span>{" "}
          </p>
          <span className="icon-container">
            <Plus
              size={20}
              onClick={handleOpenAddSectionModal}
              style={{ cursor: "pointer" }}
              className="small-icon"
            />
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <MoreHorizontal className="small-icon" />
            </OverlayTrigger>
          </span>
        </div>

        <div className="board-cards custom-scroll">
          {board.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              boardId={board.id}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
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
          onSubmit={(name) => handleAddSection(name)}
        />

        <CustomModal
          show={showAddSectionModal}
          handleClose={handleCloseAddSectionModal}
          title="Update Section"
          isEditBoard={true}
          currentData={board}
          onSubmit={(updatedData) => handleEditBoard(updatedData, board.id)}
        />
      </div>
    </>
  );
};
