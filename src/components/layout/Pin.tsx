import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createWindow, openWindow } from '../../actions/windows/windows';
import { getColorForModel, TPin } from '../../utils';

interface IPinProps {
    pin: TPin
    onDelete?: () => void
    onClick?: () => void
}

const Pin: React.FunctionComponent<IPinProps> = (props) => {
    const dispatch = useDispatch()
    const pin: TPin = props.pin

    const transfer = (e) => {
        e.dataTransfer.setData('pin', JSON.stringify(props.pin))
    }

    return <div className='pin'
        onDragStart={(e) => transfer(e)}
        draggable
    >
        <p className='pin-id'>{pin.model_pk}</p>
        <p className='pin-name' onClick={() => props.onClick()}>{pin.name}</p>
        {props.onDelete && <button className='pin-delete' onClick={props.onDelete}><i className="fas fa-trash"></i></button>}
        <button className='pin-open' onClick={() => dispatch(createWindow({ id: Date.now(), title: pin.name, model_name: pin.model_name, model_pk: pin.model_pk, is_hidden: false }))}><i className="far fa-window-maximize"></i></button>
    </div>;
};


export default Pin;
