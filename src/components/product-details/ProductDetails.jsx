import { Box, Button, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SkeletonProductDetails from './SkeletonProductDetails';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { product_id } = useParams();
  const [ProductDetails, setProductDetails] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${product_id}`)
      .then((data) => {
        setProduct(data?.data);
        setIsLoadingData(false);
      });
  }, [product_id]);

  useEffect(() => {
    const renderProduct = cartItems?.find((item) => item?.id == product_id);
    setProductDetails(renderProduct);
  }, [cartItems, product_id]);

  return (
    <>
      {isLoadingData ? (
        <SkeletonProductDetails />
      ) : (
        <Box className='row mt-3'>
          <Box className='col-md-5 text-center'>
            <img className='img-fluid' width={'400px'} src={product?.image} alt="" />
          </Box>
          <Box className='col-md-7 '>
            <Typography variant='body1'>{product?.category}</Typography>
            <Typography variant='h4'>{product?.title}</Typography>
            <Typography variant='body2'>{product?.description}</Typography>
            <Rating name="read-only" value={product?.rating?.rate || 0} readOnly />
            <Box className='d-flex justify-content-between align-items-center'>
              <Box className="d-flex">
                <Typography>${product?.price}</Typography>
                <Typography className='mx-3'>Qty: {ProductDetails?.quantity}</Typography>
              </Box>
              <Box>
                <Button className="my-3" variant="contained"><AddIcon /> Add </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
