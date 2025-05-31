import { Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import useFetch from '../hooks/useFetch'
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { userInformation } from '../context/AuthContext';

const Category = () => {
  const {user} = useContext(userInformation)
  const [category, setCategory] = useState({ categoryName: '' })
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
      console.log('category::',category);
      const result = await axios.post('/category/addCategory', category)
      if (result.data.msg === 'Category Added') {
        alert(result.data.msg)
        data.refetch('/category/getCategory')
        setCategory({categoryName: ''})
      }
      else {
        alert(result.data.msg)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const updateCategory = async(newRow , oldRow) =>{
    try {
       const result = axios.put(`/category/updateCategory/${newRow._id}`,newRow)
       
       if(result){
        data.refetch('/category/getCategory')
        alert('Category Updated Successfully')
       }
    } catch (error) {
      console.log(error);
      
    }
  }

  const deleteCategory = async(row) =>{
    try {
      const result = await axios.delete(`/category/deleteCategory/${row._id}`,row)
      if(result.data.msg === 'Category Deleted successfully...'){
        alert(result.data.msg)
        data.refetch('/category/getCategory')
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const cat_columns = [
    { field: 'categoryName', headerName: 'Category', width: 200 ,editable:true },
    { field: 'action', headerName: 'Delete',renderCell: (params) => <><Button  sx={{ color: ' #c26afc' }} onClick={() => deleteCategory(params?.row)}><DeleteIcon  /></Button></>, width: 120 },
    
  ]
  return (
    <>
    <div container>
      <h3> Category </h3>
      <TextField variant='outlined' label='Category' value={category.categoryName} name={'categoryName'} onChange={handleChange} size='small' />
      <Button variant='contained'
        sx={{ backgroundColor: '#c26afc', color: 'whitesmoke', marginLeft: '5px' }}
        onClick={() => addCategory()}
      >
        Add
      </Button>
    </div>
     <div style={{ marginTop: '55px' }} >
            {!data ? (<><h2>L O A D I N G</h2></>) :
              (<>
                <DataGrid
                  style={{ height: '400px' }}
                  rows={data.data}
                  columns={cat_columns}
                  getRowId={row => row._id}
                 processRowUpdate={updateCategory}
                />
              </>)}
          </div>
          </>
  )
}

export default Category