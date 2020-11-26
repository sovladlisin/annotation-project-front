import * as React from 'react';
import { useDispatch } from 'react-redux';
import { uploadDocx } from '../../actions/models/resourses/resources';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IUploadDocxProps {
    onClose: () => void,
    selectedCorpus: number
}

const UploadDocx: React.FunctionComponent<IUploadDocxProps> = (props) => {
    const [selectedFile, setSelectedFile] = React.useState<File>(null)
    const dispatch = useDispatch()
    const ref = React.useRef()
    useOnClickOutside(ref, () => {
        console.log('qwer')
        props.onClose()
    })

    const upload = () => {
        dispatch(uploadDocx(props.selectedCorpus, selectedFile))
        props.onClose()
    }
    return <>
        <div className='upload-doc-container' ref={ref}>
            <input onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept='docx' />
            <button onClick={upload}>Обработать документ</button>
        </div>
    </>;
};

export default UploadDocx;
