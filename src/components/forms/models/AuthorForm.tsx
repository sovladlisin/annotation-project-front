import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAuthor, deleteAuthor, updateAuthor } from '../../../actions/models/authors/authors';
import { TAuthor } from '../../../actions/models/authors/types';
import { getPlaces } from '../../../actions/models/places/places';
import { RootStore } from '../../../store';

interface IAuthorFormProps {
    author?: TAuthor,
    saveTrigger: boolean,
    deleteTrigger: boolean,
    onComplete: () => void
}

const AuthorForm: React.FunctionComponent<IAuthorFormProps> = (props) => {
    const dispatch = useDispatch()
    const [dateOfBirth, setDateOfBirth] = React.useState(props.author ? props.author.date_of_birth : "Не указано")
    const [dateOfDeath, setDateOfDeath] = React.useState(props.author ? props.author.date_of_death : "Не указано")
    const [initials, setInitials] = React.useState(props.author ? props.author.initials : "Не указано")
    const [name, setName] = React.useState(props.author ? props.author.name : "Не указано")
    const [surname, setSurname] = React.useState(props.author ? props.author.surname : "Не указано")
    const [patronymic, setPatronymic] = React.useState(props.author ? props.author.patronymic : "Не указано")
    const [picture, setPicture] = React.useState(props.author ? props.author.picture : "Не указано")
    const [placeOfBirth, setPlaceOfBirth] = React.useState<number>(props.author ? props.author.place_of_birth : null)

    const placeState = useSelector((state: RootStore) => state.places)
    React.useEffect(() => {
        dispatch(getPlaces())
    }, [])

    React.useEffect(() => {
        if (props.saveTrigger) {
            const new_author: TAuthor = {
                date_of_birth: dateOfBirth,
                date_of_death: dateOfDeath,
                initials: initials,
                name: name,
                patronymic: patronymic,
                picture: picture,
                place_of_birth: placeOfBirth,
                surname: surname,
                id: props.author ? props.author.id : null
            }
            new_author.id ? dispatch(updateAuthor(new_author)) : dispatch(createAuthor(new_author))
            props.onComplete()
        }
    }, [props.saveTrigger])

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteAuthor(props.author.id))
        props.onComplete()
    }, [props.deleteTrigger])

    const places_select = placeState.places.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })

    return <>
        <label>Фамилия</label><input onChange={(e) => setSurname(e.target.value)} type="text" value={surname} />
        <label>Имя</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
        <label>Отчество</label><input onChange={(e) => setPatronymic(e.target.value)} type="text" value={patronymic} />
        <label>Инициалы</label><input onChange={(e) => setInitials(e.target.value)} type="text" value={initials} />
        <label>Дата рождения</label><input onChange={(e) => setDateOfBirth(e.target.value)} type="text" value={dateOfBirth} />
        <label>Дата смерти</label><input onChange={(e) => setDateOfDeath(e.target.value)} type="text" value={dateOfDeath} />
        <label>Изображение</label><input onChange={(e) => setPicture(e.target.value)} type="text" value={picture} />
        <label>Место рождения</label><select onChange={(e) => setPlaceOfBirth(parseInt(e.target.value))} value={placeOfBirth}>
            <option value={null}>Не указано</option>
            {places_select}
        </select>

    </>;
};

export default AuthorForm;
