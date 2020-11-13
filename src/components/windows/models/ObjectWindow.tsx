import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassAttributes } from '../../../actions/models/classes/classes';
import { TClassAttribute } from '../../../actions/models/classes/types';
import { createObjectAttributeValue, getObjectAttributeValues, updateObjectAttributeValue } from '../../../actions/models/objects/objects';
import { TObjectAttributeValue } from '../../../actions/models/objects/types';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import ObjectForm from '../../forms/models/ObjectForm';

export type TDisplayAttr = {
    attr_id: number,
    attr_val_id: number,
    value: string,
    name: string
}

interface IObjectWindowProps {
    window: TWindow
}

const ObjectWindow: React.FunctionComponent<IObjectWindowProps> = (props) => {
    const dispatch = useDispatch()

    const classState = useSelector((state: RootStore) => state.classes)
    const objectState = useSelector((state: RootStore) => state.objects)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const [localAttrubuteValueDict, setLocalAttributeValueDict] = React.useState<{ [id: string]: TDisplayAttr }>({})


    const object = objectState.objects.find(x => x.id === props.window.model_pk)
    const parent = classState.classes.find(x => x.id === object.parent_class)

    React.useEffect(() => {
        dispatch(getClassAttributes(parent.id))
        dispatch(getObjectAttributeValues(object.id))
    }, [])

    React.useEffect(() => {

        if (classState.attributes.length && classState.attributes[0].related_class === parent.id) {
            var temp_dict: { [id: string]: TDisplayAttr } = {}
            classState.attributes.map(attr => {
                const d_attr: TDisplayAttr = {
                    attr_id: attr.id,
                    attr_val_id: -1,
                    value: '',
                    name: attr.name
                }
                temp_dict[attr.id] = d_attr
            })
            setLocalAttributeValueDict(temp_dict)
        }

    }, [classState.attributes,])

    React.useEffect(() => {
        if (Object.keys(localAttrubuteValueDict).length && objectState.object_attribute_values.length && objectState.object_attribute_values[0].related_object === object.id) {
            var temp_dict: { [id: string]: TDisplayAttr } = { ...localAttrubuteValueDict }
            objectState.object_attribute_values.map(attr => {
                var temp_d_attr: TDisplayAttr = temp_dict[attr.related_attribute]
                temp_d_attr.attr_val_id = attr.id
                temp_d_attr.value = attr.value
            })
            if (localAttrubuteValueDict === temp_dict) return null
            setLocalAttributeValueDict(temp_dict)
        }
    }, [classState.attributes, objectState.object_attribute_values])


    React.useEffect(() => {
        dispatch(getObjectAttributeValues(object.id))
        dispatch(getClassAttributes(parent.id))
    }, [objectState.new_object_attribute_value])

    const save = () => {
        setPerformSave(true)

        Object.keys(localAttrubuteValueDict).map(key => {
            const new_attr = localAttrubuteValueDict[key]
            const new_object_attribute_value: TObjectAttributeValue = {
                id: new_attr.attr_val_id === -1 ? null : new_attr.attr_val_id,
                value: new_attr.value,
                related_object: object.id,
                related_attribute: new_attr.attr_id
            }
            new_object_attribute_value.id ? dispatch(updateObjectAttributeValue(new_object_attribute_value)) :
                dispatch(createObjectAttributeValue(new_object_attribute_value))
        })
    }

    const deleteObj = () => {
        dispatch(closeWindow(props.window.id))
        setPerformDelete(true)
    }

    const onAttributeChange = (e) => {
        const value = e.target.value
        const attr_id = e.target.name
        var new_dict = { ...localAttrubuteValueDict }
        var temp_line = new_dict[attr_id]
        temp_line.value = value
        setLocalAttributeValueDict(new_dict)
    }
    return (
        <>
            <div className='window-control-panel'>
                <button onClick={save}><i className="fas fa-save"></i></button>
                <button onClick={deleteObj}><i className="fas fa-trash"></i></button>
            </div>
            <div className='model-form'>
                <ObjectForm corpusId={parent.corpus} object={object} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            <div className='model-form'>
                {Object.keys(localAttrubuteValueDict).map(key => {
                    const attr = localAttrubuteValueDict[key]
                    return <>
                        <label>{attr.name}</label>
                        <input name={attr.attr_id + ''} value={attr.value} onChange={onAttributeChange}></input>
                    </>
                })}
            </div>
        </>
    )
};

export default ObjectWindow;
