import React, { useState } from 'react'
import './card.css'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import Dropdown from '../dropdown/dropdown';

export const Card = ({card}) => {
  console.log('prps',card);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  }
  return (
    <div className='card'>
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


