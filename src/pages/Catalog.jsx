import React, { useCallback, useEffect, useRef, useState } from 'react'
import category from '../assets/fake-data/category';
import productData from '../assets/fake-data/products';
import Helmet from '../components/Helmet';
import CheckBox from '../components/CheckBox';
import colors from '../assets/fake-data/product-color';
import size from '../assets/fake-data/product-size';
import Button from '../components/Button';
import InfinityList from '../components/InfinityList';

const Catalog = () => {

  const titleOfHeaders = {
    catalog: 'danh mục sản phẫm',
    color: 'màu sắc',
    size: 'kích thước'
  }

  const types = {
    CATEGORY: 'CATEGORY',
    COLOR: 'COLOR',
    SIZE: 'SIZE'
  }

  const iniFilter = {
    category: [],
    color: [],
    size: [],
  };

  const productList = productData.getAllProducts();
  //console.log(productList);
  const [product, setProduct] = useState(productList);

  const [filter, setFilter] = useState(iniFilter);

  const clearFilter = () => setFilter(iniFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case types.CATEGORY:
          setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
          break
        case types.COLOR:
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break
        case types.SIZE:
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break
        default:

      }
    }
    else {
      switch (type) {
        case types.CATEGORY:
          const newCategory = filter.category.filter(e => e !== item.categorySlug);
          setFilter({ ...filter, category: newCategory });
          break
        case types.COLOR:
          const newColor = filter.color.filter(e => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break
        case types.SIZE:
          const newSize = filter.size.filter(e => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break
        default:

      }
    }
  }

  const updateProduct = useCallback(
    () => {
      let temp = productList;
      if (filter.category.length > 0) {
        temp = temp.filter(e => filter.category.includes(e.categorySlug))
      }

      if (filter.color.length > 0) {
        temp = temp.filter(e => {
          const check = e.colors.find(color => filter.color.includes(color));
          return check !== undefined;
        })
      }
      if (filter.size.length > 0) {
        temp = temp.filter(e => {
          const check = e.size.find(size => filter.size.includes(size));
          return check !== undefined;
        })
      }

      setProduct(temp)
    }, [filter, productList]
  )


  useEffect(() => {
    updateProduct()
  }, [updateProduct]);
  //console.log(filter);

  const filterRef = useRef(null);

  const showHideFilter = () => {
    return (
      filterRef.current.classList.toggle('active')
    )
  }
  return (
    <Helmet title='Sản phẩm'>
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close" onClick={() => showHideFilter()}>
            <i className='bx bx-left-arrow-alt'></i>
          </div>
          {/* DANH MỤC SẢN PHẨM  */}
          <div className="catalog__filter__widget">

            <div className="catalog__filter__widget__title">
              {titleOfHeaders.catalog}
            </div>

            <div className="catalog__filter__widget__content">
              {category.map((categoryItem, index) => {
                return (
                  <div
                    className='catalog__filter__widget__content__item'
                  ><CheckBox
                      label={categoryItem.display}
                      onChange={(input) => filterSelect(types.CATEGORY, input.checked, categoryItem)}
                      checked={filter.category.includes(categoryItem.categorySlug)} />
                  </div>
                )
              })}
            </div>

          </div>

          {/* MÀU SẮC  */}
          <div className="catalog__filter__widget">

            <div className="catalog__filter__widget__title">
              {titleOfHeaders.color}
            </div>

            <div className="catalog__filter__widget__content">
              {colors.map((colorItem, index) => {
                return (
                  <div
                    className='catalog__filter__widget__content__item'
                  ><CheckBox
                      label={colorItem.display}
                      onChange={(input) => filterSelect(types.COLOR, input.checked, colorItem)}
                      checked={filter.color.includes(colorItem.color)} />
                  </div>
                )
              })}
            </div>

          </div>

          {/* KÍCH THƯỚC */}
          <div className="catalog__filter__widget">

            <div className="catalog__filter__widget__title">
              {titleOfHeaders.size}
            </div>

            <div className="catalog__filter__widget__content">
              {size.map((sizeItem, index) => {
                return (
                  <div
                    className='catalog__filter__widget__content__item'
                  ><CheckBox
                      label={sizeItem.display}
                      onChange={(input) => filterSelect(types.SIZE, input.checked, sizeItem)}
                      checked={filter.size.includes(sizeItem.size)} />
                  </div>
                )
              })}
            </div>

          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size='sm' onClick={clearFilter}>xóa bộ lọc</Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size='sm' onClick={() => showHideFilter()}>bộ lọc</Button>
        </div>
        <div className="catalog__content">
          <InfinityList data={product} />

        </div>
      </div>

    </Helmet>
  )
}
export default Catalog;
