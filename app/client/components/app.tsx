/************************************** THIRD-PARTY MODULES ***************************************/
import React from 'react';
// import * as cn from 'classnames';

/************************************** INTERACTION WITH DOM **************************************/
/**
 * Available in this.props within App component
 */
interface AppProps {}

/**
 * Available in this.state within App component
 */
interface AppState {}

/**
 * Root component for project
 */
export class App extends React.Component<AppProps, AppState> {
    render() {
        return (
            <span>Test component!</span>
        );
    }
}
