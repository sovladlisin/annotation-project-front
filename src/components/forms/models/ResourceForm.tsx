import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runInNewContext } from 'vm';
import { createResource, deleteResource, updateResource } from '../../../actions/models/resourses/resources';
import { TResource } from '../../../actions/models/resourses/types';
import { TWindow } from '../../../actions/windows/types';
import { RootStore } from '../../../store';

interface IResourceFormProps {
    resource?: TResource,
    deleteTrigger: boolean,
    saveTrigger: boolean,
    onComplete: () => void,
    corpusId: number
}

const ResourceForm: React.FunctionComponent<IResourceFormProps> = (props) => {
    const dispatch = useDispatch()
    const authorState = useSelector((state: RootStore) => state.authors)
    const resourceState = useSelector((state: RootStore) => state.resources)
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const placeState = useSelector((state: RootStore) => state.places)
    const [title, setTitle] = React.useState(props.resource ? props.resource.title : "Не указано")
    const [title_origin, setTitleOrigin] = React.useState(props.resource ? props.resource.title_origin : "Не указано")
    const [resource_type, setResourceType] = React.useState(props.resource ? props.resource.resource_type : null)
    const [language, setLanguage] = React.useState(props.resource ? props.resource.language : "Не указано")
    const [dialect, setDialect] = React.useState(props.resource ? props.resource.dialect : "Не указано")
    const [speech, setSpeech] = React.useState(props.resource ? props.resource.speech : "Не указано")
    const [theme, setTheme] = React.useState(props.resource ? props.resource.theme : "Не указано")
    const [time_of_recording, setTimeOfRecording] = React.useState(props.resource ? props.resource.time_of_recording : "Не указано")

    const [place_of_recording, setPlaceOfRecording] = React.useState(props.resource ? props.resource.place_of_recording : null)
    const [author, setAuthor] = React.useState(props.resource ? props.resource.author : null)
    const [collector, setCollector] = React.useState(props.resource ? props.resource.collector : null)
    const [decryptor, setDecryptor] = React.useState(props.resource ? props.resource.decryptor : null)
    const [translator, setTranslator] = React.useState(props.resource ? props.resource.translator : null)
    const [translation_redactor, setTranslationRedactor] = React.useState(props.resource ? props.resource.translation_redactor : null)
    const [origin_redactor, setOriginRedactor] = React.useState(props.resource ? props.resource.origin_redactor : null)
    const [commentator, setCommentator] = React.useState(props.resource ? props.resource.commentator : null)

    const [published, setPublished] = React.useState(props.resource ? props.resource.published : "Не указано")
    const [variants, setVariants] = React.useState(props.resource ? props.resource.variants : "Не указано")
    const [place_of_storage, setPlaceOfStorage] = React.useState(props.resource ? props.resource.place_of_storage : "Не указано")
    const [areal, setAreal] = React.useState(props.resource ? props.resource.areal : "Не указано")
    const [extras, setExtras] = React.useState(props.resource ? props.resource.extras : "Не указано")
    const [link, setLink] = React.useState(props.resource ? props.resource.link : null) //?

    const [changeLink, setChangeLink] = React.useState(false)

    const [selectedFile, setSelectedFile] = React.useState<File>(null)

    const [selectedOriginal, setSelectedOriginal] = React.useState<File>(null)
    const [selectedTranslated, setSelectedTranslated] = React.useState<File>(null)
    const [selectedCommentary, setSelectedCommentary] = React.useState<File>(null)



    React.useEffect(() => {
        if (!props.deleteTrigger) return null
        dispatch(deleteResource(props.resource.id))
        props.onComplete()
    }, [props.deleteTrigger])


    React.useEffect(() => {
        if (props.saveTrigger) {

            const new_resource: TResource = {
                areal: areal,
                author: author,
                collector: collector,
                commentator: commentator,
                corpus: props.corpusId,
                decryptor: decryptor,
                dialect: dialect,
                extras: extras,
                language: language,
                title: title,
                title_origin: title_origin,
                origin_redactor: origin_redactor,
                place_of_recording: place_of_recording,
                published: published,
                resource_type: resource_type,
                speech: speech,
                theme: theme,
                time_of_recording: time_of_recording,
                translation_redactor: translation_redactor,
                translator: translator,
                variants: variants,
                place_of_storage: place_of_storage,
                id: props.resource ? props.resource.id : null,
            }
            console.log(new_resource)
            new_resource.id ? dispatch(updateResource(new_resource, selectedFile)) : dispatch(createResource(new_resource, selectedFile))
            props.onComplete()
        }
    }, [props.saveTrigger])

    const author_select = authorState.authors.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.surname + ' ' + item.initials}</option>
        )
    })

    const resource_type_select = resourceState.types.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })
    const place_select = placeState.places.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })

    const renderFileLink = () => {
        if (props.resource) {
            if (props.resource.resource_type === null) return null
            const type = resourceState.types.find(t => t.id === props.resource.resource_type)
            if (type && type.name === 'Текст') return renderTextLinks()
        }

        if (link && changeLink)
            return (
                <>
                    <label>Ссылка на файл</label>  <input id='file' type="file" name="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
                </>
            )
        if (link)
            return (
                <>
                    <label>Ссылка на файл</label> <div className='file-input'><a href={link}>Скачать файл</a> <button onClick={() => { setChangeLink(true) }}>Изменить</button></div>
                </>
            )
        return (
            <>
                <label>Ссылка на файл</label>  <input id='file' type="file" name="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
            </>
        )

    }

    const renderTextLinks = () => {
        const texts = resourceState.texts.find(t => t.resource === props.resource.id)
        if (texts === undefined)
            return (
                <>
                    <label>Ссылка на оригинал</label>  <input id='file' type="file" name="file" onChange={(e) => { setSelectedOriginal(e.target.files[0]) }} />
                    <label>Ссылка на перевод</label>  <input id='file' type="file" name="file" onChange={(e) => { setSelectedTranslated(e.target.files[0]) }} />
                    <label>Ссылка на комментарии</label>  <input id='file' type="file" name="file" onChange={(e) => { setSelectedCommentary(e.target.files[0]) }} />
                </>
            )
        return (
            <>
                <label>Ссылка на оригинал</label> <div className='file-input'><a href={texts.original}>Скачать файл</a> </div>
                <label>Ссылка на перевод</label> <div className='file-input'><a href={texts.translation}>Скачать файл</a> </div>
                <label>Ссылка на комментарии</label> <div className='file-input'><a href={texts.commentary}>Скачать файл</a></div>
            </>
        )

    }

    return <>
        <label>Корпус</label><p>{props.corpusId}</p>
        <label>Название</label> <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title} />
        <label>Название на национальном языке</label> <input onChange={(e) => setTitleOrigin(e.target.value)} type="text" name="title" value={title_origin} />
        <label>Язык</label> <input onChange={(e) => setLanguage(e.target.value)} type="text" name="language" value={language} />
        <label>Диалект</label> <input onChange={(e) => setDialect(e.target.value)} type="text" name="dialect" value={dialect} />
        <label>Говор</label> <input onChange={(e) => setSpeech(e.target.value)} type="text" name="speech" value={speech} />
        <label>Жанр </label> <input onChange={(e) => setTheme(e.target.value)} type="text" name="theme" value={theme} />
        <label>Время записи </label> <input onChange={(e) => setTimeOfRecording(e.target.value)} type="text" name="time_of_recording" value={time_of_recording} />
        <label>Опубликовано</label> <input onChange={(e) => setPublished(e.target.value)} type="text" name="published" value={published} />
        <label>Варианты </label> <input onChange={(e) => setVariants(e.target.value)} type="text" name="variants" value={variants} />
        <label>Место хранения, архивные данные </label> <input onChange={(e) => setPlaceOfStorage(e.target.value)} type="text" name="place_of_storage" value={place_of_storage} />
        <label>Ареал распространения </label> <input onChange={(e) => setAreal(e.target.value)} type="text" name="areal" value={areal} />
        <label>Дополнительно </label> <input onChange={(e) => setExtras(e.target.value)} type="text" name="extras" value={extras} />

        {/* manipulations */}
        {renderFileLink()}

        <label>Тип</label> <select onChange={(e) => setResourceType(parseInt(e.target.value))} name="resource_type" id="resource_type" value={resource_type}>
            <option value=""></option>
            {resource_type_select}
        </select>
        <label>Место записи </label>
        <select onChange={(e) => setPlaceOfRecording(parseInt(e.target.value))} name="author" id="author" value={author}>
            <option value=""></option>
            {place_select}
        </select>
        <label>Исполнитель</label>  <select onChange={(e) => setAuthor(parseInt(e.target.value))} name="author" id="author" value={author}>
            <option value=""></option>
            {author_select}
        </select>
        <label>Собиратель</label>  <select onChange={(e) => setCollector(parseInt(e.target.value))} name="collector" id="collector" value={collector}>
            <option value=""></option>
            {author_select}
        </select>
        <label>Расшифровка аудиозаписи</label>  <select onChange={(e) => setDecryptor(parseInt(e.target.value))} name="decryptor" id="decryptor" value={decryptor}>
            <option value=""></option>
            {author_select}
        </select>
        <label>Перевод на русский язык</label>  <select onChange={(e) => setTranslator(parseInt(e.target.value))} name="translator" id="translator" value={translator}>
            <option value=""></option>
            {author_select}
        </select>
        <label>Редактор перевода</label>  <select onChange={(e) => setTranslationRedactor(parseInt(e.target.value))} name="translation_redactor" id="translation_redactor" value={translation_redactor}>
            <option value=""></option>
            {author_select}
        </select>
        <label>Редактор национального текста</label>  <select onChange={(e) => setOriginRedactor(parseInt(e.target.value))} name="origin_redactor" id="origin_redactor" value={origin_redactor}>
            <option value=""></option>
            {author_select}
        </select>
        <label>Подготовка комментариев</label>  <select onChange={(e) => setCommentator(parseInt(e.target.value))} name="commentator" id="commentator" value={commentator}>
            <option value=""></option>
            {author_select}
        </select>
    </>;
};

export default ResourceForm;
