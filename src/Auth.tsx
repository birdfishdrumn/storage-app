import React, { useEffect } from 'react';
import { getIsSignedIn } from './reducks/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { listenAuthState } from './reducks/users/operations';

interface AppProps {
  children?: any;
  notUseEffect?: boolean;
}
const Auth: React.FC<AppProps> = ({ children, notUseEffect }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(getIsSignedIn);

  useEffect(() => {
    dispatch(listenAuthState());
  }, []);
  // もしサインインしてなければ空のjsxを返し、してるのなら子要素を返す

  if (!isSignedIn) {
    return <></>;
  } else {
    // サインインしてれば子要素を返す・
    return children;
  }
};

export default Auth;
