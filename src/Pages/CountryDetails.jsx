import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiUrl } from "../util/FetchCountries";
import { Loader } from "../Component/index";
import { Link } from "react-router-dom";
import Error from "../assets/images/Error.jpg";

const CountryDetails = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { countryName } = useParams();

  const getCountryByName = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/name/${countryName}`);
      if (res.status === 404) {
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
      console.log(data);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCountryByName();
  }, []);

  return (
    <section className="country-details">
      {isLoading && !error && <Loader />}
      {error && !isLoading && (
        <div className="error" style={{ color: "red" }}>
          <img src={Error} alt="ff" />

          <p>Check your Connection and Try Again</p>
        </div>
      )}
      <Link to="/" className="show-btn">
        <button className="back">Back</button>
      </Link>
      <>
        {countries?.map((place, index) => (
          <section className="country-info-container container">
            <div className="country-info-img">
              <img src={place.flags.png} alt={`${place.cca2}`} />
            </div>
            <section className="country-details">
              <div className="info-left">
                <h5>
                  Native Name:<span> {place.name.common}</span>
                </h5>
                <h5>
                  Population:
                  <span> {place.population.toLocaleString()}</span>
                </h5>
                <h5>
                  Region:<span>{place.region}</span>
                </h5>
                <h5>
                  Sub Region:&nbsp;<span> {place.subregion}</span>
                </h5>
                <h3>Continent:&nbsp;{place.continents}</h3>
                <h3>
                  Language:&nbsp;
                  {place.languages && (
                    <span>{`'${Object.values(place.languages)[0]}'`}</span>
                  )}
                </h3>
              </div>
            </section>
          </section>
        ))}

        <div className="border-country container">
          {countries.length > 0 && countries[0].borders ? (
            countries[0].borders.map((border) => (
              <Link to="/" className="show">
                {border}
              </Link>
            ))
          ) : (
            <>
              {" "}
              {!error && !isLoading && (
                <p className="border-name">No border Countries</p>
              )}
            </>
          )}
        </div>
      </>
    </section>
  );
};

export default CountryDetails;
