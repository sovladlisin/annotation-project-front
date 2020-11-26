import ts from "typescript";
import { RouteComponentProps } from 'react-router-dom'

import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import { createMarkup, getEntities, getMarkups, getResources, getResourceTexts, updateCommentary } from "../../actions/models/resourses/resources";
import { TEntity, TMarkup, TResource, TResourceText } from "../../actions/models/resourses/types";
import CommentaryInfo, { TComment } from "./CommentaryInfo";
import { buildTree, TPin } from "../../utils";
import Pin from "./Pin";
import { getClasses } from "../../actions/models/classes/classes";
import { getObjects } from "../../actions/models/objects/objects";
import { createWindow } from "../../actions/windows/windows";
import { TObject } from "../../actions/models/objects/types";
import { TClass } from "../../actions/models/classes/types";
import { getLinks } from "../../actions/models/relations/relations";
import TreeNode from "../utils/TreeNode";
import Tree from "../utils/Tree";

interface IWorkspaceProps {
    pk: string
}

type TLocalEntity = {
    pos_start: number,
    pos_end: number,
    obj: TObject,
    class: TClass
}

type TLocalLink = {
    obj_pk: number,
    link_name: string
}


const Workspace: React.FunctionComponent<IWorkspaceProps> = ({ match }: RouteComponentProps<IWorkspaceProps>) => {
    const dispatch = useDispatch()
    const resourceState = useSelector((state: RootStore) => state.resources)
    const primeState = useSelector((state: RootStore) => state)
    const pk: number = parseInt(match.params.pk)

    const [originalText, setOriginalText] = React.useState<string[]>([])
    const [translatedText, setTranslatedText] = React.useState<string[]>([])
    const [commentary, setCommentary] = React.useState<TComment[]>([])

    const [commentsChanged, setCommentsChanged] = React.useState(false)

    const [markups, setMarkups] = React.useState<TMarkup[]>([])
    const [selectedMarkup, setSelectedMarkup] = React.useState<TMarkup>(null)
    const [currentEntities, setCurrentEntities] = React.useState<TLocalEntity[]>([])

    const [numberOfLines, setNumberOfLines] = React.useState(50)
    const [pageNumber, setPageNumber] = React.useState(1)

    const [selectedComment, setSelectedComment] = React.useState<TComment>(null)
    const [hoveredObject, setHoveredObject] = React.useState<number>(null)

    const [colorParents, setColorParents] = React.useState<TLocalLink[]>([])
    const [colorChildren, setColorChildren] = React.useState<TLocalLink[]>([])

    const [currentResource, setCurrentResource] = React.useState<TResource>(null)

    React.useEffect(() => {
        dispatch(getResources())
        dispatch(getClasses())
        dispatch(getObjects())
        dispatch(getEntities())
        dispatch(getResourceTexts())
        dispatch(getMarkups())
    }, [])

    React.useEffect(() => {
        setCurrentResource(primeState.resources.resources.find(r => r.id === pk))
    }, [primeState.resources.resources])


    React.useEffect(() => {
        const info: TResourceText = resourceState.texts.find(rt => rt.resource === pk)

        fetch(info.original).then((r) => r.text()).then(text => {
            setOriginalText(text.split('\n'))
        })
        fetch(info.translation).then((r) => r.text()).then(text => {
            setTranslatedText(text.split('\n'))
        })
        fetch(info.commentary).then((r) => r.text()).then(text => {
            var i = -1
            setCommentary(text.split('\n').map(c => {
                i = i + 1
                return { position: i, text: c }
            }))
        })
    }, [resourceState.texts])

    React.useEffect(() => {
        const markups: TMarkup[] = resourceState.markups.filter(m => m.text === pk)
        setMarkups(markups)
        if (markups.length != 0)
            setSelectedMarkup(markups[0])
    }, [resourceState.markups])


    React.useEffect(() => {
        if (selectedMarkup === null) return null
        setCurrentEntities(resourceState.entities.filter(en => en.markup === selectedMarkup.id).map(en => {
            const obj: TObject = primeState.objects.objects.find(o => en.obj === o.id)
            if (obj === undefined) return null
            const s_class: TClass = primeState.classes.classes.find(c => c.id === obj.parent_class)
            return {
                pos_start: en.position_start,
                pos_end: en.position_end,
                obj: obj,
                class: s_class
            }
        }))
    }, [selectedMarkup])

    React.useEffect(() => {
        if (hoveredObject === null) {
            console.log('OUT')
            return null
        }
        dispatch(getLinks(hoveredObject, 'object'))
    }, [hoveredObject])

    React.useEffect(() => {
        const links = primeState.relations.links
        if (Object.keys(links).length === 0) return null
        if (links['model_name'] != 'object') return null
        if (links['model_pk'] != hoveredObject) return null

        console.log(links['parents'], links['children'])
        const parents = links['parents']
        const new_parents: TLocalLink[] = []
        Object.keys(parents).map(key => {
            const items = parents[key]
            items.map(item => {
                if (item.model_name === 'object')
                    new_parents.push({ link_name: key, obj_pk: item.model_pk })
            })
        })

        const children = links['children']
        const new_children: TLocalLink[] = []
        Object.keys(children).map(key => {
            const items = children[key]
            items.map(item => {
                if (item.model_name === 'object')
                    new_children.push({ link_name: key, obj_pk: item.model_pk })
            })
        })

        setColorChildren(new_children)
        setColorParents(new_parents)
    }, [primeState.relations.links])


    const renderNavBar = () => {
        return <>
            <div className='nav-bar'>
                <p>Страница: </p>
                <input type="number" min="1" step="1" value={pageNumber} onChange={(e) => setPageNumber(parseInt(e.target.value))} />
                <p>Число строк на странице: </p>
                <input type="number" min="1" step="1" value={numberOfLines} onChange={(e) => setNumberOfLines(parseInt(e.target.value))} />
                <p>Всего строк: </p>
                <p>{originalText.length}</p>
            </div>
        </>
    }


    const renderText = () => {
        var start = (pageNumber - 1) * numberOfLines
        const end = start + numberOfLines

        const original_text = originalText.slice(start, end);
        const translated_text = translatedText.slice(start, end);
        const commentary_text = commentary.slice(start, end);

        var i = -1
        start -= 1

        const transfer = (e, start, end, text) => {
            const entity: TEntity = {
                obj: -1,
                position_start: start,
                position_end: end,
                markup: selectedMarkup.id,
                text: text
            }
            e.dataTransfer.setData('entity', JSON.stringify(entity))
        }

        return original_text.map(_ => {
            i += 1
            start += 1
            const comment: TComment = commentary_text[i]

            const pos_start = start
            const pos_finish = start
            const text = original_text[i]

            const c_e = currentEntities.find(ce => ce.pos_start === pos_start && pos_finish === pos_finish)

            const renderIndex = () => {
                if (c_e)
                    return <p
                        className='line-index'
                        onDragStart={(e) => transfer(e, pos_start, pos_finish, text)}
                        draggable
                        onMouseOver={() => setHoveredObject(c_e.obj.id)}
                        onMouseLeave={() => { setHoveredObject(null); setColorChildren([]); setColorParents([]) }}
                        style={{ background: '#20967c', color: 'white' }}
                        onClick={() => dispatch(createWindow({ id: Date.now(), title: c_e.obj.name, model_name: 'object', model_pk: c_e.obj.id, is_hidden: false }))}
                    >
                        {start}
                        <p className='extra-line-info'>
                            Объект: {c_e.obj.name} , Класс: {c_e.class.name}
                        </p>
                    </p>
                return <p
                    className='line-index'
                    onDragStart={(e) => transfer(e, pos_start, pos_finish, text)}
                    draggable
                >
                    {start}
                </p>
            }

            var style = {}
            var message = ''
            var p_relations = null
            var c_relations = null

            if (c_e && hoveredObject) {
                p_relations = colorParents.filter(cp => cp.obj_pk === c_e.obj.id).map(cp => {
                    return <span className='parent'>{cp.link_name}</span>
                })
                c_relations = colorChildren.filter(cp => cp.obj_pk === c_e.obj.id).map(cp => {
                    return <span className='child'>{cp.link_name}</span>
                })

            }

            return <div className='text-line'>
                <div className='main-line' style={style}>
                    {renderIndex()}
                    <p>{original_text[i]}</p>
                    <p>{translated_text[i]}</p>
                </div>
                <button style={comment && comment.text.length > 1 ? { color: '#232d41' } : {}} onClick={() => setSelectedComment(comment)}><i className='fas fa-comment'></i></button>
                <p className='link-line-info'>{p_relations} {c_relations}</p>
            </div>
        })
    }



    return (<>
        <div className='text-editor'>
            <p>Текст:</p>
            {currentResource && <div className='resource-pin-container'><Pin pin={{ model_name: 'resource', model_pk: currentResource.id, name: currentResource.title }} /></div>}
            {currentResource && <>
                <p>Классы:</p>
                <div>
                    <div className='tree'>
                        <Tree model_name='class' tree_data={buildTree(primeState.classes.classes.filter(c => c.corpus === currentResource.corpus))} />
                    </div>
                </div>
            </>}
            <p>Разметки:</p>
            <div className='markups'>
                {markups.map(m => {
                    const pin: TPin = {
                        model_name: 'markup',
                        model_pk: m.id,
                        name: m.name,
                    }
                    return <div className='markup-highlight' style={selectedMarkup.id === m.id ? { background: '#ff6766' } : {}}>
                        <Pin pin={pin} onClick={() => setSelectedMarkup(m)} />
                    </div>
                })}
                <button id='add-markup' onClick={() => { dispatch(createMarkup({ name: "" + Date.now(), text: pk })) }}><i className='fas fa-plus'></i></button>
            </div>
            <div className='text-container'>
                {renderNavBar()}
                {renderText()}
                {renderNavBar()}
            </div>
        </div>
        {selectedComment && <CommentaryInfo onSave={(comm: TComment) => { setCommentsChanged(true); setCommentary(commentary.map(c => c.position === comm.position ? comm : c)) }} comment={selectedComment} onClose={() => setSelectedComment(null)} />}
        {commentsChanged && <button id='save-comments' onClick={() => { dispatch(updateCommentary(commentary, pk)); setCommentsChanged(false) }}>Сохранить комментарии</button>}
    </>);
};

export default Workspace;
