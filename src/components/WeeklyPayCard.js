import { useState } from 'react';
import CalculationsModal from './CalculationsModal';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const WeeklyPayCard = ({ toFinalPay, amounts}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modaldata, setModaldata] = useState({});
  
  return (
    <Container id="wpCard">
      <Card className="card text-center">
        <Card.Header>Not Final Pay</Card.Header>
        <Card.Body id="wpBody">
          <Card.Title>Driver Week Pay Breakdown</Card.Title>
          <Button 
            variant="outline-success" 
            onClick={() => {
              setModaldata({ 
                title : "Per Delivery Commission (Earnings)",  
                body: "Driver earnings is calculated by taking their Active Engaged Time (AET), in minutes, and dividing it by the number of orders for the week. This will produce an average active engaged time per order, which is then to be divided by the total of minutes in an hour (60), to calculate what percentage of each hour is payed at the local rate. Finally, this percentage is multiplied by the local rate to produce the per delivery commission.",
                aetFormulat: "AET / # of Orders = Average AET Pay:",
                avgPerHour: 
                  `${amounts.aet} / ${amounts.orders} = ${parseFloat(amounts.aet / amounts.orders).toFixed(1)} minutes:`,
                percentageFormula: "(Average AET Pay / # of Orders) / 1 hour in minutes = Percentage of Hour To Pay:",
                percent:
                  `${parseFloat(amounts.aet / amounts.orders).toFixed(1)} / 60 = ${parseFloat(amounts.percentage).toFixed(4)}%`,
                pdcFormula: "Percentage * Local Rate = PDC:",
                pdc:
                  `${parseFloat(amounts.percentage).toFixed(4)}% * $${parseFloat(amounts.localRate).toFixed(2)} = $${parseFloat(amounts.pdc).toFixed(2)}`
              });
              setModalShow(true);
            }} 
            size="sm">
            <strong>Per Delivery Commission:</strong> ${parseFloat(amounts.pdc).toFixed(2)}
          </Button>

          <Button 
            variant="outline-success" 
            onClick={() => {
              setModaldata({
                title: "Mileage",
                body: "Driver mileage earnings are calculated by multiplying the total miles driven in a week, by the fixed 0.30 cent rate.",
                formula: "Total Miles * Mileage Rate = Mileage:",
                mileage: `${amounts.miles} * $0.30 = $${parseFloat(amounts.mileage).toFixed(2)}`,
              })
              setModalShow(true)
            }} 
            size="sm"><strong>Mileage:</strong> ${parseFloat(amounts.mileage).toFixed(2)}</Button>

          <Button 
            variant="outline-success" size="sm" disabled><strong>Tips:</strong> ${parseFloat(amounts.tips).toFixed(2)}</Button>

          { amounts.weeklyRewards.length > 1 ? 
            <Button 
              onClick={() => setModalShow(true)} 
              variant="outline-success" 
              size="sm"><strong>Weekly Rewards:</strong> ${parseFloat(amounts.weeklyRewards).toFixed(2)}</Button> : 
            null
          }
          <Button 
            onClick={() => {
              setModaldata({
                title: "Weekly Pay",
                body: "Driver weekly pay is calculated by adding the following: ",
                formula: `Per Driver Commission (Earnings) + Mileage + Weekly Rewards (if any) + Tips = Week Pay:`,
                calc: `$${parseFloat(amounts.pdc).toFixed(2)} + $${parseFloat(amounts.mileage).toFixed(2)} + $${parseFloat(amounts.weeklyRewards).toFixed(2)} + $${parseFloat(amounts.tips).toFixed(2)} = $${parseFloat(amounts.weekPay).toFixed(2)}`
              })
              setModalShow(true);
            }}
            variant="success" 
            size="sm"><strong>Week Pay:</strong> ${parseFloat(amounts.weekPay).toFixed(2)}</Button>
        </Card.Body>
      </Card>
      
        {amounts.finalPay > 0 ?
          <div className="d-grid">
            <Button variant={"primary"} onClick={toFinalPay}>To Final Pay</Button> 
          </div> :
          <div className="d-grid">
            <Button variant={"primary"} onClick={toFinalPay}>Calculate Final Pay</Button> 
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

export default WeeklyPayCard
