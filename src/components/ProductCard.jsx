import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

import { useDispatch } from 'react-redux';

import { set } from '../redux/product-modal/productModalSlice'

const ProductCard = props => {
    const dispath = useDispatch();

    return (
        <div className='product-card'>
            <Link to={`/catalog/${props.slug}`}>
                <div className='product-card__image'>
                    <img src={props.img01} alt='' />
                    <img src={props.img02} alt='' />
                </div>

                <h3 className="product-card__title">
                    {props.title}
                </h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}

                    <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span>
                </div>

                <div className="product-card__btn">
                    <Button
                        size="sm"
                        icon='bx bx-card'
                        animate={true}
                        onClick={() => dispath(set(props.slug))}
                    >
                        Chọn mua
                    </Button>
                </div>
            </Link>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard