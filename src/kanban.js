import logo from "./logo.svg";
import "./App.css";
import { Board } from "./components/board";
import { useEffect, useState } from "react";
import CustomModal from "./components/custom-modal/custom-modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Kanban() {
  const [ShowModal, setShowModal] = useState(false);
  const initialBoard = [
    { id: uuidv4(), title: "To Do", cards: [] },
    { id: uuidv4(), title: "In Progress", cards: [] },
    { id: uuidv4(), title: "Completed", cards: [] },
  ];
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem("prac-kanban");
    console.log(savedBoards);
    return savedBoards && JSON.parse(savedBoards).length !== 0
      ? JSON.parse(savedBoards)
      : initialBoard;
  });

  const HandleShowModal = (type) => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const addboardHandler = (name, index = null) => {
    const newBoard = {
      id: uuidv4(),
      title: name,
      cards: [],
    };
    // setBoards((prevBoards) => [...prevBoards, newBoard]);
    setBoards((prevBoards) => {
      let updatedBoards;
      if (index !== null) {
        updatedBoards = [
          ...prevBoards.slice(0, index + 1),
          newBoard,
          ...prevBoards.slice(index + 1),
        ];
      } else {
        updatedBoards = [...prevBoards, newBoard];
      }
      localStorage.setItem("prac-kanban", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
    console.log("boards2", boards);
  };

  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board.id != boardId);
    setBoards(updatedBoards);
    console.log("boards3", boards);
    localStorage.setItem("prac-kanban", JSON.stringify(updatedBoards));
  };

  const addCardHandler = async (
    boardId,
    cardTitle,
    label,
    cardUser,
    dueDate
  ) => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/card/add-card",
        {
          title: cardTitle,
          label: label,
          user: cardUser,
          dueDate: dueDate,
          boardId: boardId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data && response.data.status === 1) {
        const newCard = response.data.data;
        setBoards((prevBoards) =>
          prevBoards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  cards: [...board.cards, newCard],
                }
              : board
          )
        );
      } else {
        console.error("Error adding card:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };
  // const clearAllBoardsHandler = () => {
  //   setBoards([]); // Set the boards state to an empty array
  //   localStorage.removeItem("prac-kanban"); // Clear data from local storage as well
  // };

  const clearAllCards = (boardId) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            cards: [],
          };
        }
        return board;
      });
    });
  };

  // drag and drop for cards over boards
  const moveCardToBoard = async (cardId, sourceBoardId, targetBoardId) => {
    const authToken = localStorage.getItem("authToken");

    setBoards((prevBoards) => {
      const sourceBoard = prevBoards.find(
        (board) => board.id === sourceBoardId
      );
      const targetBoard = prevBoards.find(
        (board) => board.id === targetBoardId
      );

      // find the card in source board
      const cardToMove = sourceBoard.cards.find((card) => card.id === cardId);

      if (!cardToMove) return prevBoards;

      // removing the card from source board and adding to target board
      return prevBoards.map((board) => {
        if (board.id === sourceBoardId) {
          return {
            ...board,
            cards: board.cards.filter((card) => card.id !== cardId),
          };
        } else if (board.id === targetBoardId) {
          return {
            ...board,
            cards: [...board.cards, cardToMove],
          };
        } else {
          return board;
        }
      });
    });
    console.log("boards1", boards);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/card/update-board",
        {
          cardId,
          targetBoardId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status !== 1) {
        console.error("API error:", response.data.message);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
    const authToken = localStorage.getItem("authToken");

    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/board/get-boards",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (Array.isArray(response.data.boards)) {
          setBoards(response.data.boards);
          console.log("boards1", boards);
        } else {
          console.error("Invalid boards data", response.data);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="navbar">
          <h1>kanboard</h1>
        </div>
        {/* <button onClick={clearAllBoardsHandler} className="clear-all-button">
          Clear All
        </button> */}

        <div className="content">
          <div className="add-section-btn-container">
            <button type="submit" onClick={() => HandleShowModal("Section")}>
              Add Section
            </button>
          </div>

          <div className="boards-content">
            {boards.map((item, index) => (
              <Board
                key={item.id}
                board={item}
                index={index}
                addCard={addCardHandler}
                clearAllCards={clearAllCards}
                moveCardToBoard={moveCardToBoard}
                deleteBoard={deleteBoard}
                addBoardHandler={addboardHandler}
                setBoards={setBoards}
              />
            ))}
          </div>
        </div>

        <CustomModal
          show={ShowModal}
          handleClose={handleCloseModal}
          title="Section"
          onSubmit={addboardHandler}
        />
      </div>
    </DndProvider>
  );
}

export default Kanban;
