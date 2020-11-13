import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClassAttribute, deleteClassAttribute, updateClassAttribute } from '../../../actions/models/classes/classes';
import { TClassAttribute } from '../../../actions/models/classes/types';
import { RootStore } from '../../../store';

interface IClassAttributeFormProps {
    attribute?: TClassAttribute,
    deleteTrigger: boolean,
    class_ID: number,
    saveTrigger: boolean,
    onComplete: () => void
}

const ClassAttributeForm: React.FunctionComponent<IClassAttributeFormProps> = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = React.useState(props.attribute ? props.attribute.name : "Не указано")
    const corpusState = useSelector((state: RootStore) => state.corpuses)


    React.useEffect(() => {
        if (props.saveTrigger) {
            const new_attribute: TClassAttribute = {
                name: name,
                related_class: props.class_ID,
                id: props.attribute ? props.attribute.id : null
            }
            new_attribute.id ? dispatch(updateClassAttribute(new_attribute)) : dispatch(createClassAttribute(new_attribute))
            props.onComplete()
        }
    }, [props.saveTrigger])

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteClassAttribute(props.attribute.id))
        props.onComplete()
    }, [props.deleteTrigger])


    const class_ = corpusState.corpus_classes.find(cl => cl.id === props.class_ID)

    return <>
        <label>Название</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
        <label>Класс</label><p>{class_.name}</p>
    </>;
};

export default ClassAttributeForm;
