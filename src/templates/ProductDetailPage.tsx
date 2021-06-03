import React, { useEffect, useState } from 'react';
import { ProductDetail } from 'components/Product/index';
import { useProductStock } from 'fooks/getProductStock';
import { db } from 'firebase/index';

const PostDetail = () => {
  const productId = window.location.pathname.split('/product/')[1];
  const [id, setId] = useState<string>(productId);
  const [name, setName] = useState<string>('');
  useEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        if (data) {
          setName(data.name);
        }
      });
  }, []);

  const { boxProduct } = useProductStock(name);

  // postIdが切り替わるたび、再レンダリングをして新しいデータを取得する。
  useEffect(() => {
    setId(id);
  }, [productId]);

  return (
    <div>
      <ProductDetail id={id} content={boxProduct} />
    </div>
  );
};

export default PostDetail;
