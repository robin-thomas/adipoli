import Head from 'next/head';
import Image from 'next/image';
import { experimentalStyled as styled } from '@material-ui/core';

import SideBar from './layout/sidebar';
import Footer from './layout/footer';

const LayoutRoot = styled('div')({
  position: 'absolute',
  overflow: 'hidden',
  height: '90vh',
  width: '90vw',
  margin: 'auto',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: '50px',
  boxShadow: '0 0 2em rgba(0,0,0,0.3)',
});

const LayoutContent = styled('div')({
  height: 'calc(100% - 50px)',
  background: 'white',
});

const MainLayout = ({ title, children }) => (
  <>
    <Head>
      <title>
        {process.env.NEXT_PUBLIC_APP_NAME} | {title}
      </title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Sacramento&family=Raleway:wght@500&display=swap"
        rel="stylesheet"
      />
    </Head>
    <>
      <LayoutRoot>
        <SideBar />
        <>
          <LayoutContent>{children}</LayoutContent>
          <Footer />
        </>
      </LayoutRoot>
    </>
  </>
);

export default MainLayout;
