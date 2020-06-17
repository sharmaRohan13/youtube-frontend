import React, { Component } from "react";
import Main from "./Container/main.jsx";
import Search from "./Container/Search.jsx";
import store from "./Store/store";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Youtube Search App</span>
        </nav>
        <br />
        <Provider store={store}>
          <Search />
        </Provider>
        <br />
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

// export default App;
