import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import RelationForm from '../../forms/models/RelationForm';

interface IRelationWindowProps {
    window: TWindow
}

const RelationWindow: React.FunctionComponent<IRelationWindowProps> = (props) => {
    const dispatch = useDispatch()
    const relationState = useSelector((state: RootStore) => state.relations)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const relation = relationState.relations.find(x => x.id === props.window.model_pk)

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
                <RelationForm relation={relation} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>



        </>
    )
};

export default RelationWindow;
