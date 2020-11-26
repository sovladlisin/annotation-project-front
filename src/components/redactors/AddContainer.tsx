import * as React from 'react';
import AuthorForm from '../forms/models/AuthorForm';
import ClassForm from '../forms/models/ClassForm';
import CorpusForm from '../forms/models/CorpusForm';
import ObjectForm from '../forms/models/ObjectForm';
import PlaceForm from '../forms/models/PlaceForm';
import RelationForm from '../forms/models/RelationForm';
import ResourceForm from '../forms/models/ResourceForm';
import ResourceTypeForm from '../forms/models/ResourceTypeForm';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IAddContainerProps {
    model_name: string,
    corpus_id?: number,
    onClose: () => void
}

const AddContainer: React.FunctionComponent<IAddContainerProps> = (props) => {
    const [saveTrigger, setSaveTrigger] = React.useState(false)

    const ref = React.useRef()
    useOnClickOutside(ref, () => { props.onClose() })

    const renderForm = () => {
        switch (props.model_name) {
            case 'author':
                return <AuthorForm deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'class':
                return <ClassForm corpusId={props.corpus_id} deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'object':
                return <ObjectForm corpusId={props.corpus_id} deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'place':
                return <PlaceForm deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'corpus':
                return <CorpusForm deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'relation':
                return <RelationForm deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'resourceType':
                return <ResourceTypeForm deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            case 'resource':
                return <ResourceForm corpusId={props.corpus_id} deleteTrigger={null} saveTrigger={saveTrigger} onComplete={() => setSaveTrigger(false)} />
            default:
                return <></>;
        }
    }


    const save = () => {
        setSaveTrigger(true)
    }

    return <>
        {props.model_name.length != 0 && <div className='ontology-add-container' ref={ref}>
            {renderForm()}
            {props.model_name.length && <button onClick={save}>Добавить</button>}
        </div>}
    </>;
};

export default AddContainer;
