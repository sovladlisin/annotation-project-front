import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createAlert } from '../../actions/alerts/alerts';
import { TAlert } from '../../actions/alerts/types';
import { TPin } from '../../utils';
import Pin from '../layout/Pin';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface ISelectorProps {
    options: { id: number, name: string }[]
    model_name?: string
    onSelect: (id: number | null, name: string | null) => void
}

const Selector: React.FunctionComponent<ISelectorProps> = (props) => {
    const dispatch = useDispatch()
    const ref = React.useRef()

    const select = (id?: number, name?: string) => {
        props.onSelect(id, name)
    }
    React.useEffect(() => {
        if (props.options.length != 0) return null
        const alert: TAlert = {
            message: 'Все возможные отношения добавлены',
            type: 500
        }
        dispatch(createAlert(alert))
    }, [])

    useOnClickOutside(ref, () => {
        select(null)
    })
    return <>
        {props.options[0] != undefined &&
            <div className='selector' ref={ref}>
                {props.options.length && props.options.map(o => {
                    const pin: TPin = {
                        model_name: props.model_name,
                        model_pk: o.id,
                        name: o.name
                    }
                    return <>
                        <Pin pin={pin} onClick={() => { select(o.id, o.name) }} />
                    </>
                })}
            </div>
        }
    </>;
};

export default Selector;

//E95678E6

