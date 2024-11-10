import React, { useState } from 'react'
import './card.css'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import Dropdown from '../dropdown/dropdown';
import { useDrag } from 'react-dnd';

export const Card = ({card, boardId}) => {
  console.log('prps',card);
  
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  }
   // Set up drag functionality
   const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className='card' 
    ref={drag}
    style={{
      opacity: isDragging ? 0.5 : 1, // Optional styling to indicate dragging
      cursor: 'move',
    }}>
      <div className='card-top'>
        <div className='card-top-label'>
          <label>{card.label}</label>
        </div>
        <p>{card.user}</p>
        <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          ></div>
        <MoreHorizontal onClick={toggleDropdown}/>
        {showDropdown && (
              <Dropdown
                class="board_dropdown"
                isOpen={showDropdown}  
                onClose={() => setShowDropdown(false)}
              >
                <p >
                  Delete Card
                </p>
              </Dropdown>
            )}
      </div>

      <div className='card-title'>{card.title}

      </div>

      <div className='cards-footer'>
        <p><Clock /> 20 sept</p>
        <p><CheckSquare /> 1/4</p>

        
      </div>
    </div>
  )
}


