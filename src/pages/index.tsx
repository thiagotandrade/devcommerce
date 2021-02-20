import { GetServerSideProps } from 'next';
import { useCallback } from 'react';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps): JSX.Element {
  const handleSum = useCallback(async () => {
    const math = (await import('../lib/math')).default;
    console.log(process.env.NEXT_PUBLIC_API_URL);
    alert(math.sum(3, 5));
  }, []);

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce"
        shouldExcludeTitleSuffix
        image="boost.png"
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            );
          })}
        </ul>
      </section>

      <button type="button" onClick={handleSum}>
        Sum!
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`,
  );
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
