/* eslint-disable no-lone-blocks */
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Button from './Button';
const HeroSlider = props => {
  const data = props.data;
  const timeOut = props.timeOut ? props.timeOut : 3000;
  const [activeSlider, setActiveSlider] = useState(0);


  useEffect(() => {
    //console.log('use effect running...');
    if (props.auto) {
      const slide = setInterval(() => {
        nextSide();
      }, timeOut)
      return () => clearInterval(slide)
    }
  }, [activeSlider, timeOut, props.auto])
  const nextSide = useCallback(
    () => {
      //console.log('next side use call back running...');
      {/*
      khi người dùng click lên nút right   ở
      
       <div className='hero-slider__control__item'
           onClick={nextSide}
        >
        <i class='bx bx-chevron-right' ></i>
      </div>

      thì nó sẽ tạo ra biến index với dk khi state activeSlider + 1 = data.length thì nó set index = 0 
      ngược lại thì nó lấy activeSlider + 1;

    */}


      const index = activeSlider + 1 === data.length ? 0 : activeSlider + 1;
      setActiveSlider(index);
    },
    [data.length, activeSlider]
  )
  const prevSide = () => {

    {/*
      Thực sự điều kiện của biến index này quá ghê khâm phục trí thông minh của
      con người
  */}
    const index = activeSlider - 1 < 0 ? data.length - 1 : activeSlider - 1;
    setActiveSlider(index)
  }
  //console.log(data);
  return (
    <div className='hero-slider'>
      {
        data.map((dataItem, index) => {
          return (
            <div className={`hero-slider__item ${index === activeSlider ? 'active' : ''}`} key={index}>

              <div className='hero-slider__item__info'>

                {/*
                
                    trên đây tượng tự nhưng nó dùng class color-dataItem.color

                    với màu là "blue": #4267b2,

                    thì khi vòng lập tạo ra các class 

                    và khi element dùng class color-blue

                  thì nó sẽ access vào attribute color: #4267b2;
                    
                */}
                <div className={`hero-slider__item__info__title color-${dataItem.color}`}>
                  <span>{dataItem.title}</span>
                </div>

                <div className='hero-slider__item__info__desc'>
                  <span>{dataItem.description}</span>
                </div>

                <div className='hero-slider__item__info__btn'>
                  {/*path='/catalog/:slug' component={Product} nằm ở folder routes/index.js*/}
                  <Link to={dataItem.path}>
                    <Button
                      backgroundColor={dataItem.color}
                      icon='bx bx-cart'
                      animate={true}
                    >Xem chi tiết</Button>
                  </Link>
                </div>

              </div>

              <div className='hero-slider__item__image'>

                {/*

                @each $color,
                  $val in $colors {

                  .color-#{$color} {
                    color: $val
                  }

                .bg-#{$color} {
                  background-color: $val;
                  }
                }
                  mảng colors chứa đối tượng "blue": #4267b2 trong _variable và tạo vòng lập vs $color
                  và val sau đó tạo bg-#{val} qua hết các phần tử trong mảng để tạo class
                  
                  .bg-#{$color} {
                    background-color: $val;
                  }

                  ở đây data.Item.color = blue;

                  Ex: bg-blue {
                    background-color: #4267b2;
                  }

                  khi dùng class này trong các element thì nó sẽ dc render ra
                */}
                <div className={`shape bg-${dataItem.color}`}></div>
                <img src={dataItem.img} alt='' />
              </div>

            </div>
          )
        })
      }
      {
        props.control ? (
          <div className='hero-slider__control'>
            <div className='hero-slider__control__item' onClick={prevSide}>
              <i class='bx bx-chevron-left'></i>
            </div>
            <div className='hero-slider__control__item'>
              <div className='index'>
                {activeSlider + 1}/{data.length}
              </div>
            </div>

            <div className='hero-slider__control__item'
              onClick={nextSide}
            >
              <i class='bx bx-chevron-right' ></i>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}
// check data must be an array
HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number
}

export default HeroSlider
