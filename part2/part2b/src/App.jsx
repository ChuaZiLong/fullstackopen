import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
      number: newNumber,
      id: persons.length.toString()
    }
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
        axios.put(`http://localhost:3001/persons/${i}`, {name: newName, number: newNumber, id: i})
        let personsCopy = [...persons]
        personsCopy[i] = {name: newName, number: newNumber, id: i}
        setPersons(personsCopy)
        setSuccessMessage(`${newName} added`)
        setTimeout(() => {setSuccessMessage(null)}, 5000)
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
    setSuccessMessage(`${newName} added`)
    setTimeout(() => {setSuccessMessage(null)}, 5000)
  }

  const deletePerson = (person) => {
    confirm(`Delete ${person.name}?`)
    axios.delete(`http://localhost:3001/persons/${person.id}`)
    setPersons(persons.filter(p => p.id !== person.id))
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
      <div>{persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <div>{person.name} {person.number} <button type='button' className='deletebtn' onClick={() => deletePerson(person)}>delete</button></div>)}</div>
    )
  }

  const Success = ({message}) => {
    if (message === null) {
      return null
    }
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Filter</h2>
      <Filter />
      <h2>Phonebook</h2>
      <Success message={successMessage}/>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons />
    </div>
  )
}

export default App