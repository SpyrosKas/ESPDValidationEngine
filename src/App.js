import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import XmlVal from "./components/pages/xmlVal/XmlVal";
import DatAcc from "./components/pages/dataAcc/DatAcc";
import DatPer from "./components/pages/dataPer/DatPer";
import CardXmlVal from "./components/CardXmlVal";
import CardDataAcc from "./components/CardDataAcc";
import CardDataPer from "./components/CardDataPer";

import "./App.css";

const Landing = () => {
  return (
    <div className="container-01">
      <CardXmlVal />

      <CardDataAcc />

      <CardDataPer />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route
              // exact
              path="/xmlval"
              component={XmlVal}
            />
            <Route path="/datacc" component={DatAcc} />
            <Route path="/datper" component={DatPer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
