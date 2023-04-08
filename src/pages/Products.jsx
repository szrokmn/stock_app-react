import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { btnStyle, flex } from "../styles/globalStyle";
import ProductModal from "../components/modals/ProductModal";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

const Products = () => {
 
  const { getStockData, deleteStockData } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [    
    {
      field: 'id',
      headerName: '#',
      flex:1,
      minWith:40,
      maxWith:70,
      align:"center",
      headerAlign:"center"     
    },
    {
      field: 'category',
      headerName: 'Category',
      flex:3,
      minWith:150,
      align:"center",
      headerAlign:"center"     
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex:2,
      minWith:150,
      align:"center",
      headerAlign:"center"     
    },
    {
      field: 'name',
      headerName: 'Name',
      flex:2,
      minWith:150,
      align:"center",
      headerAlign:"center",
      type:"number"     
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex:0.7,
      minWith:100,
      align:"center",
      headerAlign:"center",           
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth:50,
      flex:1,
      type:"number",
      align:"center",
      headerAlign:"center",
      renderCell: ({id}) => (
        <GridActionsCellItem 
          icon={<DeleteForeverIcon/>}
          label="Delete"
          sx={btnStyle}
          onClick={() => {
            deleteStockData("products", id)
          }}
        />
      )
    }       
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  useEffect(() => {    
    getStockData("products");
    getStockData("categories")
    getStockData("brands")
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>

      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}        
        disableRowSelectionOnClick
        slots={{ toolbar:GridToolbar }}
      />
    </Box>


    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">#</TableCell>
            <TableCell align="right">Categories</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((pro, index) => (
            <TableRow
              key={pro.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {index + 1}
              </TableCell>
              <TableCell align="right">{pro.category}</TableCell>
              <TableCell align="right">{pro.brand}</TableCell>
              <TableCell align="right">{pro.name}</TableCell>
              <TableCell align="right">{pro.stock}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}

      {/* <Grid container sx={flex}>
        {products?.map((product) => (
          <Grid item key={product.id}>
            <ProductCard product={product} setOpen={setOpen} setInfo={setInfo}/>
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
};

export default Products;
