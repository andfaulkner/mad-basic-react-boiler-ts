/************************************** THIRD-PARTY MODULES ***************************************/
import React from 'react';
import cn from 'classnames';
import {Provider as MobXProvider} from 'mobx-react';

import {RootStore} from '../store/root-store';
import {Example} from './example/example';

const store = RootStore.new();

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
            <MobXProvider appState={store}>
                <Example />
            </MobXProvider>
        );
    }
}
