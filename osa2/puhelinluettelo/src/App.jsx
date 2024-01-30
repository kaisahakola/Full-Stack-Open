import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isMessageVisible, setIsMessageVisible] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  useEffect(() => {
    personServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        personServices.updatePerson(personToUpdate.id, {...personToUpdate, number: newNumber})
          .then(updatedPerson => {
              console.log(updatedPerson)
              setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
              
              setSuccessMessage('Person updated succesfully')
              setIsMessageVisible(true)
              setTimeout(() => {
                setSuccessMessage(null)
                setIsMessageVisible(false)
              }, 5000)
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setErrorMessage('Person was already deleted')
              setIsErrorVisible(true)
              setTimeout(() => {
                setErrorMessage(null)
                setIsErrorVisible(false)
              }, 5000)
            }
          })
      }

    } else {

      const personObj = {
        name: newName,
        number: newNumber
      }

      personServices.addPerson(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setSuccessMessage('New person added succesfully')
          setIsMessageVisible(true)
          setTimeout(() => {
            setSuccessMessage(null)
            setIsMessageVisible(false)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personServices.deletePerson(id)
        .then(deletedPerson => {
          console.log(`${deletedPerson.name} deleted`)
          setPersons(persons.filter(p => p.id !== id))

          setSuccessMessage('Person deleted succesfully')
          setIsMessageVisible(true)
          setTimeout(() => {
            setSuccessMessage(null)
            setIsMessageVisible(false)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    // console.log(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={succesMessage} isVisible={isMessageVisible} />
      <ErrorMessage message={errorMessage} isVisible={isErrorVisible} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <Form 
        handleSubmit={addNewPerson} 
        handleChanges={[handleNameChange, handleNumberChange]}
        inputValues={[newName, newNumber]} 
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App