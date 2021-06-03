import React, { useCallback, useState } from 'react';
import { TextInput, PrimaryButton } from '../components/UI';
import { SectionContainer, Title } from 'style/GlobalStyle';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPassword } from 'reducks/users/operations';

const Reset: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const history = useHistory();
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <SectionContainer>
      <Title>パスワードをリセット</Title>
      <div className="module-spacer--medium"></div>
      <TextInput
        variant="outlined"
        fullWidth={true}
        label={'Email'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />

      <div className="center">
        <PrimaryButton
          label={'パスワードをリセット'}
          onClick={() => dispatch(resetPassword(email))}
        />
        <br />
        <PrimaryButton label={'戻る'} onClick={() => history.goBack()} />
      </div>
    </SectionContainer>
  );
};

export default Reset;
