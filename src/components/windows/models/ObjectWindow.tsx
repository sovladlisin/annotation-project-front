import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassAttributes } from '../../../actions/models/classes/classes';
import { TClassAttribute } from '../../../actions/models/classes/types';
import { createObjectAttributeValue, getObjectAttributeValues, updateObjectAttributeValue } from '../../../actions/models/objects/objects';
import { TEntity, TObjectAttributeValue } from '../../../actions/models/objects/types';
import { createEntity, deleteEntity } from '../../../actions/models/resourses/resources';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow, createWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import { utilsGetClassAttributes } from '../../../utils';
import ObjectForm from '../../forms/models/ObjectForm';
import RelationFields from './RelationFields';

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
    const primeState = useSelector((state: RootStore) => state)
    const objectState = useSelector((state: RootStore) => state.objects)
    const [performSave, setPerformSave] = React.useState(false)
    const [performDelete, setPerformDelete] = React.useState(false)

    const [localAttrubuteValueDict, setLocalAttributeValueDict] = React.useState<{ [id: string]: TDisplayAttr }>({})


    const object = objectState.objects.find(x => x.id === props.window.model_pk)
    const parent = classState.classes.find(x => x.id === object.parent_class)




    React.useEffect(() => {
        dispatch(getClassAttributes())
        dispatch(getObjectAttributeValues(object.id))
    }, [])

    React.useEffect(() => {
        if (classState.attributes.length) {
            const attrs: TClassAttribute[] = utilsGetClassAttributes(parent.id, classState.attributes, classState.classes)
            var temp_dict: { [id: string]: TDisplayAttr } = {}
            attrs.map(attr => {
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
        dispatch(getClassAttributes())
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

    const addLine = (e) => {
        e.preventDefault()
        const entity: TEntity = JSON.parse(e.dataTransfer.getData("entity"))
        entity.obj = props.window.model_pk
        dispatch(createEntity(entity))
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
            <p className='window-line'>Строки:</p>
            <div>
                <div className='add-line-placeholder'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => addLine(e)}
                >
                    Для связи строки и объекта перетащите номер строки в данное поле</div>
                <div className='entity-container'>
                    {primeState.resources.entities.filter(e => e.obj === props.window.model_pk).map(e => {
                        const res_id = primeState.resources.markups.find(m => m.id === e.markup).text
                        const res = primeState.resources.resources.find(r => r.id === res_id)
                        return <div className='entity-line'>
                            <p>Строка #{e.position_start}</p>
                            <p>{e.text}</p>
                            <button className='delete-entity' onClick={() => dispatch(deleteEntity(e.id))}><i className='fas fa-times'></i></button>
                            <button className='pin-open' onClick={() => dispatch(createWindow({ id: Date.now(), title: res.title, model_name: 'resource', model_pk: res_id, is_hidden: false }))}><i className="far fa-window-maximize"></i></button>
                        </div>
                    })}

                </div>
            </div>
            <RelationFields window={props.window} />
        </>
    )
};

export default ObjectWindow;
