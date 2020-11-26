import * as React from 'react';
import { TPin } from '../../utils';
import TreeNode, { el_t } from './TreeNode';

interface ITreeProps {
    tree_data: el_t[]
    model_name: string,
    onClick?: (id: number) => void
}

const Tree: React.FunctionComponent<ITreeProps> = (props) => {
    return <>
        {props.tree_data.map(elem => {
            const pin: TPin = {
                model_name: props.model_name,
                model_pk: elem.id,
                name: elem.name
            }
            return (<>
                <TreeNode onClick={props.onClick} level={0} element={elem} is_hidden={false} model_name={props.model_name} />
            </>
            )
        })}
    </>;
};

export default Tree;
