import * as React from 'react';
import { TPin } from '../../utils';
import Pin from '../layout/Pin';

export type el_t = {
    id: number,
    name: string,
    parentid?: number,
    children: el_t[]
}

interface ITreeNodeProps {
    element: el_t,
    is_hidden: boolean,
    level: number,
    model_name: string,
    onClick?: (id: number) => void
}

const TreeNode: React.FunctionComponent<ITreeNodeProps> = (props) => {

    const [isHidden, setIsHidden] = React.useState(props.is_hidden)
    const style = { marginLeft: (props.level * 10) + 'px' }

    const pin: TPin = {
        model_name: props.model_name,
        model_pk: props.element.id,
        name: props.element.name
    }

    return <>
        <div className='tree-node' style={style}><Pin pin={pin} onClick={() => { setIsHidden(!isHidden); props.onClick(props.element.id) }} /></div>
        {!isHidden &&
            props.element.children.map(elem => {
                const pin: TPin = {
                    model_name: props.model_name,
                    model_pk: elem.id,
                    name: elem.name
                }
                return (<>
                    <TreeNode onClick={props.onClick} level={props.level + 1} element={elem} is_hidden={false} model_name={props.model_name} />
                </>
                )
            })}
    </>;
};

export default TreeNode;
