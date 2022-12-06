import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas'
import { withRouter } from 'react-router-dom';
import { addItem } from '../redux/shopping-cart/cartItemSlice';
import { useDispatch } from 'react-redux';


const ProductView = props => {
  let product = props.product;
  if (product === undefined) product = {
    price: 0,
    title: '',
    colors: [],
    size: []
  }

  const [previewImg, setPreviewImg] = useState(product.image01);
  const [descriptionExpand, setDecriptionExpand] = useState(false);
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [quantity, setQuatity] = useState(1);
  const [showErr, setShowErr] = useState(false)

  const dispath = useDispatch();

  // console.log(dispath(addItem));
  const sign = {
    plus: 'plus',
    minus: 'minus'
  }

  const errTitle = {
    mess: 'Vui lòng nhập đầy đủ thông tin',
    submit: 'ok'
  }
  const updateQuatity = (type) => {
    if (type === sign.plus) {
      setQuatity(quantity + 1)
    }
    else {
      setQuatity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  }
  const cartTitle = {
    addStuff: 'thêm vào giỏ hàng',
    buyNow: 'mua ngay'
  }
  const titleOfProductView = {
    detailsProduct: 'chi tiết sản phẩm',
    titleOfButton: {
      detailButton: 'xem thêm',
      colectingButton: 'thu gọn'
    },
    itemTitleDetail: {
      color: 'màu sắc',
      size: 'kích thướt',
      amount: 'số lượng',
    }
  }

  useEffect(() => {
    setPreviewImg(product.image01)
    setQuatity(1)
    setColor(undefined)
    setSize(undefined)
    setShowErr(false)
  }, [product])

  const check = () => {
    if (color === undefined) {
      setShowErr(!showErr)
      return false;
    }

    if (size === undefined) {

      setShowErr(!showErr)
      return false;
    }
    setShowErr(false)
    return true
  }

  const addToCart = () => {
    //console.log(showErr);
    //if (check()) console.log({ color, size, quantity });

    if (check()) {

      console.log('check from addToCart >>>', { color, size, quantity })
      dispath(addItem({
        slug: product.slug,
        color: color,
        size: size,
        quantity: quantity,
        price: product.price
      }))
      // setShowErr(!showErr)
    }
  }

  const goToCart = () => {
    //if (check()) props.history.push('/cart');
    if (check()) {
      dispath(addItem({
        slug: product.slug,
        color: color,
        size: size,
        quantity: quantity,
        price: product.price
      }))
    }

  }

  return (
    <>

      <div className='product'>
        <div className="product__images">

          <div className="product__images__list">
            <div className="product__images__list__item" onClick={() =>
              setPreviewImg(product.image01)}>
              <img src={product.image01} alt='' />
            </div>
            <div className="product__images__list__item" onClick={() =>
              setPreviewImg(product.image02)}>
              <img src={product.image02} alt='' />
            </div>
          </div>

          <div className="product__images__main">
            <img src={previewImg} alt='' />
          </div>
          <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
            <div className="product-description__title">
              {titleOfProductView.detailsProduct}
            </div>

            <div className="product-description__content" dangerouslySetInnerHTML={{
              __html: product.description
            }}>
            </div>

            <div className='product-description__toggle'>
              <Button size='sm' onClick={() => setDecriptionExpand(!descriptionExpand)}>
                {descriptionExpand ? titleOfProductView.titleOfButton.colectingButton : titleOfProductView.titleOfButton.detailButton}
              </Button>
            </div>
          </div>
        </div>

        <div className="product__info">
          <h2 className="product__info__title">
            {product.title}
          </h2>

          <div className="product__info__item">
            <span className="product__info__item__price">
              {numberWithCommas(product.price)}
            </span>
          </div>

          <div className="product__info__item">
            <div className="product__info__item__title">
              {titleOfProductView.itemTitleDetail.color}
            </div>
            <div className="product__info__item__list">
              {
                product.colors.map((item, index) => {
                  return (
                    <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                      onClick={() => setColor(item)}>
                      <div className={`circle bg-${item}`}></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">
              {titleOfProductView.itemTitleDetail.size}
            </div>
            <div className="product__info__item__list">
              {
                product.size.map((item, index) => {
                  return (
                    <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`}
                      onClick={() => setSize(item)}>
                      <span className="product__info__item__list__item__size">
                        {item}
                      </span>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="product__info__item">
            <div className="product__info__item__title">
              {titleOfProductView.itemTitleDetail.amount}
            </div>
            <div className="product__info__item__quanlity">
              <div className="product__info__item__quanlity__btn"
                onClick={() => updateQuatity(sign.minus)}>
                <i className='bx bx-minus'></i>
              </div>
              <div className="product__info__item__quanlity__input">
                {quantity}
              </div>
              <div className="product__info__item__quanlity__btn"
                onClick={() => updateQuatity(sign.plus)}>
                <i className='bx bx-plus'></i>
              </div>
            </div>
          </div>

          <div className="product__info__item">
            <Button size='sm'
              onClick={() => addToCart()}
            >{cartTitle.addStuff}</Button>
            <Button size='sm' onClick={() => goToCart()}>{cartTitle.buyNow}</Button>
          </div>

          <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
            <div className="product-description__title">
              {titleOfProductView.detailsProduct}
            </div>

            <div className="product-description__content" dangerouslySetInnerHTML={{
              __html: product.description
            }}>
            </div>

            <div className='product-description__toggle'>
              <Button size='sm' onClick={() => setDecriptionExpand(!descriptionExpand)}>
                {descriptionExpand ? titleOfProductView.titleOfButton.colectingButton : titleOfProductView.titleOfButton.detailButton}
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* DOI KHI TACH COMPONENT NHIEU QUA NEN LU  */}
      <div className={`err__message ${showErr ? 'err__message__active' : ''}`}>
        <div>
          <div className="err__message__title">{errTitle.mess}</div>
          <div className="err__message__submit" onClick={() => setShowErr(false)}>{errTitle.submit}</div>
        </div>
      </div>
    </>


  )
}

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
}

export default withRouter(ProductView);