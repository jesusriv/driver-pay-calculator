import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import GoPuffHeader from './components/GoPuffHeader';
import FinalPay from './components/FinalPay';
import WeeklyPay from './components/WeeklyPay';
import WeeklyPayCard from './components/WeeklyPayCard';

function App() {
  const views = ['wP', 'wPC', 'fP'];
  const [view, setView] = useState(views[0]);
  const [viewFP, setViewFP] = useState(false);
  const [amounts, setAmounts] = useState({
    pdc: "",
    aet: "",
    tips: "",
    miles: "",
    orders: "",
    weekPay: "",
    mileage: "",
    finalPay: "",
    localRate: 14,
    percentage: "",
    payPerHour: "",
    weeklyRewards: 0,
    guaranteedRate: 22.00,
    driverAdjustments: "",
    totalScheduledHours: "",
  });

  const isInHours = (type) => {
    if (type === "hours") setAmounts({ ...amounts, aet: amounts.aet *= 60 })
  }

  const calculateWP = (type) => {
    if (amounts.aet === "" || amounts.orders === "" || amounts.miles === "" || amounts.tips === "" || typeof(amounts.aet) !== 'number' || typeof(amounts.orders) !== 'number' || typeof(amounts.miles) !== 'number' || typeof(amounts.tips) !== 'number' || typeof(amounts.weeklyRewards) !== 'number' ) {
      return;
    }
    isInHours(type);  
    const percentage = (parseFloat(amounts.aet) / amounts.orders) / 60; // ODH?
    const milePay = parseFloat(amounts.miles) * .30;
    const perDC = parseFloat(percentage).toFixed(4) * amounts.localRate;
    const wP = perDC + milePay + parseFloat(amounts.tips) + parseFloat(amounts.weeklyRewards);
  
    setView(views[1]);
    setAmounts({
      ...amounts,
      weekPay: wP,
      pdc: perDC,
      mileage: milePay,
      percentage: percentage
    });
  };

  const calculateFinalPay = () => {
    if (amounts.totalScheduledHours === "" || typeof(amounts.totalScheduledHours) !== 'number') {
      return;
    }
    setViewFP(true);
    const ppH = amounts.pdc / amounts.totalScheduledHours;
    const dA = ((amounts.guaranteedRate - ppH) * parseFloat(amounts.totalScheduledHours));
    const finalWeekPay = dA + parseFloat(amounts.weekPay);
    
    setAmounts({ 
      ...amounts,
      driverAdjustments: dA,
      finalPay: finalWeekPay,
      payPerHour: ppH
    });
  };

  const toFinalPay = () => {
    setView(views[2]);
  };

  const toWeeklyPayCard = () => {
    setView(views[1]);
  }

  return (
    <Container>
      <GoPuffHeader />
        {view === "wP" ?
        <WeeklyPay calculateWP={calculateWP} amounts={amounts} setAmounts={setAmounts} /> :

        view === "wPC" ?
        <WeeklyPayCard toFinalPay={toFinalPay} amounts={amounts} /> :

        view === "fP" ? 
        <FinalPay amounts={amounts} setAmounts={setAmounts} calculateFinalPay={calculateFinalPay} viewFP={viewFP} toWeeklyPayCard={toWeeklyPayCard} />:
        null }
    </Container>
  );
}

export default App;
