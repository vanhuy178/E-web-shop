import React, { useEffect } from 'react';
import productData from '../assets/fake-data/products';
import ProductView from './ProductView';
import Button from './Button';
import { remove } from '../redux/product-modal/productModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
const ProductViewModal = props => {
  const productWithSlug = useSelector(state => state.productModal.value);
  const dispatch = useDispatch();


  const [product, setProduct] = useState(undefined);
  //console.log(product);
  //const produtSlug = productData.getProductBySlug("ao-thun-dinosaur-14")
  useEffect(() => {
    setProduct(productData.getProductBySlug(productWithSlug))

  }, [productWithSlug])

  return (
    <div className={`product-view-modal ${product === undefined ? '' : 'active'}`}>
      <div className="product-view-modal__content">
        <ProductView product={product} />
        <div className="product-view-modal__content__close">
          <Button
            size='sm'
            onClick={() => dispatch(remove())}>
            Đóng
          </Button>
        </div>
      </div>
    </div >
  )
}



export default ProductViewModal