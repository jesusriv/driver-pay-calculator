(() => {
  setModaldata({ 
    title : "Per Delivery Commission (Earnings)",  
    body: "Driver earnings is calculated by taking their Active Engaged Time (AET), in minutes, and dividing it by the number of orders for the week. This will produce an average active engaged time per order, which is then to be divided by the total of minutes in an hour (60), to calculate what percentage of the hour this new average per order is. Finally, this percentage is multiplied by the local rate to produce the per delivery commission.",
    avgPerHour: 
      `AET: ${amounts.aet} / Orders: ${amounts.orders} = ${parseFloat(amounts.aet / amounts.orders).toFixed(1)} minutes`,
    percent:
      `Average AET: ${parseFloat(amounts.aet / amounts.orders).toFixed(1)} / 60 = ${parseFloat(amounts.percentage).toFixed(2)})`,
    pdc:
      `Percentage: ${parseFloat(amounts.percentage).toFixed(2)} * Local Rate: $14 = PDC: $${parseFloat(amounts.pdc).toFixed(2)}`
  });
  setModalShow(true);
});