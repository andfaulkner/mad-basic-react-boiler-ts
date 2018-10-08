/// <reference path="../../../../node_modules/@types/jest/index.d.ts" />

/************************************** THIRD-PARTY MODULES ***************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import {mount, render, shallow} from 'enzyme';

/**************************************** PROJECT MODULES *****************************************/
import {App} from '../app';

/********************************************* TESTS **********************************************/
test(`App outputs string in a <span>`, () => {
    const rootComponent = shallow(<App />);
    expect(rootComponent.find(`span`).text()).toEqual(`Test component!`);
});
