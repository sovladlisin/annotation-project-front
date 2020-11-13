import * as React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth/auth';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const dispatch = useDispatch()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  return <>
    <p>Логин:</p>
    <input name="username" type="text" onChange={(e) => { setUsername(e.target.value) }} value={username} />
    <p>Пароль:</p>
    <input name="password" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
    <button onClick={() => { dispatch(login(username, password)) }}>Войти</button>
  </>;
};

export default Login;
