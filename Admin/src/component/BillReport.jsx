import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../hooks/useFetch";
import React, { useCallback, useState } from "react";
import moment from "moment";
import { PrintSharp } from "@mui/icons-material";
import axios from "axios";
import GenerateBill from "./GenerateBill";

const BillReport = () => {
  const bills = useFetch("/salebill/getSaleBill");
  const [calData, setCalData] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const rows = bills.data?.map((bill) => ({
    id: bill._id,
    createdAt: moment(bill.createdAt).format("DD/MM/YYYY"),
    customer_name: bill.customer_name,
    mob_no: bill.mob_no,
    bill_amount: bill.bill_amount,
    pay_mode: bill.pay_mode,
    products: bill.products
      .map((p) => p.product_detail?.title || "N/A")
      .join(", "),
    trans_no: bill.trans_no,
  }));

  // Print bill using native window.print()
  const handlePrint = useCallback(() => {
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 500); // slight delay to ensure rendering
  }, []);

  const sethandlePrint = async (user) => {
    try {
      const result = await axios.get(`/salebill/getSaleBillById/${user.id}`);
      setCalData(result.data);
      setShowPrint(true);
      handlePrint(); // triggers browser print dialog
    } catch (error) {
      console.error("Failed to fetch bill data:", error);
    }
  };

  const columns = [
    { field: "createdAt", headerName: "Date", width: 130 },
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    { field: "mob_no", headerName: "Mobile No", width: 150 },
    { field: "bill_amount", headerName: "Amount", width: 120 },
    { field: "pay_mode", headerName: "Payment Mode", width: 150 },
    { field: "products", headerName: "Products", width: 300 },
    { field: "trans_no", headerName: "Transaction No", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => sethandlePrint(params?.row)}
          style={{
            background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
            color: "whitesmoke",
          }}
        >
          <PrintSharp />
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Screen view only */}
      <Box className="screen-only"
        sx={{
          borderRadius: 4,
          boxShadow: 10,
          background: "white",
          padding: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#c26afc">
          Sale Bill Report
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "70vw", height: "100%" }}
        >
          <Grid item xs={12} md={10} lg={8}>
            <div>
              {!bills ? (
                <Typography variant="h3" color="#177bad">
                  L O A D I N G. . .
                </Typography>
              ) : (
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 10,
                    background: "white",
                    mt: 1,
                  }}
                >
                  <CardContent>
                    <div style={{ height: "450px", width: "100%" }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        getRowId={(row) => row.id}
                        sx={{
                          borderRadius: 2,
                          boxShadow: 2,
                          background: "#f9f9fb",
                          minWidth: 200,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* Print-only content (hidden on screen, shown during printing) */}
      {calData && showPrint && (
        <div className="print-only">
          <GenerateBill bill={calData} />
        </div>
      )}
    </>
  );
};

export default BillReport;
