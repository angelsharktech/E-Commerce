import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Grid, Modal, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { Close } from '@mui/icons-material'
import useFetch from '../hooks/useFetch'

const ProductList = () => {
    const product = useFetch('/product/getProduct')
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    const updateProduct = async (newRow, oldRow) => {
        try {

            const actual = parseFloat(newRow.actual_price);
            const selling = parseFloat(newRow.selling_price);
            const discount = actual && selling ? Math.round(((actual - selling) / actual) * 100) : 0;
            newRow.discount = discount
            const result = await axios.put(`/product/updateProduct/${newRow._id}`, newRow)

            if (result) {
                alert('Product Updated Successfully')
                product.refetch('/product/getProduct')
            }
        } catch (error) {
            console.log(error);

        }
    }
    const deleteProduct = async (row) => {
        try {
            setOpen(true)
            setData(row)
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = () => {
        setOpen(false)
        setData(null)
    }

    const confirmDeleteProduct = async () => {
        try {
            setOpen(false)
            const result = await axios.delete(`/product/deleteProduct/${data._id}`, data)
            if (result.data.msg === 'Product Deleted successfully...') {             
                alert(result.data.msg)
                product.refetch('/product/getProduct')
            }
        } catch (error) {
            console.log(error);
        }
    }
    const prod_columns = [
        { field: 'thumbnail', headerName: 'Image', renderCell: params => <><img src={axios.defaults.baseURL + params?.row?.thumbnail} height={'50px'} width={'75px'} style={{ borderRadius: 8 }} /></>, width: 150 },
        { field: 'title', headerName: 'Title', width: 120, editable: true },
        { field: 'category', headerName: 'Category', width: 120, editable: true },
        { field: 'description', headerName: 'Description', width: 190, editable: true },
        { field: 'actual_price', headerName: 'MRP', width: 120, editable: true },
        { field: 'selling_price', headerName: 'Price', width: 120, editable: true },
        { field: 'action', headerName: 'Delete', renderCell: (params) => <><Button sx={{ color: ' #c26afc' }} onClick={() => deleteProduct(params?.row)}><DeleteIcon /></Button></>, width: 120 },
    ]
    return (
        <>
            <Grid container
                justifyContent="center"
                alignItems="center"
                sx={{ width: '70vw', height: '100%' }}
            >
                <Grid item xs={12} md={10} lg={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: 10, background: 'white', mt: 5 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight={600} color="#c26afc" gutterBottom>
                                Product List
                            </Typography>
                            <div style={{ height: '500px', width: '100%' }}>
                                {!product ? (
                                    <Typography variant="body1" color="text.secondary">L O A D I N G</Typography>
                                ) : (
                                    <DataGrid
                                        rows={product.data}
                                        columns={prod_columns}
                                        getRowId={row => row._id}
                                        processRowUpdate={updateProduct}
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: 2,
                                            background: '#f9f9fb',
                                        }}
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Modal open={open} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <div >
                    <Box sx={{ color: 'black', mt: '60%', p: '20px', border: '3px solid white', borderRadius: '20px', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}  >
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={() => setOpen(false)}> <Close /> </Button>
                        </div>
                        <h3 >Do you want to confirm delete this product?</h3>
                        <Button variant='contained' sx={{ background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)', color: 'whitesmoke', float: 'right' }} type='submit' onClick={() => confirmDeleteProduct()}>Yes</Button>
                        <Button variant='contained' sx={{ background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)', color: 'whitesmoke', float: 'right', marginRight: '10px' }} onClick={() => handleChange()}>No</Button>
                    </Box>
                </div>
            </Modal>
        </>
    )
}

export default ProductList
