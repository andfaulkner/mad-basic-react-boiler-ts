/// <reference path="../../../../node_modules/@types/jest/index.d.ts" />

/************************************** THIRD-PARTY MODULES ***************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import {mount, render, shallow} from 'enzyme';
import renderer from 'react-test-renderer';

/**************************************** PROJECT MODULES *****************************************/
import {App} from '../app';

/********************************************* TESTS **********************************************/
describe(`App`, () => {
    // Standard test
    it(`outputs string in a <span>`, () => {
        const app = shallow(<App />);
        expect(app.find(`span`).text()).toEqual(`Test component!`);
    });

    // Snapshot test
    it(`renders correctly`, () => {
        const app = renderer.create(<App />).toJSON();
        expect(app).toMatchSnapshot();
    });
});
