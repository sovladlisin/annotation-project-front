import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createResourceType, deleteResourceType, updateResourceType } from '../../../actions/models/resourses/resources';
import { TResourceType } from '../../../actions/models/resourses/types';

interface IResourceTypeFormProps {
    resourceType?: TResourceType,
    deleteTrigger: boolean,
    saveTrigger: boolean,
    onComplete: () => void
}

const ResourceTypeForm: React.FunctionComponent<IResourceTypeFormProps> = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = React.useState(props.resourceType ? props.resourceType.name : "Не указано")

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteResourceType(props.resourceType.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {

            const new_resource_type: TResourceType = {
                name: name,
                id: props.resourceType ? props.resourceType.id : null
            }
            new_resource_type.id ? dispatch(updateResourceType(new_resource_type)) : dispatch(createResourceType(new_resource_type))
            props.onComplete()
        }
    }, [props.saveTrigger])

    return <>
        <label>Имя</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
    </>;
};

export default ResourceTypeForm;
