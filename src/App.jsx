
import React from 'react';
import { Provider } from 'react-redux';
import {store} from './store';
import Calendar from './components/Calendear';
import Header from './components/Header';

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-screen-lg mx-auto p-4">
        <Header />
        {/* <Calendar /> */}
      </div>
    </Provider>
  );
};

export default App;
