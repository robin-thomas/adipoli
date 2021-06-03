import Head from 'next/head';
import Image from 'next/image';
import { experimentalStyled as styled } from '@material-ui/core';

const LayoutBg = styled('div')({
  background: 'url("/images/bg.jpg")',
  backgroundSize: 'cover',
  filter: 'opacity(10%)',
  height: '100vh',
  width: '100vw',
})

const LayoutRoot = styled('div')({
  position: 'absolute',
  top: '0',
  overflow: 'hidden',
  height: '100vh',
  width: '100vw'
});

const LayoutHeader = styled('div')({
  textTransform: 'capitalize',
  width: '100%',
  color: '#3c4b64',
  borderBottom: '1px solid #d8dbe0',
  display: 'flex',
  flex: '0 0 70px',
  flexWrap: 'wrap',
  alignItems: 'center',
  height: '70px',
  padding: '0 1rem',
  boxSizing: 'border-box',
  fontSize: '47px',
  fontFamily: '"Sacramento", cursive',
  paddingLeft: '30px',
});

const LayoutContent = styled('div')({
  height: 'calc(100% - 120px)',
});

const LayoutFooter = styled('div')({
  width: '100%',
  color: '#3c4b64',
  borderTop: '1px solid rgba(0,0,0,0.12)',
  display: 'flex',
  flex: '0 0 50px',
  flexWrap: 'wrap',
  alignItems: 'center',
  height: '50px',
  padding: '0 1rem',
  boxSizing: 'border-box',
});

const MainLayout = ({ title, children }) => (
  <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_APP_NAME} | {title}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet" />
    </Head>
    <>
      <LayoutBg />
      <LayoutRoot>
        <LayoutHeader>{process.env.NEXT_PUBLIC_APP_NAME}</LayoutHeader>
        <LayoutContent>
          {children}
        </LayoutContent>
        <LayoutFooter>
          <div>
            <span className="ml-1 mr-1">&copy; 2021</span>
            <a href="https://github.com/robin-thomas/adipoli" target="_blank" rel="noopener noreferrer">Robin Thomas</a>
          </div>
          <div className="ml-auto mr-1">
            <span className="mr-1">Powered by</span>
            <a href="https://www.rapyd.net/" target="_blank" rel="noopener noreferrer">Rapyd</a>
          </div>
        </LayoutFooter>
      </LayoutRoot>
    </>
  </>
);

export default MainLayout;
