import React from 'react';
import useTransactionStore from '../store/transactionStore';
import { CSVLink } from 'react-csv';

function CSVExport() {
  const transactions = useTransactionStore((state) => state.transactions);

  const headers = [
    { label: 'Title', key: 'title' },
    { label: 'Amount', key: 'amount' },
    { label: 'Category', key: 'category' },
  ];

  return (
    <div className="mb-5">
      <CSVLink
        data={transactions}
        headers={headers}
        filename={'transactions.csv'}
        className="btn btn-success"
      >
        Export as CSV
      </CSVLink>
    </div>
  );
}

export default CSVExport;
