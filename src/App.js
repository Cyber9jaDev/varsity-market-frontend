import React from 'react';
import RouterLinks from './Routes';
import { Toaster } from 'react-hot-toast';
// import { useAppContext } from './contexts/AppContext';
// import { SET_CURRENT_USER } from './contexts/Actions';

function App() {
  return (
    <main className="App">
      <Toaster position="top-right" />
      <RouterLinks />
    </main>
  );
}

export default App;
