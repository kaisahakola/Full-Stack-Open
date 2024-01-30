import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'
import countryServices from './services/countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryServices.getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleButtonClick = (country) => {
    setFilter(country.name.common)
    setSelectedCountry(country)
  }

  const countriesToShow = allCountries.filter(c => c.name.common.toLowerCase().includes(filter))

  return (
    <>
      <Filter inputValue={filter} handleChange={handleFilterChange} />
      {filter === '' || countriesToShow.length >= 10 ? (
        <p>Too many matches. Specify another filter.</p>
      ) : countriesToShow.length === 1 ? (
        <Countries countries={countriesToShow} />
      ) : (
        <Countries countries={countriesToShow} handleButtonClick={handleButtonClick} />
      )}
      {selectedCountry && (
        <CountryInfo country={selectedCountry} />
      )}
    </>
  )
}

export default App
