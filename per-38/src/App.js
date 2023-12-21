import logo from './logo.svg';
import './App.css';
import Header from './header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import FranceMap from './mapManagement/map';
import data from './mapManagement/updated_cities.json';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <div>
      {/* <div className="app-container"> */}
      <h1>Responses per University in France</h1>
      <FranceMap data={data.cities} />
    </div>    </div>

    // </div>
  );
}

export default App;
