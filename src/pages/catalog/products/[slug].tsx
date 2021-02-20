import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { useCallback, useState } from 'react';

import { client } from '@/lib/prismic';

interface ProductProps {
  product: Document;
}

const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Product({ product }: ProductProps): JSX.Element {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const handleAddToCart = useCallback(() => {
    setIsAddToCartModalVisible(true);
  }, []);

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      />

      <img src={product.data.thumbnail.url} width="300" alt="" />

      <p>Price: ${product.data.price}</p>

      <button type="button" onClick={handleAddToCart}>
        Add to cart
      </button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async context => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },

    revalidate: 5,
  };
};
