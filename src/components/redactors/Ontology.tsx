import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../actions/models/authors/authors';
import { getClasses } from '../../actions/models/classes/classes';
import { addCorpusAuthor, addCorpusPlace, deleteCorpus, deleteCorpusAuthor, deleteCorpusPlace, getCorpusAuthors, getCorpusClasses, getCorpuses, getCorpusObjects, getCorpusPlaces, getCorpusResources } from '../../actions/models/corpuses/corpuses';
import { TCorpus } from '../../actions/models/corpuses/types';
import { getObjects } from '../../actions/models/objects/objects';
import { getPlaces } from '../../actions/models/places/places';
import { getRelations } from '../../actions/models/relations/relations';
import { deleteResource, getEntities, getMarkups, getResources, getResourceTexts, getResourceTypes } from '../../actions/models/resourses/resources';
import { TResourceType } from '../../actions/models/resourses/types';
import objectReducer from '../../reducers/models/objects';
import { RootStore } from '../../store';
import { buildTree, getPrimeCorpusParent, TPin } from '../../utils';
import Pin from '../layout/Pin';
import Tree from '../utils/Tree';
import TreeNode from '../utils/TreeNode';
import AddContainer from './AddContainer';
import UploadDocx from './UploadDocx';

interface IOntologyProps {
}

const stylePressed = {
    background: '#232d41',
    color: 'white'
}

