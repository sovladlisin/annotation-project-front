import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWindow } from '../../actions/windows/types';
import { openWindow } from '../../actions/windows/windows';
import { RootStore } from '../../store';
import Window from './Window';

interface IWindowsManagerProps {
}

const WindowsManager: React.FunctionComponent<IWindowsManagerProps> = (props) => {
    const dispatch = useDispatch()
    const windowState = useSelector((state: RootStore) => state.windows.windows)
    const [windows, setWindows] = React.useState({})

    React.useEffect(() => {
        setWindows(windowState)
    }, [windowState])


    const renderWindows = () => {
        return Object.keys(windows).map(key => {
            if (windows[key] != undefined)
                return <Window window={windows[key]} />
        })
    }
    const renderHiddenWindows = () => {
        return Object.keys(windows).map(key => {
            if (windows[key] != undefined && windows[key].is_hidden)
                return <button className='hidden-window' onClick={() => { dispatch(openWindow(windows[key].id)) }}>{windows[key].title}</button>
        })
    }


    return (
        <>
            <div className='windows-container'>
                {renderWindows()}
            </div>
            <div className='hidden-windows-container'>
                {renderHiddenWindows()}
            </div>
        </>
    )

};

export default WindowsManager;
