import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import CorpusForm from '../../forms/models/CorpusForm';
import RelationFields from './RelationFields';

interface ICorpusWindowProps {
    window: TWindow
}

const CorpusWindow: React.FunctionComponent<ICorpusWindowProps> = (props) => {
    const dispatch = useDispatch()
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const corpus = corpusState.corpuses.find(x => x.id === props.window.model_pk)

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
                <CorpusForm corpus={corpus} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            <RelationFields window={props.window} />
        </>
    )
};

export default CorpusWindow;
