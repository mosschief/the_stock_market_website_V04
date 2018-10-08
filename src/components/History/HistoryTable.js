import React from 'react';
import { Table } from 'react-bootstrap';
import './History.css';

export default function HistoryTable({ prices }) {
  return (
    <div>
      {Object.keys(prices).length ? (
        <Table className="history-table">
          <thead>
            <tr className="history-row">
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(prices).map(date => (
              <tr className="history-row">
                <td>{date}</td>
                <td>
                    $
                  {prices[date]['1. open']}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : <div />
      }
    </div>
  );
}
