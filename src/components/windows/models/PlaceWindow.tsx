import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import PlaceForm from '../../forms/models/PlaceForm';
import RelationFields from './RelationFields';

interface IPlaceWindowProps {
    window: TWindow
}

const PlaceWindow: React.FunctionComponent<IPlaceWindowProps> = (props) => {
    const dispatch = useDispatch()
    const placeState = useSelector((state: RootStore) => state.places)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const place = placeState.places.find(x => x.id === props.window.model_pk)

    const save = () => {
        setPerformSave(true)
    }
    const deleteObj = () => {
        dispatch(closeWindow(props.window.id))
        setPerformDelete(true)
    }

    return (
        <>
            <div className='window-control-panel'>
                <button onClick={save}><i className="fas fa-save"></i></button>
                <button onClick={deleteObj}><i className="fas fa-trash"></i></button>
            </div>
            <div className='model-form'>
                <PlaceForm place={place} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            <RelationFields window={props.window} />
        </>
    )
};

export default PlaceWindow;
