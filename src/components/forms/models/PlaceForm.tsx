import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlace, deletePlace, updatePlace } from '../../../actions/models/places/places';
import { TPlace } from '../../../actions/models/places/types';
import { RootStore } from '../../../store';

interface IPlaceFormProps {
    place?: TPlace,
    deleteTrigger: boolean,
    saveTrigger: boolean,
    onComplete: () => void
}

const PlaceForm: React.FunctionComponent<IPlaceFormProps> = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = React.useState(props.place ? props.place.name : "Не указано")
    const [location, setLocation] = React.useState(props.place ? props.place.location : "Не указано")

    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deletePlace(props.place.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {

            const new_place: TPlace = {
                name: name,
                location: location,
                id: props.place ? props.place.id : null
            }
            new_place.id ? dispatch(updatePlace(new_place)) : dispatch(createPlace(new_place))
            props.onComplete()
        }
    }, [props.saveTrigger])

    return <>
        <label>Имя</label><input onChange={(e) => setName(e.target.value)} type="text" value={name} />
        <label>Координаты</label><input onChange={(e) => setLocation(e.target.value)} type="text" value={location} />
    </>;
};

export default PlaceForm;
