import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CalculationsModal = (props) => {
  return (
    <Modal 
      {...props}
      size="lg" 
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Calculations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.modaldata ? 
          Object.keys(props.modaldata).map((item, i) => {
            if (item === 'title') {
              return <h4 key={i}>{props.modaldata[item]}</h4>;
            } else {
              return <p key={i}>{props.modaldata[item]}</p>;
            }
          }) :
          null
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalculationsModal;
