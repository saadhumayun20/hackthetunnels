import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../components';
import { useAccountContext } from '../../context';
import './Admin.style.scss';
import Chart from 'chart.js/auto';

function Admin() {
  const { loggedIn } = useAccountContext();
  const chartRef = useRef(null);  // Create a ref for the chart canvas

  useEffect(() => {
    if (loggedIn()) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',  // or 'line', 'pie', etc.
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',   
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [loggedIn]);

  return (
    <Page>
      <div className="admin-page">
        <h1>Admin</h1>
        {loggedIn() === false ? (
          <div>Login to access admin</div>
        ) : (
          <div>
            <h2>Admin Actions:</h2>
            <Link to="/admin/create-product">Create Product</Link>
            <canvas ref={chartRef} width="400" height="400"></canvas>  {/* Render the chart canvas */}
          </div>
        )}
      </div>
    </Page>
  );
}

export default Admin;