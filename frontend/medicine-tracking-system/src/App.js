import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Add from "./components/Add";
import MedicineDetails from "./components/MedicineDetails";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Inventory} exact />
        <Route path="/add" component={Add} />
        <Route path="/:name" component={MedicineDetails} />
      </Switch>
    </div>
  );
}

export default App;
