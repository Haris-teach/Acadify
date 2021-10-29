//================================ React Native Imported Files ======================================//

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

//================================ Local Imported Files ======================================//

import RootStack from './src/RootStack';
import ApiData from './redux/store/reducers/ApiData';

const rootReducer = combineReducers({
  ApiData: ApiData,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootStack />
      </PaperProvider>
    </Provider>
  );
};

export default App;
