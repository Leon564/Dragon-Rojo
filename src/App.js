import logo from './logo.svg';
import './App.css';
import Layout from './components/layout';
import Form from './components/form';

function App() {
  return (
    <div className="App">
      <Layout children={Form()}/>
      </div>
  );
}

export default App;
