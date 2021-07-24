import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EditLGRates from './EditLGRates';

const WeeklyPay = ({ calculateWP, amounts, setAmounts }) => {
  const [wR, setWr] = useState(true);
  const [type, setType] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [tempAmounts, setTempAmounts] = useState({
    aet: "",
    orders: "",
    miles: "",
    weeklyRewards: 0,
    tips: ""
  })

  const radios = [
    { name: "Minutes", value: 1 },
    { name: "Hours", value: 2 }
  ]

  const clearAll = () => {
    setTempAmounts({
      ...tempAmounts, 
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
             setTempAmounts({
              ...tempAmounts,
              aet: e.target.value
            })}}  
            value={tempAmounts.aet.toString()} 
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
            setTempAmounts({
              ...tempAmounts,
              orders: e.target.value
            })
          }} value={tempAmounts.orders.toString()} placeholder="0" type="number" className="form-control"  />
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="miles" className="form-label"><strong>Actual Miles</strong></label>
          <input onChange={(e) => {
            setTempAmounts({
              ...tempAmounts, 
              miles: e.target.value
            })
          }} value={tempAmounts.miles.toString()} placeholder="0" type="number" className="form-control" id="miles" aria-describedby="m" />
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="weeklyRewards" className="form-label"><strong>Weekly Rewards</strong></label>
          <input onChange={(e) => {
            setTempAmounts({
              ...tempAmounts,
              weeklyRewards: e.target.value
            })
          }} value={tempAmounts.weeklyRewards.toString()} placeholder="0" type="number" className="form-control" id="weeklyRewards" aria-describedby="wR" disabled={wR} />
          <input onChange={() => setWr(!wR)} className="form-check-input" type="checkbox" value="" id="wR" />
          <label id="check-wr" className="form-check-label" htmlFor="flexCheckDefault">
            Does the driver have any weekly rewards?
          </label>
        </Form.Group>

        <Form.Group className="mb-2">
          <label htmlFor="tips" className="form-label"><strong>Tips</strong></label>
          <input onChange={(e) => {
            setTempAmounts({
              ...tempAmounts,
              tips: e.target.value
            })
          }} value={tempAmounts.tips.toString()} placeholder="0" type="number" className="form-control" id="tips" aria-describedby="tps" />
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            Edit Local and Guranteed Rate's
          </Button>
        </div>
      </Form>
      
      <div className="d-grid">
        <Button variant="primary" type="submit" onClick={() => {
          setAmounts({
            ...amounts,
            aet: parseFloat(tempAmounts.aet),
            orders: parseFloat(tempAmounts.orders),
            miles: parseFloat(tempAmounts.miles),
            weeklyRewards: parseFloat(tempAmounts.weeklyRewards),
            tips: parseFloat(tempAmounts.tips)
          })
          calculateWP(type.toLocaleLowerCase());
        }}>
          Next
        </Button>
      </div>
      <div className="d-grid">
        <Button variant="light" type="submit" onClick={clearAll}>
          Clear
        </Button>
      </div>
      
      <EditLGRates 
        show={modalShow}
        onHide={() => setModalShow(false)}
        amounts={amounts}
        setAmounts={setAmounts}
      />
    </div>
  )
}

export default WeeklyPay
