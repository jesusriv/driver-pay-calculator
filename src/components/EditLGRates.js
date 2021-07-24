import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditLGRates = (props) => {
  const [tempLR, setLR] = useState(parseFloat(props.amounts.localRate).toFixed(2).toString());
  const [tempGR, setGR] = useState(parseFloat(props.amounts.guaranteedRate).toFixed(2).toString());
  return (
    <Modal
      {...props}
      size="md" 
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <h5 style={{ margin: "0 auto" }}>
          Local & Guaranteed Rates
        </h5>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label><strong>Local Rate</strong></Form.Label>
            <Form.Control 
              onChange={ e => setLR(parseFloat(e.target.value)) }
              value={tempLR}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label><strong>Guaranteed Rate</strong></Form.Label>
            <Form.Control 
              onChange={ e => setGR(parseFloat(e.target.value)) }
              value={tempGR}
              type="number"
            />
          </Form.Group>
        </Form>
        <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              onClick={() => {
                props.setAmounts({
                  ...props.amounts,
                  localRate: parseFloat(tempLR),
                  guaranteedRate: parseFloat(tempGR)
                });
                props.onHide();
              }}>
                Confirm
            </Button>
          </div>
          <div className="d-grid">
            <Button 
              variant="outline-danger" 
              type="submit" 
              onClick={props.onHide}>
                Cancel
            </Button>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Form>
          <Form.Text muted>
            Changes made to the Guaranteed and Local Rates are temporary, resetting to the initial values upon refreshing the page.
          </Form.Text>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default EditLGRates;
