import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Header } from './Header'
import { Footer } from './Footer'
import { InvidualRoutes } from '../routes/index'

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
        </div>
      )} />

    </BrowserRouter>
  )
}
export default Layout;