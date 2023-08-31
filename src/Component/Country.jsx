import React, { useState, useEffect } from "react";
import { ApiUrl } from "../util/FetchCountries";
import Loader from "./Loader";
import { CountryCard, SearchBar } from "./index";
import { Link } from "react-router-dom";
import Error from "../assets/images/Error.jpg";
import FilterRegion from './FilterRegion'

const Country = ({ simplified }) => {
  const [countries, setCountries] = useState([]);
  const [defaultCountries, setDefaultCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 20;
  const [selectedRegion, setSelectedRegion] = useState(""); // New state for selected region

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${ApiUrl}/all`);

      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const data = await res.json();
      setCountries(data);
      setDefaultCountries(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  const getCountryByName = async (countryName) => {
    if (countryName.trim() === "") {
      setCountries(defaultCountries); // Reset to the default list
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/name/${countryName}`);

      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const filterCountriesByRegion = async (region) => {
    setIsLoading(true);

    try {
      let apiUrl = `${ApiUrl}/all`;
      if (region) {
        apiUrl = `${ApiUrl}/region/${region}`;
      }

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    filterCountriesByRegion(region);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const displayedCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="main-container container">
      {isLoading && <Loader />}
      {error && !isLoading && (
        <div>
          <div className="error" style={{ color: "red" }}>
            <img src={Error} alt="Error" />
            <p>Check your Connection and Try Again</p>
          </div>
          <Link to="/" className="show-btn">
            Go Back
          </Link>
        </div>
      )}
      {!error && (
        <>
          {simplified ? (
            <Link to="/countries" className="show-btn">
              Show More
            </Link>
          ) : (
            <>
              <Link to="/" className="show-btn">
                Back
              </Link>
              <SearchBar onSearch={getCountryByName} />

              <FilterRegion onRegionChange={handleRegionChange} />
            </>
          )}
          <section className="country-container">
            {displayedCountries.map((country, index) => (
              <Link to={`/country/${country.name.common}`} key={index}>
                <CountryCard country={country} />
              </Link>
            ))}
          </section>
          {!simplified && (
            <div className="pagination">
              {Array.from({
                length: Math.ceil(countries.length / countriesPerPage),
              }).map((_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Country;
