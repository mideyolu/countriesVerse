import React from "react";
import { HomePage,Country, DarkMode, Header, AllCountries, CountryDetails } from "./Component/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <section className="App">
          <div className="header container">
            <Header title="Where in The World" />
            <DarkMode />
          </div>
        </section>

        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/countries" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CountryDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
