import React from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import MainPanel from './components/MainPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <MainPanel />
    </div>
  );
}
initializeIcons();
export default App;
