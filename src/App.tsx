import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'; 

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Map, MarkersModal, ZoomToggle } from './components';
import store from './store';
import { MarkersStore, MarkerStoreContext } from './features/MarkersStore';
import { MarkersList } from './components/MarkersList/MarkersList';

function App() {
  return (
    <ReduxProvider store={store}>
      <MarkerStoreContext.Provider value={MarkersStore} >
        <div className="App">
          <Map />
          <ZoomToggle />
          <MarkersModal />
          <MarkersList />
        </div>
      </MarkerStoreContext.Provider>
    </ReduxProvider>
  );
}

export default App;
