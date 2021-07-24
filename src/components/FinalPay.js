import React, { useState } from 'react';
import CalculationsModal from './CalculationsModal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const FinalPay = ({ amounts, setAmounts, calculateFinalPay, viewFP, toWeeklyPayCard }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modaldata, setModaldata] = useState({});
  const [tempHours, setHours] = useState({
    hours: ""
  });
  return (
    <Container>
      <h1>Final Pay</h1>
      {!viewFP && amounts.totalScheduledHours !== 'number' ? 
        <div>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label><strong>How Many Hours Was The Driver Scheduled For?</strong></Form.Label>
              <input 
                onChange={(e) => setHours({
                  ...tempHours,
                  hours: e.target.value
                })} 
                value={tempHours.hours.toString()} 
                placeholder="0" type="number" className="form-control" id="totalHours" aria-describedby="tH"/>
            </Form.Group>
          </Form>
          <div className="d-grid">
            <Button 
              variant="primary"
              type="submit" 
              onClick={() => {
                setAmounts({
                  ...amounts,
                  totalScheduledHours: parseFloat(tempHours.hours)
                })
                calculateFinalPay();
            }}>Next</Button>
          </div>
        </div> : 
        // FINAL PAY CARD
        <div>
          <Card className="card text-center">
            <Card.Header>
              Final Pay
            </Card.Header>
            <Card.Body id="wpBody">
              <Card.Title>Driver Final Pay Breakdown</Card.Title>
              <Button 
                variant="outline-success" 
                size="sm"
                onClick={() => {
                  setModaldata({
                    title: "Pay Per Hour",
                    body: "Driver pay per hour is calculated by dividing a driver's per delivery commission by the total hours scheduled for the week.",
                    ppHFormula: "PDC / Total Scheduled Hours = Pay Per Hour:",
                    calc: `$${parseFloat(amounts.pdc).toFixed(2)} / ${amounts.totalScheduledHours} = $${parseFloat(amounts.payPerHour).toFixed(2)}`
                  })
                  setModalShow(true);
                }}
              >
                  <strong>Pay Per Hour:</strong> ${parseFloat(amounts.payPerHour).toFixed(2)}
              </Button>
              <Button 
                variant="outline-success" 
                size="sm" disabled>
                  <strong>Total Hours Scheduled:</strong> {parseFloat(amounts.totalScheduledHours)}
              </Button>
              <Button 
                variant="outline-success" 
                size="sm" disabled>
                  <strong>Gauranteed Rate:</strong> ${parseFloat(amounts.guaranteedRate).toFixed(2)}
              </Button>
              <Button 
                onClick={() => {
                  setModaldata({
                    title: "Driver Adjustments",
                    body: "A driver's adjustments is derived from the subtraction of the PPH from the guranteed rate, multiplied by total hours scheduled for the week.",
                    calc: `(Guaranteed Rate: $${amounts.guaranteedRate} - Pay Per Hour: $${parseFloat(amounts.payPerHour).toFixed(2)} * Total Scheduled Hours ${amounts.totalScheduledHours} = $${parseFloat(amounts.driverAdjustments).toFixed(2)}`
                  });
                  setModalShow(true);
                }}
                variant="outline-success" 
                size="sm">
                  <strong>Driver Adjustments:</strong> ${parseFloat(amounts.driverAdjustments).toFixed(2)}
              </Button>
              <Button 
                onClick={() => {
                  setModaldata({
                    title: "Final Pay",
                    body: "A driver's final pay is derived from the sum of the driver adjustments and week pay.",
                    calc: `Driver Adjustments: $${parseFloat(amounts.driverAdjustments).toFixed(2)} + Week Pay: $${parseFloat(amounts.weekPay).toFixed(2)} = $${parseFloat(amounts.finalPay.toFixed(2))}`
                  })
                  setModalShow(true);
                }}
                variant="success"
              >
                  <strong>Final Pay:</strong> ${parseFloat(amounts.finalPay).toFixed(2)}
              </Button>
            </Card.Body>
          </Card>
          <div className="d-grid">
            <Button variant={"primary"} onClick={toWeeklyPayCard}>Go Back</Button>
          </div>
        </div>
      }
      <CalculationsModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        modaldata={modaldata}
      />
    </Container>
  )
}

export default FinalPay
