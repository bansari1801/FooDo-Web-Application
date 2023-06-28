
// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";


import { tokens } from "../../Theme";
import BarChart from "../commons/BarChart";
import { Height } from "@mui/icons-material";
import LineChart from "../commons/LineChart";
import { useEffect, useState } from "react";
import { getDailySalesData } from "../../services/dashboardService";
import moment from "moment";



const DailySalesChart = (props) => {
  const colors = tokens();

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const [message, setMessage] = useState();

  // const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
  const label = "Total sales";
  // const data = [200, 300, 1300, 520, 2000, 350,150];

useEffect(() => {
getDailySalesData(7).then((res) => {

  let tempLabels = [];
  let tempData = [];
    console.log(res.data);
    res.data.map((row) => {
      tempLabels.push(moment(row.date).format('MM-DD-YY'));
      tempData.push(row.sales);
    })

    setLabels(tempLabels);
    setData(tempData);
    if (data.length <= 0)
      setMessage("No data to display");

  }).catch(err => {
    setMessage(err);
});


}, [])

  return (
          <Card sx={{width:"inherit", height:"inherit"}}>
            <CardContent sx={{ width: 'inherit', height: 'inherit', display:'flex', flexDirection: "column", justifyContent: "center" }}>
              {data.length > 0 ? 
          <LineChart labels={labels} label={label} data={data} />
          : <Typography variant='h1' sx={{ textAlign:'center'}}>{message}</Typography>}
          </CardContent>
          </Card>
  );
};

export default DailySalesChart;
