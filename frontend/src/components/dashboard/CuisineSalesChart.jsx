// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari Shah
// ==========================================

import { VerticalAlignCenter } from '@mui/icons-material';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { getCuisineSalesData } from '../../services/dashboardService';
import PieChart from '../commons/PieChart';

const CuisineSalesChart = () => {
  const label = 'Cuisine Sales Data';
  const [labels, setLabels] = useState();
  const [data, setData] = useState([]);

  const [message, setMessage] = useState();

  useEffect(() => {
    getCuisineSalesData().then((res) => {
      let labels = [];
      let data = [];
      res.data.map((d) => {
        labels.push(d.cuisine);
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
        <PieChart labels={labels} label={label} data={data} />
        : <Typography variant='h1' sx={{ textAlign:'center'}}>{message}</Typography> }

      </CardContent>
    </Card>
  );
};

export default CuisineSalesChart;
