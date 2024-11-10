import React, { useState } from 'react'
import './board.css'
import { MoreHorizontal, Plus } from 'react-feather'
import { Card } from './card/card'
import AddCard from './add-item/add-item'
import CustomModal from './custom-modal/custom-modal'
import { useDrop } from 'react-dnd';

export const Board = ({board, addCard , clearAllCards, moveCardToBoard}) => {
  console.log('addcard in borad',addCard);
  
  const [ShowModal, setShowModal] =useState(false)

  const handleShowModal = () => setShowModal(true);  
  const handleCloseModal = () => setShowModal(false);

  const addCardForBoard = (title, label, user) =>{
    addCard(board.id, title, label, user)
    handleCloseModal()
  }

    // Set up the drop target for this board
    const [, drop] = useDrop({
      accept: 'CARD',
      drop: (item) => {
        // Only move card if the source and target boards are different
        if (item.boardId !== board.id) {
          moveCardToBoard(item.id, item.boardId, board.id);
        }
      },
    });
  
  
  return (
    <div className='board' ref={drop}>
        <div className='board-top'>
          <p className='board-title'>{board.title} <span>{board.cards.length}</span> </p>
          <MoreHorizontal/>
        </div>
        <div className='board-cards custom-scroll'>
          {board.cards.map( (card) =>
           (<Card key={card.id} card={card} boardId={board.id}/>)
          )}
          
          {/* <AddCard /> */}
          <button className="add-card-trans-btn" onClick={handleShowModal}>
            <span className='icon-text'>
              <Plus size={16}/>
              Add Task
            </span>
          </button>
          <button onClick={() => clearAllCards(board.id)}>Clear All Cards</button>


        </div>
        <CustomModal show={ShowModal} handleClose={handleCloseModal} title='Card' onSubmit={(title, label, user)=>addCardForBoard(title, label, user)} />
      
    </div>
  )
}


