import React, { useEffect, useRef } from 'react'
import './dropdown'

const Dropdown = (props) => {
    const dropdownRef = useRef()

    const handleClick = (event) => {
        console.log(event);

        if(dropdownRef && !dropdownRef.current?.contains(event.target) && props.onClose){
            props.onClose();
        }
        

    }

    useEffect( ()=>{

        if(props.isOpen){
            document.addEventListener('click', handleClick);
        } else {
          document.removeEventListener('click', handleClick);
        }
        
        return () =>{
            document.removeEventListener('click', handleClick)
        }
    }, [props.isOpen])
    
  return (
    <div ref={dropdownRef} className={`dropdown custom-scroll ${props.class ? props.class : ""}`}>
      {props.children}
    </div>
  )
}

export default Dropdown
