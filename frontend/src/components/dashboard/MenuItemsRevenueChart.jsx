// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari shah
// ==========================================

import { Card, CardContent, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { getMenuItemsSalesData } from '../../services/dashboardService';
import BarChart from '../commons/BarChart';

const MenuItemsRevenueChart = () => {
  const label = 'Total Sales';
  const [labels, setLabels] = useState();
  const [data, setData] = useState([]);

  const [message, setMessage] = useState();

  useEffect(() => {
    getMenuItemsSalesData().then((res) => {
      let labels = [];
      let data = [];
      res.data.map((d) => {
        labels.push(d.itemName);
        data.push(d.totalSales);
      });
      setData(data);
      setLabels(labels);
      if (data.length <= 0)
      setMessage("No data to display");
    }).catch(err => {
      setMessage(err);
  });
  }, []);

  return (
    <Card sx={{ width: 'inherit', height: 'inherit' }}>
      <CardContent sx={{ width: 'inherit', height: 'inherit', display:'flex', flexDirection: "column", justifyContent: "center" }}>
        {data.length > 0 ?
        <BarChart labels={labels} label={label} data={data} />
        : <Typography variant='h1' sx={{ textAlign:'center'}}>{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default MenuItemsRevenueChart;
