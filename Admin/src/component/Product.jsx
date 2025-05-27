import React, { useState } from 'react'
import { Autocomplete, Button, Grid, Stack, TextField } from '@mui/material'
import './product.css'
import axios from 'axios'
import useFetch from '../hooks/useFetch'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';

const Product = () => {

  const product = useFetch('/product/getProduct')
  const category = useFetch('/category/getCategory')

  const [data, setData] = useState({
    title: '',
    description: '',
    actual_price: '',
    selling_price: '',
    avail_qty: '',
    category: '',
    thumbnail: '',
    images: [],
  })
 
  const onSubmit = async () => {
    try {

      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('category', data.category)
      formData.append('description', data.description)
      formData.append('actual_price', data.actual_price)
      formData.append('selling_price', data.selling_price)
      formData.append('avail_qty', data.avail_qty)
      formData.append('thumbnail', data.thumbnail)
      data.images?.forEach((images) => {
        formData.append('images', images)
      })
      const result = await axios.post('/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      })
      if (result.data.msg === 'Product Added') {
        alert(result.data.msg)
        product.refetch('/product/getproduct')
        setData({
          title: '',
          // category:'',
          description: '',
          actual_price: '',
          selling_price: '',
          avail_qty: '',
          // thumbnail: '',
          // images: [],
        })
      }
    } catch (error) {
      console.log(error);

    }
  }

  const updateProduct = async(newRow , oldRow) =>{
    try {
       const result = axios.put(`/product/updateProduct/${newRow._id}`,newRow)
       
       if(result){
         alert('Product Updated Successfully')
         product.refetch('/product/getProduct')
       }
    } catch (error) {
      console.log(error);
      
    }
  }

  const deleteProduct = async(row) =>{
    try {
      const result = await axios.delete(`/product/deleteProduct/${row._id}`,row)
      
      if(result.data.msg === 'Product Deleted successfully...'){
        alert(result.data.msg)
        product.refetch('/product/getProduct')
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const prod_columns = [
    { field: 'thumbnail', headerName: 'Image', renderCell: params => <><img src={axios.defaults.baseURL + params?.row?.thumbnail} height={'50px'} width={'75px'} /></>, width: 150 },
    { field: 'title', headerName: 'Title', width: 120 ,editable:true},
    { field: 'category', headerName: 'Category', width: 120,editable:true },
    { field: 'description', headerName: 'Description', width: 190,editable:true },
    { field: 'actual_price', headerName: 'MRP', width: 120 ,editable:true},
    { field: 'selling_price', headerName: 'Price', width: 120 ,editable:true},
    // { field: 'avail_qty', headerName: 'Quantity', width: 120,editable:true },
    { field: 'action', headerName: 'Delete',renderCell: (params) => <><Button  sx={{ color: ' #c26afc' }} onClick={() => deleteProduct(params?.row)}><DeleteIcon  /></Button></>, width: 120 },
    
  ]
  return (
    <>
      {/* <div container> */}
        <h3> Product Upload </h3>

        <div className='product' >
          <Stack direction={'row'} gap={'5px'}>
            <TextField variant='outlined' label='Title' name={'title'} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} size='small' />
            <TextField variant='outlined' label='Description' name={'description'}  value={data.description}  onChange={(e) => setData({ ...data, description: e.target.value })} size='small' multiline />
            <TextField variant='outlined' label='Actual Price' name={'actual_price'} type='Number' value={data.actual_price} onChange={(e) => setData({ ...data, actual_price: e.target.value })} size='small' />
            <TextField variant='outlined' label='Selling Price' name={'selling_price'}  type='Number' value={data.selling_price}  onChange={(e) => setData({ ...data, selling_price: e.target.value })} size='small' />
            {/* <TextField variant='outlined' label='Quantity Available' name={'avail_qty'}  type='Number' value={data.avail_qty}  onChange={(e) => setData({ ...data, avail_qty: e.target.value })} size='small' /> */}

          </Stack>
          <Stack direction={'row'} gap={'5px'}>
            <Autocomplete
            sx={{width:'160px'}}
            options={category.data} 
            getOptionLabel= {(option) => option?.categoryName}
            onChange={(e, newValue) => setData({ ...data, category: newValue.categoryName })}
            renderInput={(params) => <TextField {...params}  name='category' label="Category"  />}
            size='small'
            />
            <label>Select Thumbnail image</label>
            <input type='file' name='thumbnail'
              onChange={(e) => setData({ ...data, thumbnail: e.target.files[0] })}  />
            <label>Select Multiple Files</label>
            <input type='file' multiple name='images' onChange={(e) =>
              setData({ ...data, images: Array.from(e.target.files) })
            } />
            <Button variant='contained' onClick={() => onSubmit()} sx={{ backgroundColor: '#c26afc', color: 'whitesmoke' }} >Add</Button>
          </Stack>

        </div>
      {/* </div> */}

      <div style={{ marginTop: '55px' }} >
        {!product ? (<><h2>L O A D I N G</h2></>) :
          (<>
            <DataGrid
              style={{ height: '400px' }}
              rows={product.data}
              columns={prod_columns}
              getRowId={row => row._id}
             processRowUpdate={updateProduct}

            />
          </>)}
      </div>
    </>
  )
}

export default Product