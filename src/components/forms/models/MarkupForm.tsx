import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMarkup } from '../../../actions/models/objects/objects';
import { TMarkup } from '../../../actions/models/objects/types';
import { deleteMarkup, updateMarkup } from '../../../actions/models/resourses/resources';
import { RootStore } from '../../../store';

interface IMarkupFormProps {
    markup?: TMarkup,
    corpusId: number,
    deleteTrigger: boolean,
    saveTrigger: boolean,
    onComplete: () => void
}

const MarkupForm: React.FunctionComponent<IMarkupFormProps> = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = React.useState(props.markup ? props.markup.name : "Не указано")
    const [text, setText] = React.useState(props.markup ? props.markup.text : null)

    const resourceState = useSelector((state: RootStore) => state.resources)

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteMarkup(props.markup.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {

            const new_markup: TMarkup = {
                name: name,
                text: text,
                id: props.markup ? props.markup.id : null
            }
            new_markup.id ? dispatch(updateMarkup(new_markup)) : dispatch(createMarkup(new_markup))
            props.onComplete()
        }
    }, [props.saveTrigger])

    const text_select = resourceState.resources.filter(r => r.corpus === props.corpusId).map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.title}</option>
        )
    })

    return <>
        <label>Название</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
        <label>Текст</label><select onChange={(e) => setText(parseInt(e.target.value))} value={text}>
            <option value={null}>Не указано</option>
            {text_select}
        </select>
    </>;
};

export default MarkupForm;
