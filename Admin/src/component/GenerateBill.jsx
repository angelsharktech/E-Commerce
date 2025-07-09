import React, { useEffect } from "react";
import { Box, Typography, Grid, Divider, Stack } from "@mui/material";
import moment from "moment";

const GenerateBill = React.forwardRef(({ bill }, ref) => {
  //   const sgst = 9, cgst = 9; // Assuming fixed SGST and CGST for simplicity
  //  const final_total = bill?.bill_amount + sgst + cgst;

  return (
    <Box
      ref={ref}
      sx={{
        padding: 4,
        width: "794px", // A4 width
        border: "1px solid #000",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{ textAlign: "center", bgcolor: "#3f51b5", color: "#fff", py: 1 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Sales Bill
        </Typography>
      </Box>

      {/* Business Info */}
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={8}>
          <Typography>
            <strong>Business Name:</strong> Star Basket
          </Typography>
          <Typography>
            <strong>Address:</strong>Karanje-Mhasave Road,
            <br />
            Satara, Maharashtra, 415002,Maharashtra.{" "}
          </Typography>
          {/* <Typography><strong>Phone Number:</strong> {bill?.mob_no}</Typography> */}
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>GSTIN No:</strong> {bill?.gstin || "N/A"}
          </Typography>
          <Typography>
            <strong>Invoice No:</strong> {bill?._id}
          </Typography>
          <Typography>
            <strong>State:</strong> Maharashtra
          </Typography>
        </Grid>
      </Grid>

      {/* Bill & Shipping Info */}
      <Box sx={{ bgcolor: "#3f51b5", color: "#fff", px: 2, py: 0.5 }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Bill To:</Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        sx={{ border: "1px solid #3f51b5", borderTop: "none", mb: 2 }}
      >
        <Grid item xs={6} sx={{ p: 1 }}>
          <Typography>
            <strong>Name:</strong> {bill?.customer_name}
          </Typography>
          <Typography>
            <strong>Phone No:</strong> {bill?.mob_no}
          </Typography>
          <Typography>
            <strong>GSTIN:</strong> {bill?.customer_gstin || "N/A"}
          </Typography>
          <Typography>
            <strong>State:</strong> {bill?.state || "MH"}
          </Typography>
        </Grid>
      </Grid>

      {/* Products Table */}
      <table
        width="100%"
        border="1"
        style={{ borderCollapse: "collapse", marginBottom: 16 }}
      >
        <thead style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
          <tr>
            <th>S.No</th>
            <th>Goods Description</th>
            <th>QTY</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bill?.products?.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td>{item?.product_detail?.title}</td>
              <td style={{ textAlign: "center" }}>{item?.quantity}</td>
              <td style={{ textAlign: "right" }}>
                {item?.product_detail?.selling_price}
              </td>
              <td style={{ textAlign: "right" }}>{item?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <Grid container spacing={2} style={{ justifyContent: "right" }}>
        <Grid item xs={6}>
          <Grid container>
            <Stack direction="column" spacing={1}>
              {/* <Stack direction="row" justifyContent="space-between">
              <Grid item xs={6}><Typography>Discount:</Typography></Grid>
              <Grid item xs={6}><Typography align="right">₹{bill?.discount || 0}</Typography></Grid>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
              <Grid item xs={6}><Typography>SGST:</Typography></Grid>
              <Grid item xs={6}><Typography align="right">₹ {sgst}</Typography></Grid>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
              <Grid item xs={6}><Typography>CGST:</Typography></Grid>
              <Grid item xs={6}><Typography align="right">₹ {cgst}</Typography></Grid>
              </Stack> */}

              <Stack direction="row" justifyContent="space-between">
                <Grid item xs={6}>
                  <Typography>
                    <h2>Total:</h2>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    <h2>₹{bill?.bill_amount}</h2>
                  </Typography>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        marginTop={"20px"}
      >
        <Grid item ml={4} marginRight={"40px"}>
          <b style={{ fontSize: "12px" }}>
            This is system generated receipt no signature required
          </b>
          <br />
        </Grid>
      </Grid>
    </Box>
  );
});

export default GenerateBill;
