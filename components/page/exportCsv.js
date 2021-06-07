import { Button } from '@material-ui/core';

const ExportCSV = ({ transactions }) => {
  const download = (e) => {
    e.preventDefault();

    const header = Object.keys(transactions[0]).join(',') + '\n';
    const data = transactions.reduce(
      (p, c) => p + Object.values(c).join(',') + '\n',
      ''
    );

    const blob = new Blob([header + data], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${process.env.NEXT_PUBLIC_APP_NAME}_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button
      size="large"
      disabled={transactions.length === 0}
      onClick={download}
    >
      + Export CSV
    </Button>
  );
};

export default ExportCSV;
