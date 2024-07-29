import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    setPersons(persons.concat(nameObject))
    console.log(persons)

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
  }

  const Filter = () => {
    return (
      <div>filter shown with <form><div><input value={filter} onChange={handleFilterChange}/></div></form></div>
    )
  }

  const PersonForm = () => {
    return (
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }

  const Persons = () => {
    return (
      <div>{persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <div>{person.name} {person.number}</div>)}</div>
    )
  }

  return (
    <div>
      <h2>Filter</h2>
      <Filter />
      <h2>Phonebook</h2>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons />
    </div>
  )
}

export default App