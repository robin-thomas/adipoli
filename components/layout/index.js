import Head from 'next/head';

import SideBar from './sidebar';
import Footer from './footer';
import Root from './root';
import Content from './content';

const MainLayout = ({ title, children }) => (
  <>
    <Head>
      <title>
        {process.env.NEXT_PUBLIC_APP_NAME} | {title}
      </title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Sacramento&family=Raleway:wght@500&display=swap"
      />
    </Head>
    <>
      <Root>
        <SideBar />
        <>
          <Content>{children}</Content>
          <Footer />
        </>
      </Root>
    </>
  </>
);

export default MainLayout;
