import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { login } from './request/Request';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('test login', async () => {
    const res = await login('http://localhost:18080/api/v1/auth/login', 'admin', '1234561');
    console.log(await res.json());
});
