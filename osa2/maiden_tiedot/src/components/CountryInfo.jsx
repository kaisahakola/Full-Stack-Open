const CountryInfo = ({ country }) => {

    const setLanguages = []

    for (const languageCode in country.languages) {
        if (country.languages.hasOwnProperty(languageCode)) {
            setLanguages.push(country.languages[languageCode])
        }
    }

    return (
        <>
            <h3>{country.name.common}</h3>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <br />
            <p className="languageTitle">languages:</p>
            <ul>
                {setLanguages.map((language, index) => {
                    return <li key={index}>{language}</li>
                })}
            </ul>
            <img src={country.flags.png} alt="country flag" />
        </>
    )
}

export default CountryInfo