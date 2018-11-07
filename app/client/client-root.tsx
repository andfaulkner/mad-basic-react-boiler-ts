/************************************** THIRD-PARTY MODULES ***************************************/
import React from 'react';
import ReactDOM from 'react-dom';

/********************************************* SETUP **********************************************/
import './styles/global-styles.scss';

/**************************************** PROJECT MODULES *****************************************/
import {App} from './components/app';

/************************************** INTERACTION WITH DOM **************************************/
/**
 * Render root component
 */
ReactDOM.render(<App />, document.getElementById(`root`));
