import React from 'react';
import {
  SFooter,
  SMain,
  SSlogan,
  SLinks,
  SLink,
  SFollow,
  STitleFollow,
  SMediaWrapper,
  SMedia,
  SCopyright,
  SMediaLink,
} from './style';

const Footer = () => {
  return (
    <SFooter>
      <SMain>
        <SSlogan>
          Soundbar - это сборник треков, которые вы больше всего любите
        </SSlogan>
        <SLinks>
          <SLink>О нас</SLink>
          <SLink>Пресса</SLink>
          <SLink>Дополнительно</SLink>
          <SLink>Пользовательское соглашение</SLink>
        </SLinks>
        <SLinks>
          <SLink>Лицензии</SLink>
          <SLink>Поддержка</SLink>
          <SLink>Зарегистрироваться</SLink>
        </SLinks>
      </SMain>

      <SFollow>
        <STitleFollow>Подпишись на нас</STitleFollow>
        <SMediaWrapper>
          <SMedia>
            <SMediaLink>Facebook</SMediaLink>
          </SMedia>
          <SMedia>
            <SMediaLink>Instagram</SMediaLink>
          </SMedia>
          <SMedia>
            <SMediaLink>VK</SMediaLink>
          </SMedia>
        </SMediaWrapper>
      </SFollow>

      <SCopyright>© 2022 Soundbar</SCopyright>
    </SFooter>
  );
};

export default Footer;
