import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/Logo-2.png'

const mainNav = [
  {
    display: 'Trang chủ',
    path: '/'
  },
  {
    display: 'Sản phẩm',
    path: '/catalog'
  },
  {
    display: "Phụ kiện",
    path: '/accessories'
  },
  {
    display: 'Liên hệ',
    path: '/contact'
  }
]
export const Header = () => {

  const { pathname } = useLocation()
  const activeNav = mainNav.findIndex(element =>
    element.path === pathname)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('shrink')
      }
      else {
        headerRef.current.classList.remove('shrink')
      }

      return () => {
        window.removeEventListener('scroll')
      }
    }, [])
  })

  const menuRef = useRef(null)
  const headerRef = useRef(null)

  const menuLeftToggle = () => menuRef.current.classList.toggle('active')
  //console.log('Path name is: ', pathname, 'header ref is: ', headerRef, 'active navbar is: ', activeNav);
  //console.log("Menu ref is: ", menuRef);
  return (
    <div className='header' ref={headerRef}>
      <div className='container'>
        {/*Set Logo */}
        <div className='header__logo'>
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className='header__menu'>

          <div className='header__menu__mobile-toggle' onClick={menuLeftToggle}>
            <i className='bx bx-menu'></i>
          </div>

          <div className='header__menu__left' ref={menuRef}>

            <div className='header__menu__left__close' onClick={menuLeftToggle}>
              <i className='bx bx-chevron-left'></i>
            </div>
            {
              mainNav.map((navItem, index) => {
                return (
                  <div key={index}
                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`
                    }
                    onClick={menuLeftToggle}>
                    <Link to={navItem.path}>
                      <span>{navItem.display}</span>
                    </Link>
                  </div>
                )
              })
            }
          </div>
          <div className='header__menu__right'>
            <div className='header__menu__item header__menu__right__item'>
              <i className='bx bx-search'></i>
            </div>
            <div className='header__menu__item header__menu__right__item'>
              <Link to='/cart'>
                <i className='bx bx-cart'></i>
              </Link>
            </div>
            <div className='header__menu__item header__menu__right__item'>
              <i className='bx bx-user'></i>
            </div>
          </div>
        </div>

      </div>

    </div >
  )
}
