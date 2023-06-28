// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { tokens } from "../../Theme";


import DataTable from "../commons/DataTable";
import Pagination from "../commons/Pagination";
import { SearchTextField } from "../commons/SearchTextField";
import Title from "../commons/Title";
import SimpleDialog from "../order_management/viewOrder";

const columns = [
  { id: "orderDate", label: "Order\u00a0Date", minWidth: 170 },
  { id: "customerName", label: "Customer\u00a0Name", minWidth: 100 },
  {
    id: "customerEmail",
    label: "Customer\u00a0Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

function createData(orderDate, customerName, customerEmail, amount) {
  return { orderDate, customerName, customerEmail, amount };
}

const rows = [
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
  createData("27-02-2023", "Khush Gondaliya", "khush@gmail.com", 258),
];

export const SalesReport = () => {
  const colors = tokens();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState(null);

  const onSearchFieldChange = (value) => {
    console.log(value);
  };

  const viewItem = () => {
    console.log("View Item");
    setOpen(true);
    const odr = {
      c_name: "John Doe",
      phn_num: "9028979879",
      total_items: 3,
      total_amout: "120",
    };
    setOrder(odr);
  };

  return (
    <Box className="pageBackground">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Title titleText="Sales Report" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                padding: "20px",
                backgroundColor: colors.primary[500],
              }}
            >
              <Box sx={{ p: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <SearchTextField
                        placeholder="Search"
                        onChange={(value) => onSearchFieldChange(value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box
                      spacing={2}
                      sx={{ display: "flex", alignItems: "flex-end" }}
                    >
                      <TextField
                        id="dateTo"
                        type="date"
                        placeholder="Start Date"
                        variant="standard"
                        // focused
                        sx={{
                          mr: "10px",
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                      />
                      <TextField
                        id="dateFrom"
                        type="date"
                        placeholder="End Date"
                        variant="standard"
                        // focused
                        InputLabelProps={{ shrink: true, required: true }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <DataTable
                minHeight="650px"
                columns={columns}
                data={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                isView={true}
                onViewItem={viewItem}
              />
              <Pagination
                data={rows}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <SimpleDialog
                open={open}
                order={order}
                onClose={() => setOpen(false)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SalesReport;
