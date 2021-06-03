import { Place } from 'types/place';
import React, { useState, useEffect } from 'react';
import { db } from 'firebase/index';

export const usePlaceList= () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const unSub = db.collection('place').onSnapshot((snapshot: any) => {
      setPlaces(
        snapshot.docs.map((doc: any) => ({
          id: doc.data().id,
          name: doc.data().name,
        }))
      );
      return () => {
        unSub();
      };
    });
  }, []);

  return { places };
};
