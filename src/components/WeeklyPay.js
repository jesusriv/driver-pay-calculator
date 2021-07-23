import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const WeeklyPay = ({ calculateWP, amounts, setAmounts }) => {
  const [wR, setWr] = useState(true);
  const [type, setType] = useState("");

  const radios = [
    { name: "Minutes", value: 1 },
    { name: "Hours", value: 2 }
  ]

  const clearAll = () => {
    setAmounts({
      ...amounts, 
      aet: " ",
      orders: " ",
      miles: " ",
      weeklyRewards: 0,
      tips: " "
    });
  };
  
  return (
    <div>
      <h1>Weekly Pay</h1>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label><strong>Active Engage Time</strong></Form.Label>
          <Form.Control onChange={(e) => {
             setAmounts({
              ...amounts,
              aet: parseFloat(e.target.value)
            })}}  
            value={amounts.aet.toString()} 
            placeholder="0" 
            disabled={type === ""}
            type="number" />

          {radios.map((radio, i) => {
            return (
              <Form.Check
                inline
                key={i}
                id={`radio-${i}`}
                type={"radio"}
                label={radio.name}
                name="radio"
                onChange={() => setType(radio.name)}
              />  
          )})}
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="totalOrders" className="form-label"><strong>Total # of Orders</strong></label>
          <input onChange={(e) => {
            setAmounts({
              ...amounts,
              orders: parseFloat(e.target.value)
            })
          }} value={amounts.orders.toString()} placeholder="0" type="number" className="form-control"  />
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="miles" className="form-label"><strong>Actual Miles</strong></label>
          <input onChange={(e) => {
            setAmounts({
              ...amounts, 
              miles: parseFloat(e.target.value)
            })
          }} value={amounts.miles.toString()} placeholder="0" type="number" className="form-control" id="miles" aria-describedby="m" />
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="weeklyRewards" className="form-label"><strong>Weekly Rewards</strong></label>
          <input onChange={(e) => {
            setAmounts({
              ...amounts,
              weeklyRewards: parseFloat(e.target.value)
            })
          }} value={amounts.weeklyRewards.toString()} placeholder="0" type="number" className="form-control" id="weeklyRewards" aria-describedby="wR" disabled={wR} />
          <input onChange={() => setWr(!wR)} className="form-check-input" type="checkbox" value="" id="wR" />
          <label id="check-wr" className="form-check-label" htmlFor="flexCheckDefault">
            Does the driver have any weekly rewards?
          </label>
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="tips" className="form-label"><strong>Tips</strong></label>
          <input onChange={(e) => {
            setAmounts({
              ...amounts,
              tips: parseFloat(e.target.value)
            })
          }} value={amounts.tips.toString()} placeholder="0" type="number" className="form-control" id="tips" aria-describedby="tps" />
        </Form.Group>
      </Form>
      
      <div className="d-grid">
        <Button variant="primary" type="submit" onClick={() => calculateWP(type.toLocaleLowerCase())}>
          Next
        </Button>
      </div>
      <div className="d-grid">
        <Button variant="light" type="submit" onClick={clearAll}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default WeeklyPay
