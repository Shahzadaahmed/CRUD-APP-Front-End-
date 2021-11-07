// Note: Main root file...!

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes';

ReactDOM.render(
  <React.Fragment>
    <AppRoutes />
  </React.Fragment>,
  document.getElementById('root')
);