import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import ResourceForm from '../../forms/models/ResourceForm';
import RelationFields from './RelationFields';
import { Link } from 'react-router-dom'
import { url } from 'inspector';

interface IResourceWindowProps {
    window: TWindow
}

const ResourceWindow: React.FunctionComponent<IResourceWindowProps> = (props) => {
    const dispatch = useDispatch()
    const resourceState = useSelector((state: RootStore) => state.resources)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const resource = resourceState.resources.find(x => x.id === props.window.model_pk)

    const [img, setImg] = React.useState('')

    const save = () => {
        setPerformSave(true)
    }
    const deleteObj = () => {
        dispatch(closeWindow(props.window.id))
        setPerformDelete(true)
    }

    React.useEffect(() => {
        console.log(img.length, img)
        if (img.length > 5) return null
        if (resource.link === null) return null
        if (resource && resource.resource_type) {
            const type = resourceState.types.find(t => t.id === resource.resource_type)
            if (type && type.name.toLowerCase() != 'изображение') return null
            fetch(resource.link).then(response => response.blob()).then(fd => {
                setImg(URL.createObjectURL(fd))
                console.log(URL.createObjectURL(fd))
            })
        }
    }, [])
    return (
        <>
            <div className='window-control-panel'>
                <button onClick={save}><i className="fas fa-save"></i></button>
                <button onClick={deleteObj}><i className="fas fa-trash"></i></button>
                {resource.resource_type && resourceState.types.find(t => t.id === resource.resource_type).name === 'Текст' &&
                    <button><Link to={`workspace/${resource.id}`}><i className="fas fa-file"></i></Link></button>
                }
            </div>
            {img.length > 0 && <img className='resource-img' src={img}></img>}
            <div className='model-form'>
                <ResourceForm corpusId={resource.corpus} resource={resource} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            <RelationFields window={{ ...props.window }} />
        </>
    )
};

export default ResourceWindow;
