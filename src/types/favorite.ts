import firebase from 'firebase/app';

type Extension = {
  box?: boolean;

};

export type Likes = Extension & {
  name: string;
  images: { [key: string]: string }[];
  id: string | any;
  favoriteId: string;
  uid: string | any;
  added_at?: firebase.firestore.Timestamp;
  likesProductsArray?: string[];
  product?: any;
  boxes?: any;
  likesId: string;
};

export type BoxLikes = Extension & {
  name: string;
  images: { [key: string]: string }[];
  id: string | any;
  favoriteId: string;
  uid: string | any;
  added_at?: firebase.firestore.Timestamp;
  likesProductsArray?: string[];
  product?: any;
  boxes?: any;
  likesId: string;
  placeId?: string;
  setBoxArray?: any;
  boxArray?: string[]
  move?: boolean;
         deleteBox?:boolean;
};
