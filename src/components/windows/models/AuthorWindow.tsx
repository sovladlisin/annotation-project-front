import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import AuthorForm from '../../forms/models/AuthorForm';
import RelationFields from './RelationFields';

interface IAuthorWindowProps {
    window: TWindow
}

const AuthorWindow: React.FunctionComponent<IAuthorWindowProps> = (props) => {
    const dispatch = useDispatch()
    const authorState = useSelector((state: RootStore) => state.authors)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const author = authorState.authors.find(x => x.id === props.window.model_pk)

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
                <AuthorForm author={author} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            <RelationFields window={props.window} />
        </>
    )
};

export default AuthorWindow;
