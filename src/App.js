import logo from './logo.svg';
import './App.css';
import { Board } from './components/board';
import { useEffect, useState } from 'react';
import CustomModal from './components/custom-modal/custom-modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const [ShowModal, setShowModal] =useState(false)

  const [boards, setBoards] = useState(() =>{
    // JSON.parse(localStorage.getItem("prac-kanban")) || []
    const savedBoards = localStorage.getItem("prac-kanban");
    return savedBoards ? JSON.parse(savedBoards) : [];
  }
  );

  const HandleShowModal = (type) => {
    setShowModal(true);
    
  }

  const handleCloseModal = () => setShowModal(false);

  const addboardHandler = (name) => {
    console.log(boards);
    
    // const tempBoards = [...boards];
    // tempBoards.push({
    //   id: Date.now() + Math.random() * 2,
    //   title: name,
    //   cards: [],
    // });
    // setBoards(tempBoards);
    const newBoard = {
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
    // setBoards([]);

  };

  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter( (board) => board.id!=boardId)
    setBoards(updatedBoards)
  }

  const addCardHandler = (boardId, cardTitle, label, cardUser) => {
    // const index = boards.findIndex((item) => item.id === id);
    // if (index < 0) return;

    // const tempBoards = [...boards];
    // tempBoards[index].cards.push({
    //   id: Date.now() + Math.random() * 2,
    //   title,
    //   labels: [],
    //   date: "",
    //   tasks: [],
    // });
    // setBoards(tempBoards);
    console.log('------------');
    
    setBoards((prevBoards) => {
      console.log(prevBoards);

      prevBoards.map( e => {
        if(e.id === boardId){
          console.log(e.cards);
          
        }        
      })
      
      return prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              cards: [
                ...board.cards,
                { id: Date.now() + Math.random() * 2, title: cardTitle, label: label, user: cardUser },
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
            cards: [], // Clear all cards for this board
          };
        }
        return board;
      });
    });
  };

    // Function to move card between boards
    const moveCardToBoard = (cardId, sourceBoardId, targetBoardId) => {
      setBoards((prevBoards) => {
        // Find source and target boards
        const sourceBoard = prevBoards.find((board) => board.id === sourceBoardId);
        const targetBoard = prevBoards.find((board) => board.id === targetBoardId);
  
        // Find the card in the source board
        const cardToMove = sourceBoard.cards.find((card) => card.id === cardId);
  
        if (!cardToMove) return prevBoards;
  
        // Remove the card from the source board and add it to the target board
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
      <div className='navbar'>
        <h1>kanboard</h1>
      </div>
      {/* <button onClick={clearAllBoardsHandler} className="clear-all-button">
          Clear All
        </button> */}

      <div className='content'>
        <div className='add-section-btn-container'>
        <button type='submit' onClick={() => HandleShowModal('Section')}>Add Section</button>

        </div>

        <div className='boards-content'>
         {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              clearAllCards={clearAllCards}
              moveCardToBoard={moveCardToBoard}
            />
          ))}

        </div>
      </div>

      <CustomModal show={ShowModal} handleClose={handleCloseModal} title='Section' onSubmit={addboardHandler} />
     
    </div>
    </DndProvider>
    
  );
}

export default App;
