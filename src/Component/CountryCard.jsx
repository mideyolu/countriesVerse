import React from "react";

const CountryCard = ({ country }) => {
  return (
    <section className="country-info">
      <section className="country-img">
        <img src={country.flags.png} alt="" />
      </section>
      <section className="content">
        <h3>Country:{country.name.common}</h3>
        <h3>Capital:{country.capital}</h3>
        <h3>Region: {country.region}</h3>
        <h3>
          Language:&nbsp;
          {country.languages && (
            <span>{`'${Object.values(country.languages)[0]}'`}</span>
          )}
        </h3>
        <h3>Population:{country.population.toLocaleString()}</h3>
      </section>
    </section>
  );
};

export default CountryCard;
