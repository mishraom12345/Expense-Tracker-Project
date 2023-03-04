import React from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';


const DownloadButton = () => {
const data = useSelector(state=>state.expense.expenses)
  return (
    <CSVLink data={data} headers={['money', 'description','category']}>
      <button>Download CSV</button>
    </CSVLink>
  );
};

export default DownloadButton;
