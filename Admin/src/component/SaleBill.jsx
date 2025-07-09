import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import moment from "moment/moment";
import GenerateBill from "./GenerateBill";

const SaleBill = () => {
  const [billData, setBillData] = useState();
  const [showPrint, setShowPrint] = useState(false);
  const [data, setData] = useState({
    customer_name: "",
    mob_no: "",
    trans_no: "",
  });
  const [productOptions, setProductOptions] = useState([]);
  const [billAmount, setBillAmount] = useState(0);
  const [field, setField] = useState({});
  const [products, setProducts] = useState([
    { product_detail: null, quantity: "", selling_price: "", total: "" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/product/getProduct");
      setProductOptions(res.data);
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (index, selectedProduct) => {
    const updated = [...products];
    if (selectedProduct) {
      updated[index].product_detail = selectedProduct;
      updated[index].selling_price = selectedProduct.selling_price;
      updated[index].quantity = "";
      updated[index].total = "";
    } else {
      updated[index] = {
        product_detail: null,
        quantity: "",
        selling_price: "",
        total: "",
      };
    }
    setProducts(updated);
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;

    productOptions.forEach((product) => {
      if (product._id === updated[index].product_detail?._id) {
        if (product.avail_qty < updated[index]?.quantity) {
          alert("Insufficient quantity available for this product.");
          return;
        } else {
          const quantity = parseFloat(updated[index].quantity || 0);
          const price = parseFloat(updated[index].selling_price || 0);
          updated[index].total = quantity * price;
        }
      }
    });

    setProducts(updated);
    const totalBill = updated.reduce(
      (acc, p) => acc + parseFloat(p.total || 0),
      0
    );
    setBillAmount(totalBill);
  };

  const addProductRow = () => {
    setProducts([
      ...products,
      {
        product_detail: "",
        quantity: "",
        selling_price: "",
        total: "",
        bill_amount: "",
      },
    ]);
  };

  const removeProductRow = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleSubmit = async () => {
    try {
      if (!data.customer_name || !data.mob_no || !field.value) {
        alert("Please fill all required fields.");
        return;
      }
      if ((field.value === "UPI" || field.value === "CARD") && !data.trans_no) {
        alert("Please enter transaction number.");
        return;
      }
      if (data.mob_no.length < 10 || data.mob_no.length > 10) {
        alert("Please enter a valid mobile number.");
        return;
      }
      const payload = {
        customer_name: data.customer_name,
        mob_no: data.mob_no,
        products: products.map((p) => ({
          product_detail: p.product_detail?._id,
          quantity: parseFloat(p.quantity),
          price: parseFloat(p.total),
        })),
        bill_amount: billAmount,
        pay_mode: field.value,
        trans_no: data.trans_no,
      };

      const result = await axios.post("/salebill/addSaleBill", payload);
      alert(result.data.msg);

      if (result.data.status === "Success") {
        for (const p of products) {
          const res = await axios.get(
            `/product/getProductById/${p.product_detail?._id}`
          );
          const qty = res.data.avail_qty - p.quantity;
          if (res.data) {
            await axios.patch(
              `/product/updateProduct/${p.product_detail?._id}`,
              {
                avail_qty: qty,
              }
            );
          }
        }

        const bill = await axios.get(
          `/salebill/getSaleBillById/${result.data.id}`
        );
        setBillData(bill.data);
        setShowPrint(true); // Show bill for printing

        setTimeout(() => {
          window.print(); // Native print
          setShowPrint(false); // Hide again after printing
        }, 1000);
      }

      setData({ customer_name: "", mob_no: "", trans_no: "" });
      setProducts([
        { product_detail: null, quantity: "", selling_price: "", total: "" },
      ]);
      setBillAmount(0);
      setField({ value: "" });
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    }
  };

  const pay_mode = [
    { value: "UPI", label: "UPI" },
    { value: "CASH", label: "Cash" },
    { value: "CARD", label: "Card" },
  ];

  return (
    <>
      {/* Main UI */}
      <div className="screen-only">
        <Grid container justifyContent="center" sx={{ width: "70vw" }}>
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ borderRadius: 4, boxShadow: 10, background: "white" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="#c26afc"
                  gutterBottom
                >
                  Sale Bill
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2} mb={3} direction={"row"}>
                  <TextField
                    label="Customer Name"
                    value={data.customer_name}
                    onChange={(e) =>
                      setData({ ...data, customer_name: e.target.value })
                    }
                    fullWidth
                    required
                  />
                  <TextField
                    label="Mobile Number"
                    value={data.mob_no}
                    onChange={(e) =>
                      setData({ ...data, mob_no: e.target.value })
                    }
                    fullWidth
                    required
                  />
                </Stack>

                <Typography variant="h6" gutterBottom>
                  Products
                </Typography>

                {products.map((product, index) => (
                  <Stack direction="row" spacing={2} mb={2} key={index}>
                    <Autocomplete
                      fullWidth
                      options={productOptions}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value?._id
                      }
                      getOptionLabel={(option) => option?.title || ""}
                      value={product.product_detail || null}
                      onChange={(event, newValue) =>
                        handleProductSelect(index, newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Product Name" />
                      )}
                    />
                    <TextField
                      label="Quantity"
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(index, "quantity", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Unit Price"
                      type="number"
                      value={product.selling_price}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Total"
                      type="number"
                      value={product.total}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                    <IconButton
                      onClick={() => removeProductRow(index)}
                      disabled={products.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}

                <Button
                  startIcon={<AddIcon />}
                  onClick={addProductRow}
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  Add Product
                </Button>

                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={2} mb={2}>
                  <TextField
                    label="Billing Amount"
                    type="number"
                    value={billAmount}
                    InputProps={{ readOnly: true }}
                  />
                  <Autocomplete
                    sx={{ width: "300px" }}
                    options={pay_mode}
                    getOptionLabel={(option) => option?.value}
                    onChange={(event, newvalue) => setField(newvalue || {})}
                    renderInput={(params) => (
                      <TextField {...params} label="Payment Mode" required />
                    )}
                  />
                  {(field.value === "UPI" || field.value === "CARD") && (
                    <TextField
                      label="Transaction Number"
                      onChange={(e) =>
                        setData({ ...data, trans_no: e.target.value })
                      }
                    />
                  )}
                  <TextField
                    label="Date"
                    focused
                    value={moment(new Date()).format("DD/MM/YYYY")}
                    style={{ width: "200px" }}
                  />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    background:
                      "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
                    color: "whitesmoke",
                    fontWeight: 600,
                  }}
                >
                  Create Sale Bill
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Print-only section */}
      {showPrint && billData && (
        <div className="print-only">
          <GenerateBill bill={billData} />
        </div>
      )}
    </>
  );
};

export default SaleBill;
