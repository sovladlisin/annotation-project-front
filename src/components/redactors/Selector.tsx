import * as React from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface ISelectorProps {
    options: [{ id: number, name: string }]
    onSelect: (id: number | null) => void
}

const Selector: React.FunctionComponent<ISelectorProps> = (props) => {

    const ref = React.useRef()

    const select = (id?: number) => {
        props.onSelect(id)
    }

    useOnClickOutside(ref, () => {
        select(null)
    })
    return <>
        <div className='selector' ref={ref}>
            {props.options && props.options.map(o => {
                return <>
                    <p onClick={() => select(o.id)}>{o.name}</p>
                </>
            })}
        </div>
    </>;
};

export default Selector;
