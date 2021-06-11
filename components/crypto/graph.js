import { useContext, useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

import { DataContext } from '../utils/DataProvider';

const CryptoLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    width={500}
    height={400}
    margin={{ top: 20, right: 50, bottom: 60, left: 20 }}
    animate={true}
    labelTextColor="Red"
    pointSize={12}
    lineWidth={6}
    useMesh={true}
    enablePoints={true}
    enableGridX={false}
    enableGridY={false}
    colors={{ scheme: 'red_grey' }}
    axisLeft={null}
    axisBottom={null}
  />
);

const Graph = () => {
  const [data, setData] = useState(null);

  const ctx = useContext(DataContext);

  useEffect(() => {
    if (ctx.portfolio) {
      const _data = ctx.portfolio.reduce(
        (p, c) => [...p, { x: c.date, y: c.balance }],
        []
      );
      const opt = [{ data: _data }];

      setData(opt);
    }
  }, [ctx.portfolio]);

  if (!data) {
    return null;
  }

  return (
    <>
      <h2>Portfolio</h2>
      <div style={{ height: 400, width: 500 }}>
        <CryptoLine data={data} />
      </div>
    </>
  );
};

export default Graph;