const Ontology: React.FunctionComponent<IOntologyProps> = (props) => {
    const dispatch = useDispatch()
    const primeState = useSelector((state: RootStore) => state)
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const placeState = useSelector((state: RootStore) => state.places)
    const authorState = useSelector((state: RootStore) => state.authors)
    const classState = useSelector((state: RootStore) => state.classes)
    const relationState = useSelector((state: RootStore) => state.relations)
    const resourceState = useSelector((state: RootStore) => state.resources)
    const [selectedCorpusId, setSelectedCorpusId] = React.useState<number>(null)
    const [selectedCorpus, setSelectedCorpus] = React.useState<TCorpus>(null)
    const [selectedModel, setSelectedModel] = React.useState<string>('')
    const [corpusView, setCorpusView] = React.useState(true)
    const [corpusOntologyOptions, setCorpusOntologyOptions] = React.useState('')

    const [uploadDocx, setUploadDocx] = React.useState(false)

    const [selectedResourceType, setSelectedResourceType] = React.useState<TResourceType>(null)

    const [searchPlace, setSearchPlace] = React.useState('')
    const [searchAuthor, setSearchAuthor] = React.useState('')
    const [searchResource, setSearchResource] = React.useState('')
    const [searchResourceType, setSearchResourceType] = React.useState('')
    const [searchRelationType, setSearchRelationType] = React.useState('')

    React.useEffect(() => {
        dispatch(getCorpuses())
        dispatch(getAuthors())
        dispatch(getPlaces())
        dispatch(getResources())
        dispatch(getClasses())
        dispatch(getObjects())
        dispatch(getRelations())
        dispatch(getResourceTypes())
        dispatch(getResourceTexts())
        dispatch(getMarkups())
        dispatch(getEntities())
    }, [])
    React.useEffect(() => {
        setSelectedCorpus(corpusState.corpuses.filter(c => c.id === selectedCorpusId)[0])
        dispatch(getCorpusAuthors(selectedCorpusId))
        dispatch(getCorpusPlaces(selectedCorpusId))
    }, [selectedCorpusId, placeState.places, authorState.authors, resourceState.resource, classState.classes])

    React.useEffect(() => {
        if (selectedResourceType != null) return null
        if (primeState.resources.types.length === 0) return null
        setSelectedResourceType(primeState.resources.types[0])
    }, [primeState.resources.types])

    const selectedOptionClass = {
        background: '#232d41',
        color: 'white'
    }
    return <>
        <div className='ontology-view-selector'>
            <button style={corpusView ? stylePressed : {}} onClick={() => setCorpusView(true)}>Дерево корпусов</button>
            <button style={!corpusView ? stylePressed : {}} onClick={() => setCorpusView(false)}>{selectedCorpus ? 'Онтология копуса: ' + selectedCorpus.name : 'Выберите корпус в дереве'}</button>
        </div>
        <div className='container'>
            {corpusView ?
                <div className="corpus-view">
                    <div className='corpus-tree'>
                        <button className='create-entity' onClick={() => setSelectedModel('corpus')}><i className='fas fa-plus'></i></button>
                        <Tree onClick={(id: number) => setSelectedCorpusId(id)} model_name='corpus' tree_data={buildTree(corpusState.corpuses)} />
                    </div>
                    {selectedCorpus &&
                        <div className='selected-corpus'>
                            <div className='corpus-info'>
                                <label>Название</label><p>{selectedCorpus.name}</p>
                                <label>Язык</label><p>{selectedCorpus.language}</p>
                                <label>ID Родителя</label><p>{selectedCorpus.parent}</p>
                                <label>Диалект</label><p>{selectedCorpus.dialect}</p>
                                <label>Дополнительная инф.</label><p>{selectedCorpus.extras}</p>
                            </div>
                            <div className='corpus-connections'>
                                <p className='corpus-connections-title'>Авторы</p>
                                <div className='corpus-connections-entities'
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        const pin: TPin = JSON.parse(e.dataTransfer.getData("pin"))
                                        if (pin.model_name != 'author') return null
                                        if (corpusState.corpus_authors.map(a => a.id).includes(pin.model_pk)) return null
                                        dispatch(addCorpusAuthor(selectedCorpusId, pin.model_pk))
                                    }}
                                >
                                    {corpusState.corpus_authors && corpusState.corpus_authors.map(a => {
                                        const pin: TPin = {
                                            model_pk: a.id,
                                            name: a.initials + ' ' + a.name,
                                            model_name: 'author'
                                        }
                                        return <Pin pin={pin} onDelete={() => dispatch(deleteCorpusAuthor(selectedCorpusId, pin.model_pk))}></Pin>
                                    })}
                                </div>
                                <p className='corpus-connections-title'>Места</p>
                                <div className='corpus-connections-entities'
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        const pin: TPin = JSON.parse(e.dataTransfer.getData("pin"))
                                        if (pin.model_name != 'place') return null
                                        if (corpusState.corpus_places.map(a => a.id).includes(pin.model_pk)) return null
                                        dispatch(addCorpusPlace(selectedCorpusId, pin.model_pk))
                                    }}
                                >
                                    {corpusState.corpus_places && corpusState.corpus_places.map(a => {
                                        const pin: TPin = {
                                            model_pk: a.id,
                                            name: a.name,
                                            model_name: 'place'
                                        }
                                        return <Pin pin={pin} onDelete={() => dispatch(deleteCorpusPlace(selectedCorpusId, pin.model_pk))}></Pin>
                                    })}
                                </div>
                                <p className='corpus-connections-title'>Ресурсы</p>
                                <div className='corpus-connections-entities'>
                                    {primeState.resources.resources.filter(r => r.corpus === selectedCorpusId).map(a => {
                                        const pin: TPin = {
                                            model_pk: a.id,
                                            name: a.title,
                                            model_name: 'resource'
                                        }
                                        return <Pin pin={pin}></Pin>
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className='corpus-ontology'>
                    <div className='corpus-ontology-options'>
                        <p>Привязанное к корпусу:</p>
                        <button style={corpusOntologyOptions === 'classes' ? selectedOptionClass : {}} onClick={() => setCorpusOntologyOptions('classes')}>Классы</button>
                        <button style={corpusOntologyOptions === 'resources' ? selectedOptionClass : {}} onClick={() => setCorpusOntologyOptions('resources')}>Ресурсы</button>
                        <p>Общее:</p>
                        <button style={corpusOntologyOptions === 'places' ? selectedOptionClass : {}} onClick={() => setCorpusOntologyOptions('places')}>Места</button>
                        <button style={corpusOntologyOptions === 'authors' ? selectedOptionClass : {}} onClick={() => setCorpusOntologyOptions('authors')}>Авторы</button>
                        <button style={corpusOntologyOptions === 'relations' ? selectedOptionClass : {}} onClick={() => setCorpusOntologyOptions('relations')}>Типы связей</button>
                        <button style={corpusOntologyOptions === 'resourceTypes' ? selectedOptionClass : {}} onClick={() => setCorpusOntologyOptions('resourceTypes')}>Типы ресурсов</button>
                    </div>
                    <div className='corpus-ontology-content'>
                        {corpusOntologyOptions === 'classes' && <>
                            <div className='tree'>
                                <button className='create-entity' onClick={() => setSelectedModel('class')}><i className='fas fa-plus'></i></button>
                                <Tree model_name='class' tree_data={buildTree(primeState.classes.classes.filter(c => c.corpus === getPrimeCorpusParent(selectedCorpusId, primeState.corpuses.corpuses)))} />
                            </div>
                        </>}
                        {corpusOntologyOptions === 'places' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: ' value={searchPlace} onChange={(e) => setSearchPlace(e.target.value)}></input>
                                    <button className='create-entity' onClick={() => setSelectedModel('place')}><i className='fas fa-plus'></i></button>
                                    <div>
                                        {placeState.places.filter(p => p.name.toLowerCase().includes(searchPlace.toLowerCase())).map(place => {
                                            const pin: TPin = {
                                                model_pk: place.id,
                                                name: place.name,
                                                model_name: 'place'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        {corpusOntologyOptions === 'resources' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: ' value={searchResource} onChange={(e) => setSearchResource(e.target.value)}></input>
                                    <button className='create-entity' onClick={() => setSelectedModel('resource')}><i className='fas fa-plus'></i></button>
                                    <button className='upload-docx' onClick={() => setUploadDocx(true)}>Загрузить текст через DOCX документ</button>
                                    <div className='resource-type-filter'>
                                        {primeState.resources.types.map(rt => {
                                            return <button style={selectedResourceType.id === rt.id ? { background: '#20967c' } : {}} onClick={() => setSelectedResourceType(rt)}>{rt.name}</button>
                                        })}
                                    </div>
                                    <div>
                                        {selectedResourceType && primeState.resources.resources.filter(r => r.corpus === selectedCorpusId && r.resource_type === selectedResourceType.id && r.title.toLowerCase().includes(searchResource.toLowerCase())).map(res => {
                                            const pin: TPin = {
                                                model_pk: res.id,
                                                name: res.title,
                                                model_name: 'resource'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                        {selectedResourceType === null && primeState.resources.resources.filter(r => r.corpus === selectedCorpusId && r.title.toLowerCase().includes(searchResource.toLowerCase())).map(res => {
                                            const pin: TPin = {
                                                model_pk: res.id,
                                                name: res.title,
                                                model_name: 'resource'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        {corpusOntologyOptions === 'authors' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: ' value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)}></input>
                                    <button className='create-entity' onClick={() => setSelectedModel('author')}><i className='fas fa-plus'></i></button>
                                    <div>
                                        {authorState.authors.filter(a => a.surname.toLowerCase().includes(searchAuthor.toLowerCase())).map(author => {
                                            const pin: TPin = {
                                                model_pk: author.id,
                                                name: author.surname + ' ' + author.initials,
                                                model_name: 'author'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        {corpusOntologyOptions === 'relations' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: ' value={searchRelationType} onChange={(e) => setSearchRelationType(e.target.value)}></input>
                                    <button className='create-entity' onClick={() => setSelectedModel('relation')}><i className='fas fa-plus'></i></button>

                                    <div>
                                        {relationState.relations.filter(rt => rt.name.toLowerCase().includes(searchRelationType.toLowerCase())).map(rel => {
                                            const pin: TPin = {
                                                model_pk: rel.id,
                                                name: rel.name,
                                                model_name: 'relation'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        {corpusOntologyOptions === 'resourceTypes' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: ' value={searchResourceType} onChange={(e) => setSearchResourceType(e.target.value)}></input>
                                    <button className='create-entity' onClick={() => setSelectedModel('resourceType')}><i className='fas fa-plus'></i></button>

                                    <div>
                                        {resourceState.types.filter(rt => rt.name.toLowerCase().includes(searchResourceType.toLowerCase())).map(rel => {
                                            const pin: TPin = {
                                                model_pk: rel.id,
                                                name: rel.name,
                                                model_name: 'resourceType'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                </div>}
        </div>
        {uploadDocx && <UploadDocx onClose={() => setUploadDocx(false)} selectedCorpus={selectedCorpusId} />}
        <AddContainer model_name={selectedModel} corpus_id={selectedCorpusId} onClose={() => setSelectedModel('')} />
    </>;
};

export default Ontology;

