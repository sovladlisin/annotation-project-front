import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../actions/models/authors/authors';
import { getClasses } from '../../actions/models/classes/classes';
import { deleteCorpus, getCorpusAuthors, getCorpusClasses, getCorpuses, getCorpusObjects, getCorpusPlaces, getCorpusResources } from '../../actions/models/corpuses/corpuses';
import { TCorpus } from '../../actions/models/corpuses/types';
import { getObjects } from '../../actions/models/objects/objects';
import { getPlaces } from '../../actions/models/places/places';
import { getClassRelation, getObjectRelation, getRelations } from '../../actions/models/relations/relations';
import { getResources } from '../../actions/models/resourses/resources';
import { RootStore } from '../../store';
import { buildTree, TPin } from '../../utils';
import Pin from '../layout/Pin';
import TreeNode from '../utils/TreeNode';
import AddContainer from './AddContainer';

interface IOntologyProps {
}

const stylePressed = {
    background: '#232d41',
    color: 'white'
}

const Ontology: React.FunctionComponent<IOntologyProps> = (props) => {
    const dispatch = useDispatch()
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const placeState = useSelector((state: RootStore) => state.places)
    const authorState = useSelector((state: RootStore) => state.authors)
    const classState = useSelector((state: RootStore) => state.classes)
    const [selectedCorpusId, setSelectedCorpusId] = React.useState<number>(null)
    const [selectedCorpus, setSelectedCorpus] = React.useState<TCorpus>(null)
    const [corpusView, setCorpusView] = React.useState(true)
    const [corpusOntologyOptions, setCorpusOntologyOptions] = React.useState('')



    React.useEffect(() => {
        dispatch(getCorpuses())
        dispatch(getAuthors())
        dispatch(getPlaces())
        dispatch(getResources())
        dispatch(getClasses())
        dispatch(getObjects())
        dispatch(getRelations())
        dispatch(getObjectRelation())
        dispatch(getClassRelation())
    }, [])
    React.useEffect(() => {
        setSelectedCorpus(corpusState.corpuses.filter(c => c.id === selectedCorpusId)[0])
        dispatch(getCorpusAuthors(selectedCorpusId))
        dispatch(getCorpusClasses(selectedCorpusId))
        dispatch(getCorpusObjects(selectedCorpusId))
        dispatch(getCorpusPlaces(selectedCorpusId))
        dispatch(getCorpusResources(selectedCorpusId))
    }, [selectedCorpusId])


    React.useEffect(() => {
        dispatch(getCorpusClasses(selectedCorpusId))
    }, [classState.classes])

    return <>
        <div className='ontology-view-selector'>
            <button style={corpusView ? stylePressed : {}} onClick={() => setCorpusView(true)}>Дерево корпусов</button>
            <button style={!corpusView ? stylePressed : {}} onClick={() => setCorpusView(false)}>{selectedCorpus ? 'Онтология копуса: ' + selectedCorpus.name : 'Выберите корпус в дереве'}</button>
        </div>
        <div className='container'>
            {corpusView ?
                <div className="corpus-view">
                    <div className='corpus-tree'>
                        <TreeNode onClick={(id: number) => setSelectedCorpusId(id)} level={0} model_name='corpus' is_hidden={false} tree_data={buildTree(corpusState.corpuses)} />
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
                                <div className='corpus-connections-entities'>
                                    {corpusState.corpus_authors && corpusState.corpus_authors.map(a => {
                                        const pin: TPin = {
                                            model_pk: a.id,
                                            name: a.initials + ' ' + a.name,
                                            model_name: 'author'
                                        }
                                        return <Pin pin={pin}></Pin>
                                    })}
                                </div>
                                <p className='corpus-connections-title'>Места</p>
                                <div className='corpus-connections-entities'>
                                    {corpusState.corpus_places && corpusState.corpus_places.map(a => {
                                        const pin: TPin = {
                                            model_pk: a.id,
                                            name: a.name,
                                            model_name: 'place'
                                        }
                                        return <Pin pin={pin}></Pin>
                                    })}
                                </div>
                                <p className='corpus-connections-title'>Ресурсы</p>
                                <div className='corpus-connections-entities'>
                                    {corpusState.corpus_resources && corpusState.corpus_resources.map(a => {
                                        const pin: TPin = {
                                            model_pk: a.id,
                                            name: a.name,
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
                        <button onClick={() => setCorpusOntologyOptions('classes')}>Классы</button>
                        <p>Общее:</p>
                        <button onClick={() => setCorpusOntologyOptions('places')}>Места</button>
                        <button onClick={() => setCorpusOntologyOptions('authors')}>Авторы</button>
                    </div>
                    <div className='corpus-ontology-content'>
                        {corpusOntologyOptions === 'classes' && <>
                            <div className='tree'>
                                <TreeNode onClick={() => { }} level={0} model_name='class' is_hidden={false} tree_data={buildTree(corpusState.corpus_classes)} />
                            </div>
                            <AddContainer model_name='class' corpus_id={selectedCorpusId} />
                        </>}
                        {corpusOntologyOptions === 'places' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: '></input>
                                    <div>
                                        {placeState.places.map(place => {
                                            const pin: TPin = {
                                                model_pk: place.id,
                                                name: place.name,
                                                model_name: 'place'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                                <AddContainer model_name='place' />
                            </>
                        }
                        {corpusOntologyOptions === 'authors' &&
                            <>
                                <div className='entity-list'>
                                    <input placeholder='Поиск: '></input>
                                    <div>
                                        {authorState.authors.map(author => {
                                            const pin: TPin = {
                                                model_pk: author.id,
                                                name: author.surname + ' ' + author.initials,
                                                model_name: 'place'
                                            }
                                            return <Pin pin={pin}></Pin>
                                        })}
                                    </div>
                                </div>
                                <AddContainer model_name='author' />
                            </>
                        }
                    </div>

                </div>}
        </div>

    </>;
};

export default Ontology;
