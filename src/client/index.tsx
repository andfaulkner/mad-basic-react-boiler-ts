/************************************** THIRD-PARTY MODULES ***************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const cn = require('classnames');

/************************************** INTERACTION WITH DOM **************************************/

// Available in this.props within ProjectRoot component
interface ProjectRootProps {}

// Available in this.state within ProjectRoot component
interface ProjectRootState {}

/**
 * Root component for project
 */
export class ProjectRoot extends React.Component<ProjectRootProps, ProjectRootState> {
    render() {
        return (
            <span>Test component!</span>
        );
    }
}

/**
 * Render root component
 */
ReactDOM.render(
    <ProjectRoot/>,
    document.getElementById('root')
);
