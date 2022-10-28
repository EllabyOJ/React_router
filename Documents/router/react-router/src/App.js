import './App.css';
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


class AppUser extends React.Component {
  state = {
    data: null,
    filter: ""
  };
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=500")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.results
        });
      });
  }
  render() {
    return (
      <div className="App">
        <input
          value={this.state.filter}
          onChange={e => {
            this.setState({
              filter: e.target.value
            });
          }}
        />

        {this.state.data &&
          this.state.data
            .filter(user => user.email.includes(this.state.filter))
            .map(user => (
              <div
                key={user.email}
                style={{
                  display: "inline-block"
                }}
              >
                <img src={user.picture.medium} alt='Avatar'/>
                <div>{user.email}</div>
              </div>
            ))}
      </div>
    );
  }
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="*" element={<Error />}/>
        <Route path="/user" element={<AppUser />}/>
      </Routes>
    </Router>
  );
}

export default App;
