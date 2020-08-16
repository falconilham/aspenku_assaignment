import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Store";
import "./App.css";

import Home from "./Screen/Home";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
