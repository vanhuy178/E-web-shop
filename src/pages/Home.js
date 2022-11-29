import React from 'react'
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet';
import HeroSlider from '../components/HeroSlider';
import heroSliderData from '../assets/fake-data/hero-slider';
import { Section, SectionTitle, SectionBody } from '../components/Section';
import PolicyCart from '../components/PolicyCart';
import policy from '../assets/fake-data/policy';
import Grid from '../components/Grid';
import productData from '../assets/fake-data/products';
import ProductCard from '../components/ProductCard';
import banner from '../assets/images/banner.png'
const Home = () => {
  return (
    // Import data from ../assets/fake-data/hero-slider
    <Helmet title='Trang chủ'>
      <HeroSlider data={heroSliderData}
        control={true}
        auto={true}
        timeOut={5000} />

      {/* end heroSlider */}

      {/* policy heroSlider */}

      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {
              policy.map((policyItem, index) => <Link to='/policy'>
                <PolicyCart
                  key={index}
                  name={policyItem.name}
                  description={policyItem.description}
                  icon={policyItem.icon}
                />
              </Link>)
            }
          </Grid>
        </SectionBody>
      </Section>

      {/* end policy heroSlider */}

      {/* best selling section */}
      <Section>
        <SectionTitle>
          Top sản phẩm bán chạy trong tuần
        </SectionTitle>

        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {
              productData.getProducts(4).map((productDataItem, index) => {
                return (
                  <ProductCard
                    key={index}
                    img01={productDataItem.image01}
                    img02={productDataItem.image02}
                    title={productDataItem.title}
                    price={productDataItem.price}
                    slug={productDataItem.slug}
                  >

                  </ProductCard>
                )
              })
            }
          </Grid>
        </SectionBody>
      </Section>
      {/*end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>
          Sản phẩm mới
        </SectionTitle>

        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {
              productData.getProducts(8).map((productDataItem, index) => {
                return (
                  <ProductCard
                    key={index}
                    img01={productDataItem.image01}
                    img02={productDataItem.image02}
                    title={productDataItem.title}
                    price={productDataItem.price}
                    slug={productDataItem.slug}
                  >
                  </ProductCard>
                )
              })
            }
          </Grid>
        </SectionBody>
      </Section>

      {/* end arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to='/catalog'>
            <img src={banner} alt='' />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* new popular product section */}
      <Section>
        <SectionTitle>
          Sản phẩm phổ biến
        </SectionTitle>

        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {
              productData.getProducts(18).map((productDataItem, index) => {
                return (
                  <ProductCard
                    key={index}
                    img01={productDataItem.image01}
                    img02={productDataItem.image02}
                    title={productDataItem.title}
                    price={productDataItem.price}
                    slug={productDataItem.slug}
                  >
                  </ProductCard>
                )
              })
            }
          </Grid>
        </SectionBody>
      </Section>

      {/* end popular product section */}
    </Helmet>
  )
}
export default Home;
