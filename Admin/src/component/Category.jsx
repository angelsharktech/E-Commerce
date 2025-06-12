import { Box, Button, Card, Divider, Grid, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import useFetch from '../hooks/useFetch'
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { userInformation } from '../context/AuthContext';
import { Close } from '@mui/icons-material'
import { set } from 'react-hook-form';

const Category = () => {
  const { user } = useContext(userInformation)
  const [category, setCategory] = useState({ categoryName: '' })
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState(null);
  const data = useFetch('/category/getCategory')

  const handleChange = (e) => {
    try {
      console.log(e.target.value);

      setCategory({ categoryName: e.target.value })
    } catch (error) {
      console.log(error);

    }
  }
  const addCategory = async () => {
    try {
      category.categoryBy = user.shop_name
      console.log('category::', category);
      const result = await axios.post('/category/addCategory', category)
      if (result.data.msg === 'Category Added') {
        alert(result.data.msg)
        data.refetch('/category/getCategory')
        setCategory({ categoryName: '' })
      }
      else {
        alert(result.data.msg)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const updateCategory = async (newRow, oldRow) => {
    try {
      const result = axios.put(`/category/updateCategory/${newRow._id}`, newRow)

      if (result) {
        data.refetch('/category/getCategory')
        alert('Category Updated Successfully')
      }
    } catch (error) {
      console.log(error);

    }
  }

  const deleteCategory = async (row) => {
    try {
      setOpen(true)
      setCat(row)

    } catch (error) {
      console.log(error);

    }
  }
  const handleCategory = () => {
    setOpen(false)
    setData(null)
  }
  const confirmDeleteCategory = async () => {
    try {
      setOpen(false)
      const result = await axios.delete(`/category/deleteCategory/${cat._id}`, cat)
      if (result.data.msg === 'Category Deleted successfully...') {
        alert(result.data.msg)
        data.refetch('/category/getCategory')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const cat_columns = [
    { field: 'categoryName', headerName: 'Category', width: 200, editable: true },
    { field: 'action', headerName: 'Delete', renderCell: (params) => <><Button sx={{ color: ' #c26afc' }} onClick={() => deleteCategory(params?.row)}><DeleteIcon /></Button></>, width: 120 },
  ]
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={8} lg={6}>
          <Card sx={{ borderRadius: 4, boxShadow: 6, background: 'white', p: 3 }}>
            <Typography variant="h5" fontWeight={700} color="#c26afc" gutterBottom>
              Category Manager
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>
              <TextField
                variant='outlined'
                label='Category'
                value={category.categoryName}
                name={'categoryName'}
                onChange={handleChange}
                size='small'
                fullWidth
              />
              {/* <label style={{ fontWeight: 500 }}>Select Images</label>
            <input type='file' multiple name='images'
            onChange={(e) => setData({ ...data, images: Array.from(e.target.files) })}
              style={{ marginRight: 16 }} /> */}
              <Button
                variant='contained'
                sx={{
                  background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)',
                  color: 'whitesmoke',
                  fontWeight: 600,
                  px: 4,
                  boxShadow: 2,
                  height: 40
                }}
                onClick={addCategory}
              >
                Add
              </Button>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" fontWeight={600} color="#c26afc" gutterBottom>
              Category List
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              {!data ? (
                <Typography variant="body1" color="text.secondary">L O A D I N G</Typography>
              ) : (
                <DataGrid
                  rows={data.data}
                  columns={cat_columns}
                  getRowId={row => row._id}
                  processRowUpdate={updateCategory}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 1,
                    background: '#f9f9fb',
                  }}
                />
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Modal open={open} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div >
          <Box sx={{ color: 'black', mt: '60%', p: '20px', border: '3px solid white', borderRadius: '20px', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}  >
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => setOpen(false)}> <Close /> </Button>
            </div>
            <h3 >Do you want to confirm delete this category?</h3>
            <Button variant='contained' sx={{ background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)', color: 'whitesmoke', float: 'right' }} type='submit' onClick={() => confirmDeleteCategory()}>Yes</Button>
            <Button variant='contained' sx={{ background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)', color: 'whitesmoke', float: 'right', marginRight: '10px' }} onClick={() => handleCategory()}>No</Button>
          </Box>
        </div>
      </Modal>
    </>
  )

}

export default Category