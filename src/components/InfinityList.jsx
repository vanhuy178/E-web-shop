import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid';
import ProductCard from './ProductCard';

const InfinityList = props => {
  const perLoad = 6;

  const listRef = useRef(null);
  const [data, setData] = useState([])
  // console.log(listRef);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);
  


  useEffect(() => {
    setData((props.data.slice(0, perLoad)))
  }, [props.data]);

  useEffect(() => {

    window.addEventListener('scroll', () => {
      if (listRef && listRef.current) {
        
        if(window.scrollY + window.innerHeight >= 
          listRef.current.clientHeight + listRef.current.offsetTop + 200) {
            //console.log('botton reach');
            setLoad(true)
          }
      }
    })
  }, [listRef])

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length/perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start *perLoad;

        setData(data.concat(props.data.slice(start, end)))
        setIndex(index + 1);
      }
    }

    getItems()
    setLoad(false)
  }, [props.data, index, load, data ])
  return (
    <div
    ref={listRef}>
      <Grid col={3}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {data.map((dataItem, index) => {
              return (
                <ProductCard
                  key={index}
                  img01={dataItem.image01}
                  img02={dataItem.image02}
                  title={dataItem.title}
                  price={Number(dataItem.price)}
                  slug={dataItem.slug}
                />
              )
            })}
          </Grid>
    </div>
  )
}

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default InfinityList;