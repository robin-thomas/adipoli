import { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import tokens from '../../tokens.json';
import { DataContext } from '../utils/DataProvider';
import palette from '../../theme/palette';

const DoughnutOptions = {
  legend: {
    display: false,
  },
  responsive: false,
  maintainAspectRatio: false,
  cutoutPercentage: 80,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary,
  },
};

const COLORS_SERIES = [
  palette.primary.light,
  palette.primary.lighten,
  palette.primary.main,
];

const getData = (balances) => ({
  labels: Object.keys(balances).map((e) => tokens[e].name),
  datasets: [
    {
      label: 'Portfolio',
      data: Object.values(balances),
      backgroundColor: COLORS_SERIES,
      hoverBackgroundColor: COLORS_SERIES,
    },
  ],
});

const Chart = () => {
  const ctx = useContext(DataContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (ctx.balances) {
      setData(getData(ctx.balances));
    }
  }, [ctx.balances]);

  if (!data) {
    return null;
  }

  return <Doughnut height={400} data={data} options={DoughnutOptions} />;
};

export default Chart;
