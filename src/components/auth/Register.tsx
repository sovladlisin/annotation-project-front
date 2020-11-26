import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth/auth';
import { RootStore } from '../../store';
import { Link, Redirect } from 'react-router-dom'
import { createAlert } from '../../actions/alerts/alerts';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const dispatch = useDispatch()
    const userState = useSelector((state: RootStore) => state.auth.user)

    const [userName, setUserName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')

    const submit = () => {
        if (password != password2) {
            dispatch(createAlert({ type: 500, message: 'Пароли не совпадают' }))
            return null
        }
        const newUser = {
            username: userName,
            password: password,
            email: email,
        };
        dispatch(register(newUser))
    }
    if (userState.token) return <Redirect to='/' />

    return <>
        <div className="auth">
            <p>Логин:</p>
            <input name="username" type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
            <p>Почта:</p>
            <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <p>Пароль:</p>
            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <p>Подтверждение пароля:</p>
            <input name="password2" type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} />
            <button type="submit" onClick={submit}>Создать аккаунт</button>
            <Link to="/login">У меня уже есть аккаунт</Link>
        </div>
    </>
};

export default Register
