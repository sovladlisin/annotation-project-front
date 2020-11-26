import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth/auth';
import { RootStore } from '../../store';
interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const dispatch = useDispatch()
    const [libraryComponent, setLibraryComponent] = React.useState(false)
    const userState = useSelector((state: RootStore) => state.auth.user)
    return (
        <div className="header">
            <div><Link to="/"><p>Главная</p></Link></div>
            <div><button onClick={() => setLibraryComponent(!libraryComponent)}>Библиотека ресурсов</button></div>
            <div><Link to="/ontology"><p>Онтология</p></Link></div>
            {userState.token != null && userState.token.length === 0 && <div><Link to="/login"><p>Вход</p></Link></div>}
            {userState.token && userState.token.length > 0 && <div><button onClick={() => dispatch(logout())}><p>Выход</p></button></div>}
            {userState.token === null && <div><button onClick={() => dispatch(logout())}><p>Выход (неактив.)</p></button></div>}
            {userState.token && userState.token.length > 0 && <div><button><p>Текущий пользователь: {userState.user.username}</p></button></div>}
            {userState.token === null && <div><button><p>Текущий пользователь (неактив.): {userState.user.username}</p></button></div>}
        </div>
    )
};

export default Header;
