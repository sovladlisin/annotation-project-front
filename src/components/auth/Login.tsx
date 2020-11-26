import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth/auth';
import { RootStore } from '../../store';
import { Link, Redirect } from 'react-router-dom'
import Register from './Register';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const dispatch = useDispatch()
  const userState = useSelector((state: RootStore) => state.auth.user)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  if (userState.token) return <Redirect to='/' />
  return <div className='auth'>
    <p>Логин:</p>
    <input name="username" type="text" onChange={(e) => { setUsername(e.target.value) }} value={username} />
    <p>Пароль:</p>
    <input name="password" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
    <button onClick={() => { dispatch(login(username, password)) }}>Войти</button>
    <Link to="/register">У меня нет аккаунта</Link>

  </div>;
};

export default Login;
