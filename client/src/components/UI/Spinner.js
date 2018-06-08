import React from 'react';
import './Spinner.css';

const spinner = () => (
  <div className="lds-css ng-scope">
    <div style={{width: "100%", height: "100%"}} className="lds-ripple">
      <div>
      </div>
    </div>
  </div>
);

export default spinner;
