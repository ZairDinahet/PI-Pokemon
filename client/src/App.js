import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Form from './components/Form/Form.jsx';
import Detail from './components/Details/Detail.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path = '/'>
        <LandingPage/>
      </Route>
      <Route exact path = '/pokemons'>
        <Home/>
      </Route>
      <Route exact path = '/pokemons/create'>
        <Form/>
      </Route>
      <Route exact path = '/pokemons/:id'> 
        <Detail/>
      </Route>
      {/* <Route exact path = {'/'} component = {LandingPage}/>
      <Route exact path = {'/home'} component = {Home}/>
      <Route exact path = {'/create'} component = {CreatePokemon}/>
      <Route exact path = {'/pokemons/:id'} component = {Detail}/> */}
    </div>
  );
}

export default App;
