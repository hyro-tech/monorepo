import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { userRolesType } from 'lib-enums';

import { PageFullHeight } from '../src/styles/page';
import { COOKIES_NAMES, imagesLinks, PATHS, REGEX_EMAIL, setCookie } from '../src/utils';
import * as theme from '../src/styles/theme';
import callApi from '../src/middlewares/callApi';

const Container = styled.div`
  min-width: 300px;
  margin: auto;
  box-shadow: 0 0 0 white, 0 0 35px ${theme.colors.grayDark};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h6 {
    text-align: center;
  }

  input {
    margin-bottom: 20px;
    border: 1px solid ${theme.colors.grayBorder};
    border-radius: 12px;
    padding: 8px 12px;
    outline: none;
  }
`;

const Hyro = styled.img`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  function connect() {
    callApi({
      method: 'POST',
      url: '/auth',
      data: {
        email,
        password,
        user_type: userRolesType.admin,
      },
    })
      .then((response) => {
        setCookie(COOKIES_NAMES.token, response.token);
        router.push({
          pathname: PATHS.LOGIN,
          query: {
            access_token: response.token,
          },
        });
      })
      .catch(() => {
        setError('Identifiants incorrects');
        setPassword('');
      });
  }

  return (
    <PageFullHeight>
      <Hyro src={imagesLinks.logos.simple} alt={'exo'} />
      <Container>
        <h6>Connexion</h6>

        <input
          placeholder={'bastien@exo.fr'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder={'mot de passe'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
        />

        {error && <p style={{ color: theme.colors.red }}>* Erreur: {error}</p>}

        <button onClick={connect} disabled={!email || !REGEX_EMAIL.test(email) || !password}>
          Connexion
        </button>
      </Container>
    </PageFullHeight>
  );
};

export default SignIn;
