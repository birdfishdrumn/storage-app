import React, { useCallback, useState } from 'react';
import { TextInput, PrimaryButton } from 'components/UI';
import { signIn } from 'reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import styled, { css } from 'styled-components';
import Divider from '@material-ui/core/Divider';

import { dialogCloseAction, dialogOpenAction } from 'reducks/dialogSlice';

import { MinText, SectionContainer, Title } from 'style/GlobalStyle';

const BorderTitleMixin = css`
  content: '';
  height: 1px;
  flex-grow: 1;
  background-color: #eee;
`;

const BorderTitle = styled.div`
  display: flex;
  color: dimgray;
  align-items: center;
  &:before {
    ${BorderTitleMixin};
    margin-right: 1rem;
  }
  &:after {
    ${BorderTitleMixin};
    margin-left: 1rem;
  }
`;

const SignIn: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>(''),
    [password, setPassword] = useState<string>('');

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const passwordPush = () => {
    dispatch(push('/reset'));
  };

  return (
    <SectionContainer>
      <Title>ログイン</Title>
      <TextInput
        fullWidth={true}
        label={'Email'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        variant="outlined"
        onChange={inputEmail}
      />
      <div className="module-spacer--very-small" />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        variant="outlined"
        onChange={inputPassword}
        helperText={!password.match(/^[A-Za-z0-9]*$/) && '文字は英数字だけです'}
        error={password.match(/^[A-Za-z0-9]*$/) ? false : true}
      />

      <div className="center">
        <PrimaryButton
          label={'ログイン'}
          disabled={email === '' || password === '' || !password.match(/^[A-Za-z0-9]*$/)}
          onClick={() => dispatch(signIn(email, password))}
        />

        <div className="module-spacer--medium" />

        <p className="pointer" onClick={() => passwordPush()}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </SectionContainer>
  );
};

export default SignIn;
