import React from 'react'
import useFetch from '../hooks/useFetch';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Feedback = () => {
     const feedback = useFetch("/feedback/getFeedback");

     const feedback_columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "mob_no", headerName: "Mobile Number", width: 150 },
  { field: "message", headerName: "Message", width: 350 },
  { field: "email", headerName: "Email", width: 200 },
];

  return (
   <>
     <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "70vw", height: "100%" }}
      >
        <Grid item xs={12} md={10} lg={8}>
          <Card
            sx={{ borderRadius: 4, boxShadow: 10, background: "white", mt: 5 }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={600}
                color="#c26afc"
                gutterBottom
              >
                Feedback
              </Typography>
              <div style={{ height: "500px", width: "100%" }}>
                {!feedback.data ? (
                  <Typography variant="body1" color="text.secondary">
                    L O A D I N G
                  </Typography>
                ) : (
                  <DataGrid
                    rows={feedback.data}
                    columns={feedback_columns}
                    getRowId={(row) => row._id}
                    
                    sx={{
                      borderRadius: 2,
                      boxShadow: 2,
                      background: "#f9f9fb",
                    }}
                    
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
   </>
  )
}

export default Feedback