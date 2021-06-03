import firebase from 'firebase/app';

export type Chat = {
  title: string;
  subtitle: string;
  avatar: string;
  date: firebase.firestore.Timestamp;
  type: string,
  id:string

}
