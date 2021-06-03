import firebase from 'firebase/app';

type Extension = {
  boxes?: Boxes;
  setBoxArray?: any;
  boxArray?: string[]
  move?: boolean;
  deleteBox?:boolean;
};

export type Boxes = Extension & {
  name: string;
  state: string;
  description: string;
  placeId: string;
  stock?: number;
  id: string;
  // place: string;
  images: { [key: string]: string }[];
  updated_at?: firebase.firestore.Timestamp;
  created_at?: firebase.firestore.Timestamp;
  boxType: string;
};

export interface BoxProduct {
  product: string;
  quantity: number;
  id: string;
  boxName: string;
  placeId: string;
  boxId: string;
}
