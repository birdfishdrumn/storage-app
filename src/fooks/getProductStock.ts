import { BoxProduct } from 'types/box';
import React, { useState, useEffect } from 'react';
import { db } from 'firebase/index';

export const useProductStock = (name: string | any) => {
  const [stock, setStock] = useState<number[]>([]);
  const [boxProduct, setBoxProduct] = useState<BoxProduct[]>([]);
  const result =
    stock.length &&
    stock.reduce(function (a, b) {
      return a + b;
    });

  useEffect(() => {
    db.collectionGroup('boxProduct')
      .where('product', '==', name)
      .get()
      .then((snapshot) => {
        const list: any = [];
        const dataList: any = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const stock = data.quantity;
          list.push(stock);
          dataList.push(data);
          console.log(data);
        });
        setStock(list);
        setBoxProduct(dataList);
      });
  }, [name]);

  return { stock, boxProduct, result };
};
