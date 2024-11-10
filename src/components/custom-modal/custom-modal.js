import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';


const CustomModal = ( {show, handleClose, title, onSubmit}) => {
  const [inputValue, setInputValue] = useState('');
  const [label, setLabel] = useState('');
  const [cardUser, setCardUser] = useState('');


  const handleInputChange = (e) =>setInputValue(e.target.value)
  const handleUserChange = (e) => setCardUser(e.target.value)
  const handleLabelChange = (e) => setLabel(e.target.value)

  const handleSubmit = () =>{
    if(title=== 'Card'){
      onSubmit(inputValue, label, cardUser)
    }else{
      onSubmit(inputValue)

    }
    setInputValue('');
    setLabel('');
    setCardUser('');

    handleClose()
  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{`Enter ${title} name`}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter ${title} name here..`}
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>

            {title === 'Card' && (
              <>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter label..."
                  value={label}
                  onChange={handleLabelChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user..."
                  value={cardUser}
                  onChange={handleUserChange}
                />
              </Form.Group>
              </>
            )}
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CustomModal