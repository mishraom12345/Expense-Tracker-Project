import React from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';


const DownloadButton = () => {
const data = useSelector(state=>state.expense.expenses)
  return (
    <CSVLink data={data} headers={['money', 'description','category']}>
      <Button variant = 'info'>Download expense</Button>
    </CSVLink>
  );
};

export default DownloadButton;
