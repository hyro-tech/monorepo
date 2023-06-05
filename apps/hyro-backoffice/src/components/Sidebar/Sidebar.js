import React from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { imagesLinks, PATHS } from '../../utils';
import theme from '../../styles/theme';
import { disconnectAdmin } from '../../actions/admin';

const Container = styled.div`
  position: relative;
  width: 240px;
  height: 100vh;
  box-shadow: 5px 0 10px 0 rgba(0, 0, 0, 5%);
`;

const Logo = styled(Image)`
  position: absolute;
  top: 50px;
  left: 50px;
`;

const Links = styled.div`
  position: absolute;
  width: 100%;
  top: 30%;
`;

const PageLink = styled.div`
  padding: 0 50px;
  height: 56px;
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
  }

  ${(props) =>
    props.actualPath &&
    `
        background-color: ${props.secondary ? theme.colors.grayLight : theme.colors.grayLight};
        p {
            font-weight: ${props.secondary ? theme.font.weight.regular : theme.font.weight.bold};
        }
    `};
`;

const BottomLinks = styled.div`
  position: absolute;
  width: 100%;
  bottom: 20px;
`;

const Sidebar = ({ path, secondary }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Logo src={imagesLinks.logos.simple} />
      <Links>
        <Link href={PATHS.ITEMS}>
          <PageLink actualPath={path === PATHS.ITEMS} secondary={secondary}>
            <p>Articles</p>
          </PageLink>
        </Link>
        <Link href={PATHS.BRANDS}>
          <PageLink actualPath={path === PATHS.BRANDS} secondary={secondary}>
            <p>Marques</p>
          </PageLink>
        </Link>
        <Link href={PATHS.CATEGORIES}>
          <PageLink actualPath={path === PATHS.CATEGORIES} secondary={secondary}>
            <p>Catégories</p>
          </PageLink>
        </Link>
        <Link href={PATHS.COLORS}>
          <PageLink actualPath={path === PATHS.COLORS} secondary={secondary}>
            <p>Couleurs</p>
          </PageLink>
        </Link>
      </Links>

      <BottomLinks>
        <PageLink onClick={() => dispatch(disconnectAdmin())}>
          <p>Déconnexion</p>
        </PageLink>
      </BottomLinks>
    </Container>
  );
};

export default Sidebar;
