import React, { useState } from 'react'
import './board.css'
import { MoreHorizontal } from 'react-feather'
import { Card } from './card/card'
import AddCard from './add-item/add-item'
import CustomModal from './custom-modal/custom-modal'

export const Board = ({board, addCard , clearAllCards}) => {
  console.log('addcard in borad',addCard);
  
  const [ShowModal, setShowModal] =useState(false)

  const handleShowModal = () => setShowModal(true);  
  const handleCloseModal = () => setShowModal(false);

  const addCardForBoard = (title, label, user) =>{
    addCard(board.id, title, label, user)
    handleCloseModal()
  }
  
  return (
    <div className='board'>
        <div className='board-top'>
          <p className='board-title'>{board.title} <span>{board.cards.length}</span> </p>
          <MoreHorizontal/>
        </div>
        <div className='board-cards custom-scroll'>
          {board.cards.map( (card) =>
           (<Card key={card.id} card={card}/>)
          )}
          
          {/* <AddCard /> */}
          <button onClick={handleShowModal}>Add Card</button>
          <button onClick={() => clearAllCards(board.id)}>Clear All Cards</button>


        </div>
        <CustomModal show={ShowModal} handleClose={handleCloseModal} title='Card' onSubmit={(title, label, user)=>addCardForBoard(title, label, user)} />
      
    </div>
  )
}


