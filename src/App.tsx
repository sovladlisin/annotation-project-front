import * as React from 'react';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <><button onClick={()=>{alert('TEST')}}></button></>;
};

export default App;
