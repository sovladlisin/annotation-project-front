import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClass, deleteClass, getClasses, updateClass } from '../../../actions/models/classes/classes';
import { TClass } from '../../../actions/models/classes/types';
import { getCorpusClasses, getCorpuses } from '../../../actions/models/corpuses/corpuses';
import { RootStore } from '../../../store';
import { getPrimeCorpusParent } from '../../../utils'

interface IClassFormProps {
    class?: TClass,
    deleteTrigger: boolean,
    corpusId: number,
    saveTrigger: boolean,
    onComplete: () => void
}

const ClassForm: React.FunctionComponent<IClassFormProps> = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = React.useState(props.class ? props.class.name : "Не указано")
    const [parent, setParent] = React.useState<number>(props.class ? props.class.parent : null)

    const corpusState = useSelector((state: RootStore) => state.corpuses)

    const primeCorpus = getPrimeCorpusParent(props.corpusId, corpusState.corpuses)

    React.useEffect(() => {
        dispatch(getCorpusClasses(props.corpusId))
    }, [])

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteClass(props.class.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {
            const new_class: TClass = {
                parent: parent === 0 ? null : parent,
                corpus: primeCorpus,
                name: name,
                id: props.class ? props.class.id : null
            }
            new_class.id ? dispatch(updateClass(new_class)) : dispatch(createClass(new_class))
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
        <label>Корпус</label><p>{primeCorpus}</p>
        <label>Родитель</label><select onChange={(e) => setParent(parseInt(e.target.value))} value={parent}>
            <option value={null}>Корень</option>
            {class_select}
        </select>

    </>;
};

export default ClassForm;
