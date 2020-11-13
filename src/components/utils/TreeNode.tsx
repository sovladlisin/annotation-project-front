import * as React from 'react';
import { LogLevel } from 'ts-loader/dist/logger';
import { TPin } from '../../utils';
import Pin from '../layout/Pin';

export type el_t = {
    id: number,
    name: string,
    parentid?: number,
    children: el_t[]
}

interface ITreeNodeProps {
    tree_data: el_t[]
    is_hidden: boolean,
    level: number,
    model_name: string,
    onClick?: (id: number) => void
}

const TreeNode: React.FunctionComponent<ITreeNodeProps> = (props) => {

    const [isHidden, setIsHidden] = React.useState(props.is_hidden)
    const style = { marginLeft: (props.level * 10) + 'px' }
    return <>
        {props.tree_data.map(elem => {
            const pin: TPin = {
                model_name: props.model_name,
                model_pk: elem.id,
                name: elem.name
            }
            return (<>
                <div className='tree-node' style={style}><Pin pin={pin} onClick={() => { setIsHidden(!isHidden); props.onClick(elem.id) }} /></div>
                {!isHidden && <TreeNode onClick={props.onClick} level={props.level + 1} tree_data={elem.children} is_hidden={false} model_name={props.model_name} />}
            </>
            )
        })}
    </>;
};

export default TreeNode;
