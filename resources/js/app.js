import React from 'react';
import ReactDOM from 'react-dom';
import  "bootstrap/dist/css/bootstrap.css";
import CarList from './components/CarList.component';
import EditCarPage from './components/edit-CarPage.component';
import {
    BrowserRouter as Router,  Route,
    Switch,
  } from "react-router-dom";
function App() {
    return (
        <Router >
        <Switch>
            <Route exact path="/" ><CarList /></Route>
            <Route path="/cars/:id/edit" component={EditCarPage}/> {/*dung cach khai bao Route nay de lay id param bằng câu lệnh this.props.match.params.id*/}
        </Switch>
     </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
