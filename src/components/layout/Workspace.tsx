import ts from "typescript";
import { RouteComponentProps } from 'react-router-dom'

import * as React from 'react';

interface IWorkspaceProps {
    pk: string
}

const Workspace: React.FunctionComponent<IWorkspaceProps> = ({ match }: RouteComponentProps<IWorkspaceProps>) => {
    const pk: number = parseInt(match.params.pk)
    return (<></>);
};

export default Workspace;
