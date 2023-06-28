// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { tokens } from "../../Theme";
import MenuItemsRevenueChart from "./MenuItemsRevenueChart";
import CuisineSalesChart from "./CuisineSalesChart";
import { useEffect, useState } from "react";
import { getCounts } from "../../services/dashboardService";
import DailySalesChart from "./DailySalesChart";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const Dashboard = () => {
  const colors = tokens();

  const navigate = useNavigate();

  const [count, setCount] = useState({
    activeOrdersCount: 0,
    menuItemsCount: 0,
    staffCount: 0,
    sales: 0
  });

  useEffect(() => {
getCounts().then((res) => {
  setCount(res.data);
})
  }, [])

  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h3">Active Orders</Typography>
                <Typography variant="h1" onClick={() => navigate('/order')}>{count.activeOrdersCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h3">Menu Items</Typography>
                <Typography variant="h1" onClick={() => navigate('/menu')}>{count.menuItemsCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h3">Staff</Typography>
                <Typography variant="h1" onClick={() => navigate('/staff')}>{count.staffCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h3">Last Month Sales</Typography>
                <Typography variant="h1" onClick={() => navigate('/order')}>{count.sales}</Typography>
              </CardContent>
            </Card>
          </Grid>
        {/* </Grid>

        <Grid container spacing={2} sx={{ marginTop: "5px" }}> */}
          <Grid item xs={12} md={12} xl={12} sx={{ height: "380px" }}>
            <MenuItemsRevenueChart />
          </Grid>
        {/* </Grid>

        <Grid container spacing={2} sx={{ marginTop: "5px" }}> */}
          <Grid item xs={12} md={6} xl={6} sx={{ height: "380px", marginTop:"1rem" }}>
            <DailySalesChart />
          </Grid>
          <Grid item xs={12} md={6} xl={6} sx={{ height: "380px", marginTop:"1rem" }}>
            <CuisineSalesChart />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
