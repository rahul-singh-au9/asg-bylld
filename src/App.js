import {BrowserRouter,Route, Switch} from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import EditUser from "./components/users/EditShipment";
import User from "./components/users/Shipment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shipments/edit/:id" component={EditUser} />
        <Route exact path="/shipments/:id" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
