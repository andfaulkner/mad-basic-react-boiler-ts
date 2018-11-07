/******************************************** STYLING *********************************************/
const s = require('./example.scss');

/************************************** THIRD-PARTY MODULES ***************************************/
import React from 'react';
import cn from 'classnames';
import {inject, observer} from 'mobx-react';

/**************************************** PROJECT MODULES *****************************************/
import {StoreProps} from '../../store/root-store';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`example.ts`, Styles.grasslands);

/**************************************** TYPE DEFINITIONS ****************************************/
interface ExampleProps extends StoreProps {}

/********************************************* EXPORT *********************************************/
@inject('appState')
@observer
export class Example extends React.Component<ExampleProps> {
    render() {
        return (
            <span className={cn(s[`test-style`])}>Example component!</span>
        );
    }
};
