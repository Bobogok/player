import Link from 'next/link';
import Image from 'next/image';
import Ghost from '../public/images/404/404ghost.webp';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
`;

const SImage = styled.div`
  width: 500px;
  height: auto;
`;

const SH1 = styled.h1`
  font-size: 60px;
  letter-spacing: 0.78px;
  margin-bottom: 10px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.main};
`;

const SHome = styled.a`
  font-size: 24px;
  letter-spacing: 0.78px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.textLight};
`;

export default function FourOhFour() {
  return (
    <MainLayout>
      <SWrapper>
        <SImage>
          <Image src={Ghost} alt="404 kissing ghost" />
        </SImage>
        <SH1>404 - Страница не найдена</SH1>
        <Link href="/">
          <SHome>&lt;= Вернуться домой</SHome>
        </Link>
      </SWrapper>
    </MainLayout>
  );
}
