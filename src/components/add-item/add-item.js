import React from 'react'
import { X } from 'react-feather'

const AddCard = () => {
  return (
    <div className='add-card'>
      <p className='add-card-display'>Add Card</p>
      <form>
      <div className='add-card-edit'>
        <input type='text' />
        <div className='add-card-edit-footer'>
            <button type='submit'>Add</button>
            <X />
        </div>
      </div>
      </form>
     
    </div>
  )
}

export default AddCard
