import './App.css';
import {
  HashRouter
} from "react-router-dom";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Main } from './Pages/Main';

initializeIcons(/* optional base url */);

function App() {
  return (
    <HashRouter>
      <Main></Main>
    </HashRouter>
  );
}

export default App;
