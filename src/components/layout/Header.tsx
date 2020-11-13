import * as React from 'react';
import { Link } from 'react-router-dom'
interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const [libraryComponent, setLibraryComponent] = React.useState(false)

    return (
        <div className="header">
            <div><Link to="/"><p>Главная</p></Link></div>
            <div><button onClick={() => setLibraryComponent(!libraryComponent)}>Библиотека ресурсов</button></div>
            <div><Link to="/ontology"><p>Онтология</p></Link></div>
        </div>
    )
};

export default Header;
