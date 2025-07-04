import React, { useState } from "react";
import Header from "../pages/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import NewFooter from "../pages/NewFooter";
import axios from "axios";

const ContactUs = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mob_no: "",
    message: "",
  });
  const onSubmit = async () => {
    try {
      if (!data) {
        alert("Enter Details...");
      } else {
        const res = await axios.post("/feedback/addFeedback", data);
        alert(res.data.msg);
        setData({ name: "", email: "", mob_no: "", message: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Box className="main-content" sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Stack sx={{ width: "100%", marginTop: "2%", pr: { sm: 5, xs: 0 } }}>
            <img src="/teddy-bear-toys.jpg" style={{ height: "100%" }} />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{ width: "100%", marginTop: "2%", pr: { sm: 8, xs: 0 } ,ml:{xs:15} }}
          >
            <Card sx={{ width: { sm: 420, xs: 320 }, borderRadius: 5, boxShadow: 6 ,ml:{xs:5}}}>
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <TextField
                    variant="outlined"
                    label="Name"
                    name="name"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    name="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    label="Mobile Number"
                    name="mob_no"
                    onChange={(e) =>
                      setData({ ...data, mob_no: e.target.value })
                    }
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    label="Your Message"
                    name="message"
                    onChange={(e) =>
                      setData({ ...data, message: e.target.value })
                    }
                    multiline
                    minRows={4}
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(90deg, #471396 0%, #fac2d1 50%, #471396 100%)",
                      color: "white",
                      fontWeight: 600,
                      letterSpacing: 1,
                      boxShadow: 2,
                    }}
                    onClick={onSubmit}
                    fullWidth
                  >
                    Send
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      </Box>
      <NewFooter />
    </>
  );
};

export default ContactUs;
