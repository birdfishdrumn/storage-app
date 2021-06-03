import firebase from 'firebase/app';

type Extension = {
  product?: Products;
  placeId?: string;
};

export type Products = Extension & {
  name: string;
  category: string;
  description: string;
  stock?: number;
  id: string;
  placeList: string[];
  images: { [key: string]: string }[];
  updated_at?: firebase.firestore.Timestamp;
  created_at?: firebase.firestore.Timestamp;
};
