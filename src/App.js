import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import PostsApp from './components/';
import Styles from './components/layout/Styles';

function App() {
  return (
    <Provider store={store}>
      <Styles />
      <PostsApp />
    </Provider>
  );
}

export default App;
