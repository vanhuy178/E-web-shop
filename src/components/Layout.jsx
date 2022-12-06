import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Header } from './Header'
import { Footer } from './Footer'
import { InvidualRoutes } from '../routes/index'
import ProductViewModal from './ProductViewModal'

const Layout = () => {
  return (
    <BrowserRouter>

      <Route render={props => (
        <div>
          <Header {...props} />

          <div className="container">
            <div className="main">
              <InvidualRoutes />
            </div>
          </div>

          <Footer />

          <ProductViewModal />
        </div>
      )} />

    </BrowserRouter>
  )
}
export default Layout;