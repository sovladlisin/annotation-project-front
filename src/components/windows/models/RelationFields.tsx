import { stringify } from 'querystring';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from '../../../actions/alerts/alerts';
import { addLink, deleteLink, getLinks } from '../../../actions/models/relations/relations';
import { TNewLink } from '../../../actions/models/relations/types';
import { TWindow } from '../../../actions/windows/types';
import { RootStore } from '../../../store';
import { TPin } from '../../../utils';
import Pin from '../../layout/Pin';
import Selector from '../../redactors/Selector';

interface IRelationFieldsProps {
    window: TWindow
}

const RelationFields: React.FunctionComponent<IRelationFieldsProps> = (props) => {
    const dispatch = useDispatch()
    const relationState = useSelector((state: RootStore) => state.relations)
    const rootState = useSelector((state: RootStore) => state)

    const [localChildren, setLocalChildren] = React.useState({})
    const [localParents, setLocalParents] = React.useState({})

    React.useEffect(() => {
        dispatch(getLinks(props.window.model_pk, props.window.model_name))
    }, [])

    React.useEffect(() => {
        dispatch(getLinks(props.window.model_pk, props.window.model_name))
    }, [relationState.new_link])

    React.useEffect(() => {
        const links = relationState.links
        if (Object.keys(links).length === 0) return null
        if (links['model_name'] != props.window.model_name) return null
        if (links['model_pk'] != props.window.model_pk) return null
        setLocalParents(links['parents'])
        setLocalChildren(links['children'])
    }, [relationState.links])

    const addNewLink = (role: string, rel_name: string, model_pk: number, model_name: string) => {
        const rel_id = relationState.relations.find(r => r.name === rel_name).id
        const new_link: TNewLink = {
            relation: rel_id,
            parent_model_name: role === 'child' ? props.window.model_name : model_name,
            parent_model_pk: role === 'child' ? props.window.model_pk : model_pk,
            child_model_name: role === 'parent' ? props.window.model_name : model_name,
            child_model_pk: role === 'parent' ? props.window.model_pk : model_pk
        }

        dispatch(addLink(new_link))
    }

    const [relationChildSelector, setRelationChildSelector] = React.useState(false)
    const [relationParentSelector, setRelationParentSelector] = React.useState(false)

    const addItem = (e, role: string, rel_name: string) => {
        e.preventDefault()
        const pin: TPin = JSON.parse(e.dataTransfer.getData("pin"))
        if (pin.model_name === props.window.model_name && pin.model_pk === props.window.model_pk) {
            dispatch(createAlert({ message: 'Цикличная связь', type: 500 }))
            return null
        }
        addNewLink(role, rel_name, pin.model_pk, pin.model_name)
    }

    const getName = (model_name: string, model_pk: number): string => {
        switch (model_name) {
            case 'author':
                const author = rootState.authors.authors.find(i => i.id === model_pk)
                return author.surname + ' ' + author.initials
            case 'corpus':
                const corpus = rootState.corpuses.corpuses.find(i => i.id === model_pk)
                return corpus.name
            case 'class':
                const s_class = rootState.classes.classes.find(i => i.id === model_pk)
                return s_class.name
            case 'place':
                const place = rootState.places.places.find(i => i.id === model_pk)
                return place.name
            case 'object':
                const object = rootState.objects.objects.find(i => i.id === model_pk)
                return object.name
            case 'resource':
                const res = rootState.resources.resources.find(i => i.id === model_pk)
                return res.title
            default:
                return 'Ошибка имени'
        }
    }

    return (<>
        <p className='window-line' style={{ background: '#dcdcdc', color: 'black', marginTop: '5px' }}>Отношения:</p>
        <p className='window-line' style={{ background: '#E95678E6' }}>{'Связь (X => ' + props.window.title + ')'}<button className='window-add' onClick={() => setRelationParentSelector(true)}><i className="fas fa-plus"></i></button></p>
        {Object.keys(localParents).map(key => {
            const entry = localParents[key]
            return (<>
                <p className='window-line' style={{ background: '#dcdcdc', color: 'black', borderBottom: '3px solid #989494' }}>{'Связь (X ' + key + ' ' + props.window.title + ')'}</p>
                <div className='window-placeholder'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => addItem(e, 'parent', key)}
                >
                    {entry.map(rel => {
                        const pin: TPin = {
                            model_name: rel.model_name,
                            model_pk: rel.model_pk,
                            name: getName(rel.model_name, rel.model_pk)
                        }
                        return <Pin pin={pin} onDelete={() => dispatch(deleteLink(parseInt(rel.link_pk)))} />
                    })}
                </div>
            </>)
        })}
        <p className='window-line'>{'Связь (' + props.window.title + ' =>' + ' X)'} <button className='window-add' onClick={() => setRelationChildSelector(true)}><i className="fas fa-plus"></i></button></p>
        {Object.keys(localChildren).map(key => {
            const entry = localChildren[key]
            return (<>
                <p className='window-line' style={{ background: '#dcdcdc', color: 'black', borderBottom: '3px solid #989494' }}>{'Связь (' + props.window.title + ' ' + key + ' X)'}</p>
                <div className='window-placeholder'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => addItem(e, 'child', key)}
                >
                    {entry.map(rel => {
                        const pin: TPin = {
                            model_name: rel.model_name,
                            model_pk: rel.model_pk,
                            name: getName(rel.model_name, rel.model_pk)
                        }
                        return <Pin pin={pin} onDelete={() => dispatch(deleteLink(parseInt(rel.link_pk)))} />
                    })}
                </div>
            </>)
        })}

        {relationChildSelector &&
            <Selector
                options={
                    relationState.relations.map(r => { return { id: r.id, name: r.name } }).filter(r => !Object.keys(localChildren).includes(r.name))
                }
                onSelect={(id, name) => {
                    if (id === null) {
                        setRelationChildSelector(false)
                        return 0
                    }
                    var new_dict = { ...localChildren }
                    if (new_dict.hasOwnProperty(name) === false) new_dict[name] = []
                    setLocalChildren(new_dict)
                    setRelationChildSelector(false)
                }}
                model_name='relation'
            />}
        {relationParentSelector &&
            <Selector
                options={
                    relationState.relations.map(r => { return { id: r.id, name: r.name } }).filter(r => !Object.keys(localParents).includes(r.name))
                }
                onSelect={(id, name) => {
                    if (id === null) {
                        setRelationParentSelector(false)
                        return 0
                    }
                    var new_dict = { ...localParents }
                    if (new_dict.hasOwnProperty(name) === false) new_dict[name] = []
                    setLocalParents(new_dict)
                    setRelationParentSelector(false)
                }}
                model_name='relation'
            />}
    </>);
};

export default RelationFields;
