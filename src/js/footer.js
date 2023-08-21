import React from 'react'
import styled from 'styled-components';

  const FooterContainer = styled.footer`
    background-color: #D9D9D9;
    border-top: 1px solid #333;
  `;

  const Inner= styled.div`
  `;

  const  Menu = styled.ul`
    display: flex;
    justify-content: center;
  `;

 const Menuli = styled.li`
    position: relative;
    list-style: none;

    &::before {
      content: "";
      width: 3px;
      height: 3px;
      background-color: #000000;
      position: absolute;
      top: 0;
      bottom: 0;
      right: -1px;
      margin: auto;
    }
  `;

  const MenuLink = styled.a`
    color: #000000;
    font-size: 12px;
    font-weight: 700;
    padding: 10px;
    display: block;

    &.red {
      color: red;
    }
  `;

  const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Button = styled.button`
    font-size: 12px;
    margin-right: 10px;
    background-color: white;
    border: 1px solid;
    &:last-child {
      margin: 0;
    }
  `;

  const Info = styled.div`
    margin-top: 10px;
    text-align: center;
  `;

  const InfoSpan =  styled.span`
    margin-right: 20px;
    color: #000000;
    font-size: 12px;

    &:last-child {
      margin-right: 0;
    }
  `;

  const Copyright = styled.div`
    color: #000000;
    font-size: 12px;
    text-align: center;
    padding-bottom: 10px;
  `;

  const Logo = styled.div`
    /* margin: 15px auto 0; */
  `;



const Footer = () => {
  return (
      <FooterContainer>
        <Inner>
        <Menu>
          <Menuli><MenuLink href="javascript:void(0)" className="red">개인정보처리방침</MenuLink></Menuli>
          <Menuli><MenuLink href="javascript:void(0)">Animore 소개</MenuLink></Menuli>
          <Menuli><MenuLink href="javascript:void(0)">홈페이지 이용약관</MenuLink></Menuli>
          <Menuli><MenuLink href="javascript:void(0)">업체 등록</MenuLink></Menuli>
          <Menuli><MenuLink href="javascript:void(0)">Animore 이용약관</MenuLink></Menuli>
          <Menuli><MenuLink href="javascript:void(0)">광고 제휴</MenuLink></Menuli>
        </Menu>

        <ButtonGroup>
          <Button>공지 사항</Button>
          <Button>1:1 문의하기</Button>
          <Button>자주 묻는 질문</Button>
        </ButtonGroup>

        <Info>
          <InfoSpan>사업자등록번호 : 000-00-00000 </InfoSpan>
          <InfoSpan>Animore : OOO</InfoSpan>
          <InfoSpan>EMAIL : ty4ove@nvaer.com</InfoSpan>
          <InfoSpan>개인정보보호책임자 : OOO</InfoSpan>
        </Info>

        <Copyright>
          &copy; Animore. Inc All rights reserved.
        </Copyright>
        <Logo src="./public/images/1.png" alt="" className="logo" />
      </Inner>
    </FooterContainer>
  );
};

export default Footer;
