import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createRelation, deleteRelation, updateRelation } from '../../../actions/models/relations/relations';
import { TRelation } from '../../../actions/models/relations/types';

interface IRelationFormProps {
    relation?: TRelation,
    deleteTrigger: boolean,
    saveTrigger: boolean,
    onComplete: () => void
}

const RelationForm: React.FunctionComponent<IRelationFormProps> = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = React.useState(props.relation ? props.relation.name : "Не указано")

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteRelation(props.relation.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {
            const new_relation: TRelation = {
                name: name,
                id: props.relation ? props.relation.id : null
            }
            new_relation.id ? dispatch(updateRelation(new_relation)) : dispatch(createRelation(new_relation))
            props.onComplete()
        }
    }, [props.saveTrigger])

    return <>
        <label>Название</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
    </>;
};

export default RelationForm;
