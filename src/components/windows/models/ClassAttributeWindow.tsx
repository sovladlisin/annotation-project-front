import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import ClassAttributeForm from '../../forms/models/ClassAttributeForm';

interface IClassAttributeWindowProps {
    window: TWindow
}

const ClassAttributeWindow: React.FunctionComponent<IClassAttributeWindowProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const attribute = classState.attributes.find(x => x.id === props.window.model_pk)

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
                <ClassAttributeForm attribute={attribute} class_ID={attribute.related_class} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
        </>
    )
};

export default ClassAttributeWindow;
