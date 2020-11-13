import * as React from 'react';
import { TWindow } from '../../actions/windows/types';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { useDispatch, useSelector } from 'react-redux';
import { closeWindow, collapseWindow } from '../../actions/windows/windows';
import AuthorForm from '../forms/models/AuthorForm'
import { RootStore } from '../../store';
import CorpusForm from '../forms/models/CorpusForm';
import ClassForm from '../forms/models/ClassForm';
import { TPin } from '../../utils';
import Pin from '../layout/Pin';
import ObjectForm from '../forms/models/ObjectForm';
import ClassWindow from './models/ClassWindow';
import ObjectWindow from './models/ObjectWindow';
import ClassAttributeWindow from './models/ClassAttributeWindow';
import AuthorWindow from './models/AuthorWindow';
import CorpusWindow from './models/CorpusWindow';

interface IWindowProps {
    window: TWindow
}

const Window: React.FunctionComponent<IWindowProps> = (props) => {
    const dispatch = useDispatch()
    const authorState = useSelector((state: RootStore) => state.authors)
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const classState = useSelector((state: RootStore) => state.classes)
    const objectState = useSelector((state: RootStore) => state.objects)
    const [performSave, setPerformSave] = React.useState(false)
    const windowState = useSelector((state: RootStore) => state.windows)

    React.useEffect(() => {
        if (props.window.is_hidden)
            document.getElementById(props.window.id + '').style.display = "none"
        else
            document.getElementById(props.window.id + '').style.display = "block"
    }, [
        props.window.is_hidden
    ])

    const renderWindow = () => {
        switch (props.window.model_name) {
            case 'author':
                return <AuthorWindow window={props.window} />
            case 'corpus':
                return <CorpusWindow window={props.window} />
            case 'object':
                return <ObjectWindow window={props.window} />
            case 'class_attribute':
                return <ClassAttributeWindow window={props.window} />
            case 'class':
                return <ClassWindow window={props.window} />
            default:
                return <></>
        }
    }

    const handleStart = () => {
        Object.keys(windowState.windows).map(key => {
            if (windowState.windows[key] === undefined) return 0
            if (key === props.window.id + '')
                document.getElementById(key + '').style.zIndex = "100";
            else
                document.getElementById(key + '').style.zIndex = "99";
        })
    }

    const handleStop = () => {
    }
    const style = { top: 50 + 'px', left: 50 + 'px' }

    return (
        < Draggable
            handle=".window-header"
            onStart={handleStart}
            onStop={handleStop}>
            <div style={style} className="window" id={props.window.id + ""} >
                <div className="window-header">
                    <p>{props.window.title}</p>
                    <button onClick={() => dispatch(closeWindow(props.window.id))}><i className="fas fa-times"></i></button>
                    <button onClick={() => dispatch(collapseWindow(props.window.id))}><i className="far fa-eye"></i></button>
                </div>
                <div className="window-hover-notification" id={"notification-" + props.window.id}>
                    <p><i className="far fa-check-circle"></i></p>
                </div>
                <div className="window-content">
                    {renderWindow()}
                </div>
            </div>
        </Draggable >
    )
};

export default Window;
