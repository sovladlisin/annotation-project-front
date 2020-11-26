import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCorpusClasses } from '../../../actions/models/corpuses/corpuses';
import { createObject, deleteObject, updateObject } from '../../../actions/models/objects/objects';
import { TObject } from '../../../actions/models/objects/types';
import { RootStore } from '../../../store';

interface IObjectFormProps {
    object?: TObject,
    deleteTrigger: boolean,
    corpusId: number,
    saveTrigger: boolean,
    onComplete: () => void
}

const ObjectForm: React.FunctionComponent<IObjectFormProps> = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = React.useState(props.object ? props.object.name : "Не указано")
    const [parent, setParent] = React.useState<number>(props.object ? props.object.parent_class : null)

    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const localParent = corpusState.corpus_classes.find(cl => cl.id === props.object.parent_class)
    React.useEffect(() => {
        dispatch(getCorpusClasses(props.corpusId))
    }, [])

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteObject(props.object.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {
            const new_object: TObject = {
                parent_class: parent,
                name: name,
                id: props.object ? props.object.id : null
            }
            new_object.id ? dispatch(updateObject(new_object)) : dispatch(createObject(new_object))
            props.onComplete()
        }
    }, [props.saveTrigger])

    const class_select = corpusState.corpus_classes.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })

    return <>
        <label>Имя</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
        <label>Класс</label><select onChange={(e) => setParent(parseInt(e.target.value))} value={parent}>
            <option value={null}>Не указано</option>
            {class_select}
        </select>

    </>;
};

export default ObjectForm;
