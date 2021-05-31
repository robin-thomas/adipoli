import { experimentalStyled } from '@material-ui/core';

const LayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw'
  })
);

const LayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const MainLayout = ({ children }) => (
  <LayoutRoot>
    <LayoutContent>
      {children}
    </LayoutContent>
  </LayoutRoot>
);

export default MainLayout;
