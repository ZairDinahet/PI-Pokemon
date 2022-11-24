import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Form from './components/Form/Form.jsx';
import Edit from './components/Edit/Edit.jsx';
import Detail from './components/Details/Detail.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';

function App() {
  return (
    <div className="App">
      {/* <Route exact path = '/'>
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
      </Route> */}
      <Route exact path = {'/'} component = {LandingPage}/>
      <Route exact path = {'/pokemons'} component = {Home}/>
      <Route exact path = {'/pokemons/create'} component = {Form}/>
      <Route exact path = {'/pokemons/:id'} component = {Detail}/>
      <Route exact path = {'/pokemons/edit/:id'} component = {Edit}/>
    </div>
  );
}

export default App;
