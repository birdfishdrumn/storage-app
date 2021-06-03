import React, { useEffect, useState } from 'react';
import { BoxDetail } from 'components/Product/index';
import { useProductStock } from 'fooks/getProductStock';
import { db } from 'firebase/index';

const PostDetail = () => {
  const productId = window.location.pathname.split('/box/')[1];
  const [id, setId] = useState<string>(productId);

  const { boxProduct } = useProductStock(name);

  // postIdが切り替わるたび、再レンダリングをして新しいデータを取得する。
  useEffect(() => {
    setId(id);
  }, [productId]);

  return (
    <div>
      <BoxDetail id={id} />
    </div>
  );
};

export default PostDetail;
