import logo from "./logo.svg";
import "./App.css";
import { Board } from "./components/board";
import { useEffect, useState } from "react";
import CustomModal from "./components/custom-modal/custom-modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

function App() {
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

  const addboardHandler = (name) => {
    const newBoard = {
      id: uuidv4(),
      title: name,
      cards: [],
    };
    // setBoards((prevBoards) => [...prevBoards, newBoard]);
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards, newBoard];
      localStorage.setItem("prac-kanban", JSON.stringify(updatedBoards)); // Save updated boards to localStorage
      return updatedBoards;
    });
  };

  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board.id != boardId);
    setBoards(updatedBoards);
    localStorage.setItem("prac-kanban", JSON.stringify(updatedBoards));
  };

  const addCardHandler = (boardId, cardTitle, label, cardUser, dueDate) => {
    setBoards((prevBoards) => {
      console.log(prevBoards);

      prevBoards.map((e) => {
        if (e.id === boardId) {
          console.log(e.cards);
        }
      });

      return prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              cards: [
                ...board.cards,
                {
                  id: Date.now() + Math.random() * 2,
                  title: cardTitle,
                  label: label,
                  user: cardUser,
                  dueDate: dueDate,
                },
              ],
            }
          : board
      );
    });
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
  const moveCardToBoard = (cardId, sourceBoardId, targetBoardId) => {
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
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

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
            {boards.map((item) => (
              <Board
                key={item.id}
                board={item}
                addCard={addCardHandler}
                clearAllCards={clearAllCards}
                moveCardToBoard={moveCardToBoard}
                deleteBoard={deleteBoard}
                addBoardHandler={addboardHandler}
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

export default App;
