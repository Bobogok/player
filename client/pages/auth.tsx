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

const Auth = () => {
  const [capture, setCapture] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const login = useInput('');
  const password = useInput('');

  const nextStep = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
      console.log('Данные ушли');
    } else {
      const formData = new FormData();
      formData.append('login', login.value);
      formData.append('password', password.value);
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
            {activeStep === 2 && (
              // todo изменить
              <div style={{ width: 307, height: 65 + 24 }}>...loading</div>
            )}
          </SInputWrapper>
          {activeStep !== 2 && (
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
