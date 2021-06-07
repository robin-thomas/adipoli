import { useState } from 'react';
import { Box, Container, Tabs } from '@material-ui/core';

import styles from './tabs.module.css';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <>{children}</>}
  </div>
);

const PageTab = ({ children, panels }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Container className={styles.container}>
      <Tabs value={value} onChange={handleChange}>
        {children}
      </Tabs>
      <Box p={3} />
      {panels.map((panel, index) => (
        <TabPanel key={index} index={index} value={value}>
          {panel}
        </TabPanel>
      ))}
    </Container>
  );
};

export default PageTab;
