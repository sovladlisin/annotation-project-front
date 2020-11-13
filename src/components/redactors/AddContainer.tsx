import * as React from 'react';
import AuthorForm from '../forms/models/AuthorForm';
import ClassForm from '../forms/models/ClassForm';
import CorpusForm from '../forms/models/CorpusForm';
import ObjectForm from '../forms/models/ObjectForm';
import PlaceForm from '../forms/models/PlaceForm';

interface IAddContainerProps {
    model_name: string,
    corpus_id?: number
}

const AddContainer: React.FunctionComponent<IAddContainerProps> = (props) => {
    const [saveTrigger, setSaveTrigger] = React.useState(false)

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
            default:
                return <></>;
        }
    }


    const save = () => {
        setSaveTrigger(true)
    }

    return <>
        <div className='ontology-add-container'>
            {renderForm()}
            <button onClick={save}>Сохранить</button>
        </div>
    </>;
};

export default AddContainer;
