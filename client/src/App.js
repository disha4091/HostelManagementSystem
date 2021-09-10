import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar'
import RegisterPage from './RegisterPage/RegisterPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext,AuthProvider } from './auth';
function App() {
 
  return (
    <div className="App">
        <AuthProvider>
          <Router>
            <Navbar/>
            <Switch>
              <Route path="/login" component={RegisterPage} />
              
            </Switch>
            
          </Router>
        </AuthProvider>
      </div>
    
  );
}

export default App;