import axios from 'axios';
import router from 'next/router';
import React, { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useInput } from '../hooks/useInput';

const SWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SBackground = styled.div`
  background-image: url('/images/background/bgAuth.jpg');
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
`;

const SPassport = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.white};
  min-height: 200px;
`;

const SContent = styled.div`
  padding: 32px;
  width: 100%;
`;

export const SLogo = styled.div`
  color: ${({ theme }) => theme.main};
  font-size: 35px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 425px) {
    display: none;
  }
`;

const STitle = styled.h1`
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

const border = (props: any) => keyframes`
  from {
    border-bottom: 1px solid ${props.theme.backgroundLight};
  }

  to {
    border-bottom: 1px solid ${props.theme.main};
  }
`;

const SInputWrapper = styled.div<{ capture: boolean }>`
  margin-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};

  ${({ capture, theme }) =>
    capture &&
    css`
      border-bottom: 1px solid ${theme.main};
      animation: ${border} 0.2s ease;
    `}
`;

const SInput = styled.input`
  padding: 8px 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  width: 100%;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.textLight};
  }
`;

const SSubmit = styled.button`
  margin-top: 40px;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.white};
  border: 1px solid rgba(0, 0, 0, 0);
  width: 100%;
  border-radius: 100px;
  font-size: 18px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;

const SRegistation = styled.button`
  margin-top: 15px;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.main};
  width: 100%;
  border-radius: 100px;
  font-size: 18px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;

const SForgotWrapper = styled.div`
  margin-top: 5px;
`;

const SForgot = styled.a`
  color: ${({ theme }) => theme.textLight};
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  user-select: none;
`;

function setCookie(name: string, value: any) {
  let expires = '';
  const date = new Date();
  date.setTime(date.getTime() + 900000);
  expires = '; expires=' + date.toUTCString();
  document.cookie =
    name + '=' + (value ? 'Bearer ' + value : '') + expires + '; path=/';
}

const Auth = () => {
  const [capture, setCapture] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const login = useInput('');
  const password = useInput('');

  const nextStep = () => {
    if (activeStep !== 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const json = JSON.stringify({
        email: login.value,
        password: password.value,
      });
      axios
        .post('http://localhost:5000/auth/login', json, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          localStorage.setItem('nickname', res.data.nickname);
          localStorage.setItem(
            'passport',
            (({ token, nickname, ...obj }) => JSON.stringify(obj))(res.data),
          );
          console.log(res.data.token);
          console.log(res.data.token);

          setCookie('jwtToken', res.data.token);
        })
        .then((res) => router.push('/'))
        .catch((e) => console.log(e));
    }
  };

  return (
    <SWrapper>
      <SBackground />
      <SPassport>
        <SContent>
          {/* logo */}
          <SLogo>Soundbar</SLogo>
          <STitle>Вход в аккаунт</STitle>

          {/* Inputs */}
          <SInputWrapper
            capture={capture}
            onFocusCapture={() => setCapture(true)}
            onBlurCapture={() => setCapture(false)}
          >
            {activeStep === 0 && (
              <SInput {...login} placeholder={'Логин и или email'} />
            )}
            {activeStep === 1 && (
              <>
                <div>
                  <label htmlFor="password">Введите пароль</label>
                </div>
                <SInput
                  id="password"
                  {...password}
                  type="password"
                  placeholder={'* * * * * *'}
                />
              </>
            )}
          </SInputWrapper>
          {activeStep === 1 && (
            <SForgotWrapper>
              <SForgot>Не помню</SForgot>
            </SForgotWrapper>
          )}

          {/* Buttons */}
          <SSubmit onClick={nextStep}>Войти</SSubmit>
          <SRegistation>Зарегистрироваться</SRegistation>
        </SContent>
      </SPassport>
    </SWrapper>
  );
};

export default Auth;
