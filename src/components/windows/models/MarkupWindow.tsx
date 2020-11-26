import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import MarkupForm from '../../forms/models/MarkupForm';

interface IMarkupWindowProps {
    window: TWindow
}

const MarkupWindow: React.FunctionComponent<IMarkupWindowProps> = (props) => {
    const dispatch = useDispatch()
    const resourceState = useSelector((state: RootStore) => state.resources)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const markup = resourceState.markups.find(m => m.id === props.window.model_pk)
    const corpus = resourceState.resources.find(r => r.id === markup.text).corpus

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
                <MarkupForm corpusId={corpus} markup={markup} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            {/* <RelationFields window={props.window} /> */}
        </>
    )
};

export default MarkupWindow;
