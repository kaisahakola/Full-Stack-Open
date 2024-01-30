import CountryInfo from "./CountryInfo"

const Countries = ({ countries, handleButtonClick }) => {

    if (countries.length === 1) {
        const country = countries[0]
        return (
            <>
                <CountryInfo country={country} />
            </>
        )
    } else {
        return (
            <>
                {countries.map(c => {
                    return (
                        <div key={c.name.official}>
                            {c.name.common} 
                            <button onClick={() => handleButtonClick(c)}>show</button>
                        </div>
                    )
                })}
            </>
        )
    }
}

export default Countries