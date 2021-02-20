import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Product(): JSX.Element {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const handleAddTocart = useCallback(() => {
    setIsAddToCartModalVisible(true);
  }, []);

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button type="button" onClick={handleAddTocart}>
        Add to cart
      </button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}
