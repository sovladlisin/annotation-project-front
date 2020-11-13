import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClassAttribute } from '../../../actions/models/classes/classes';
import { TClassAttribute } from '../../../actions/models/classes/types';
import { createObject } from '../../../actions/models/objects/objects';
import { TObject } from '../../../actions/models/objects/types';
import { TWindow } from '../../../actions/windows/types';
import { closeWindow } from '../../../actions/windows/windows';
import { RootStore } from '../../../store';
import { TPin } from '../../../utils';
import ClassForm from '../../forms/models/ClassForm';
import Pin from '../../layout/Pin';

interface IClassWindowProps {
    window: TWindow
}

const ClassWindow: React.FunctionComponent<IClassWindowProps> = (props) => {
    const dispatch = useDispatch()

    const classState = useSelector((state: RootStore) => state.classes)
    const objectState = useSelector((state: RootStore) => state.objects)
    const relationState = useSelector((state: RootStore) => state.relations)
    const [performSave, setPerformSave] = React.useState(false)
    const [localAttributes, setLocalAttributes] = React.useState<TClassAttribute[]>([])
    const [performDelete, setPerformDelete] = React.useState(false)

    const [localClassParents, setLocalClassParents] = React.useState<{ [id: string]: number }>({})
    const [localClassChildren, setLocalClassChildren] = React.useState<{ [id: string]: number }>({})

    const [newClassChildren, newLocalClassChildren] = React.useState<{ [id: string]: number }>({})
    const [newClassParents, newLocalClassParents] = React.useState<{ [id: string]: number }>({})


    const s_class = classState.classes.find(x => x.id === props.window.model_pk)

    const addAttribute = () => {
        const name = Date.now()
        const new_attribute: TClassAttribute = {
            name: name + '',
            related_class: props.window.model_pk
        }
        dispatch(createClassAttribute(new_attribute))
    }

    const addObject = () => {
        const name = Date.now()
        const new_object: TObject = {
            name: name + '',
            parent_class: s_class.id
        }
        dispatch(createObject(new_object))
    }

    React.useEffect(() => {
        if (classState.attributes.length && classState.attributes[0].related_class === props.window.model_pk)
            setLocalAttributes(classState.attributes)
    }, [classState.attributes])

    const deleteObj = () => {
        dispatch(closeWindow(props.window.id))
        setPerformDelete(true)
    }

    React.useEffect(() => {
        const parents = relationState.class_relations.filter(r => r.child === s_class.id)
        const children = relationState.class_relations.filter(r => r.parent === s_class.id)

        var localParents = {}
        parents.map(rel => {
            const name = relationState.relations.find(r => r.id === rel.relation).name
            if (localParents.hasOwnProperty(name) === false) localParents[name] = []
            localParents[name] = [...localParents[name], rel.parent]
        })

        var localChildren = {}
        children.map(rel => {
            const name = relationState.relations.find(r => r.id === rel.relation).name
            if (localChildren.hasOwnProperty(name) === false) localChildren[name] = []
            localChildren[name] = [...localChildren[name], rel.child]
        })

        setLocalClassChildren(localChildren)
        setLocalClassParents(localParents)

    }, [relationState.class_relations])



    const save = () => {
        setPerformSave(true)
    }
    return (
        <>
            <div className='window-control-panel'>
                <button onClick={save}><i className="fas fa-save"></i></button>
                <button onClick={deleteObj}><i className="fas fa-trash"></i></button>
            </div>
            <div className='model-form'>
                <ClassForm class={s_class} corpusId={s_class.corpus} saveTrigger={performSave} onComplete={() => { setPerformDelete(false); setPerformSave(false) }} deleteTrigger={performDelete} />
            </div>
            <p className='window-line'>Объекты класса: <button className='window-add' onClick={() => { addObject() }}><i className="fas fa-plus"></i></button></p>
            <div className='window-placeholder'>
                {objectState.objects.map(obj => {
                    if (obj.parent_class === s_class.id) {
                        const pin: TPin = {
                            model_pk: obj.id,
                            name: obj.name,
                            model_name: 'object'
                        }
                        return <Pin pin={pin} />
                    }
                })}
            </div>
            <p className='window-line'>Атрибуты класса: <button className='window-add' onClick={() => { addAttribute() }}><i className="fas fa-plus"></i></button></p>
            <div className='window-placeholder'>
                {localAttributes.map(attr => {
                    const pin: TPin = {
                        model_pk: attr.id,
                        name: attr.name,
                        model_name: 'class_attribute'
                    }
                    return <Pin pin={pin} />
                })}
            </div>
            {/* <p className='window-line'>Отношения: <button className='window-add' onClick={() => { }}><i className="fas fa-plus"></i></button></p>
            <div className='window-placeholder'>
                {localAttributes.map(attr => {
                    const pin: TPin = {
                        model_pk: attr.id,
                        name: attr.name,
                        model_name: 'class_attribute'
                    }
                    return <Pin pin={pin} />
                })}
            </div> */}


        </>
    )
};

export default ClassWindow;
