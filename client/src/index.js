import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";

const styleNode = document.createComment("insertion-point-jss");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

const app = (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </JssProvider>
)

const root: ?Element = document.getElementById('root');
if(root != null){
  ReactDOM.render(app, root);
  registerServiceWorker();
}

