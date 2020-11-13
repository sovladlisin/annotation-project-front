import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCorpus, deleteCorpus, getCorpuses, updateCorpus } from '../../../actions/models/corpuses/corpuses';
import { TCorpus } from '../../../actions/models/corpuses/types';
import { RootStore } from '../../../store';

interface ICorpusFormProps {
    corpus?: TCorpus,
    deleteTrigger: boolean,
    saveTrigger: boolean,
    onComplete: () => void
}

const CorpusForm: React.FunctionComponent<ICorpusFormProps> = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = React.useState(props.corpus ? props.corpus.name : "Не указано")
    const [language, setLanguage] = React.useState(props.corpus ? props.corpus.language : "Не указано")
    const [dialect, setDialect] = React.useState(props.corpus ? props.corpus.dialect : "Не указано")
    const [extras, setExtras] = React.useState(props.corpus ? props.corpus.extras : "Не указано")
    const [parent, setParent] = React.useState<number>(props.corpus ? props.corpus.parent : -1)

    const corpusState = useSelector((state: RootStore) => state.corpuses)

    React.useEffect(() => {
        dispatch(getCorpuses())
    }, [])

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteCorpus(props.corpus.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {
            const new_corpus: TCorpus = {
                parent: parent,
                name: name,
                language: language,
                dialect: dialect,
                extras: extras,
                id: props.corpus ? props.corpus.id : null
            }
            new_corpus.id ? dispatch(updateCorpus(new_corpus)) : dispatch(createCorpus(new_corpus))
            props.onComplete()
        }
    }, [props.saveTrigger])

    const parent_select = corpusState.corpuses.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })

    return <>
        <label>Название</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
        <label>Язык</label><input onChange={(e) => setLanguage(e.target.value)} type="text" value={language} />
        <label>Диатект</label><input onChange={(e) => setDialect(e.target.value)} type="text" value={dialect} />
        <label>Доп. инф.</label><input onChange={(e) => setExtras(e.target.value)} type="text" value={extras} />
        <label>Родитель</label><select onChange={(e) => setParent(parseInt(e.target.value))} id="parent" value={parent}>
            <option value={-1}>Корень</option>
            {parent_select}
        </select>

    </>;
};

export default CorpusForm;
