import React, { useEffect } from 'react';
import Helmet from '../components/Helmet';
import productData from '../assets/fake-data/products';
import { Section, SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import ProductView from '../components/ProductView';

const Product = props => {

  //console.log(props);
  const product = productData.getProductBySlug(props.match.params.slug);

  //console.log(product);
  const relatedProducts = productData.getProducts(8);
  const titleOfProduct = {
    discover: 'khám phá thêm',
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product])

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>
          {titleOfProduct.discover}
        </SectionTitle>

        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              relatedProducts.map((item, index) => {
                return (
                  <ProductCard
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    title={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                )
              })
            }
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>

  )
}
export default Product;
