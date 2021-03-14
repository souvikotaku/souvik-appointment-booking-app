import './App.css';
import React from "react";
import Register from "./component/Register";
import AdminRegister from "./component/AdminRegister";
import Loginpage from "./component/Loginpage";
import AdminLogin from "./component/AdminLogin";
import Dashboard from "./component/Dashboard";
import AdminDashboard from "./component/AdminDashboard";
import NewBooking from "./component/NewBooking";
import MyBooking from "./component/MyBooking";
import AllBooking from "./component/AllBooking";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function App() {

  return (
    <>
    <Router>

    <Switch>
      <Route path='/' exact component={Register}/>
      <Route path='/adminregister' component={AdminRegister}/>
      <Route path='/login' component={Loginpage}/>
      <Route path='/AdminLogin' component={AdminLogin}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/admindashboard' component={AdminDashboard}/>
      <Route path='/newbooking' component={NewBooking}/>
      <Route path='/mybooking' component={MyBooking}/>
      <Route path='/allbooking' component={AllBooking}/>
    </Switch>
    </Router>
    </>
  );
}

export default App;
