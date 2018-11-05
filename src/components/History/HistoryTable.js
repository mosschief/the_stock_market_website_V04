import React from 'react';
import { Table } from 'react-bootstrap';
import './History.css';
import moment from 'moment';

export default function HistoryTable({ stock_history }) {
  return (
    <div>
      {stock_history.length ? (
        <div>
          <Table className="history-table">
            <thead>
              <tr className="history-row">
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stock_history.slice(0).reverse().map(stock => (
                <tr className="history-row">
                  <td>{moment(stock.date).format("dddd, MMMM Do YYYY")}</td>
                  <td>
                      $
                    {stock.close.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : <div />
      }
    </div>
  );
}
