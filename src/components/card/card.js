import React, { useState } from 'react'
import './card.css'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import Dropdown from '../dropdown/dropdown';
import { useDrag } from 'react-dnd';

export const Card = ({card, boardId}) => {
  
  const [showDropdown, setShowDropdown] = useState(false);

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
      </div>

      <div className='card-title'>{card.title}

      </div>

      <div className='cards-footer'>
        {/* <p>{card.user}</p> */}
        <p><Clock /> 20 sept</p>
        <p><CheckSquare /> 1/4</p>

        
      </div>
    </div>
  )
}


