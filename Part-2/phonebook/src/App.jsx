import { useState, useEffect } from 'react'
import dbService from './services/dbService'
import Notification from './components/Notification'

const Numbers = ({ persons, setPersons, setMessage, setCname }) => {
  const handleDelete = ({name, id}) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if(confirm) {
      dbService.remove(id)
        .then(res => {
          if(res == '200') {
            setCname('green');
            setMessage(`${name} deleted successfully`);
        } else {
          setCname('red');
          setMessage(`Information of ${name} has already been removed from the server`);
        }
            setTimeout(() => setMessage(null), 2000);
          setPersons(persons.filter(p => p.id !== id));
        })
    }
  }
  return (
    <div>
    <h2>Numbers</h2>
    { 
      persons.map(number => <p key={number.name}>{number.name}: {number.number} <button onClick={() => handleDelete(number)}>delete</button> </p>)
    }
    </div>
  )
}

const Filter = ({ search, setSearch, setFilteredPhBook, persons }) => {
  const handleSearch = (e) => {
    const subStr = e.target.value;
    setSearch(subStr);
    setFilteredPhBook(persons.filter(num => num.name.toLowerCase().includes(subStr.toLowerCase()))); 
  }
  return (
    <div>
    filter persons with: 
    <input value={search} onChange={handleSearch} />
    </div>
  )
}

const AddNumber = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons, setCname, setMessage }) => {
  const isPresent = (numObj) => {
    for (const num of persons) 
      if (num.name === numObj.name) {
        return num.id;
      }
    return null;
  }
  const addNumber = e => {
    e.preventDefault();
    const numObj = {
      name: newName,
      number: newNumber,
    }
    if( !newName || !newNumber) {
      alert(`cannot add empty number or name!!`);
      return;
    }
    const prevId =isPresent(numObj); 
    if(prevId !== null) {
      if(window.confirm(`${numObj.name} is already added to phonebook, replace the old number with a new one?`)){
        numObj.id = prevId;
        dbService.replace(numObj)
          .then(({data, message}) => {
            if (data === null) {
              setCname('red');
              setPersons(persons.filter(p => (p.id !== numObj.id)));
            } else {
              setCname('green');
              setPersons(persons.map(p => (p.id !== data.id) ? p : data));
            }
            setMessage(message);
            setTimeout(() => setMessage(null), 2000);
          })
      } else {
        return;
      }
    } else {
      dbService.insert(numObj)
          .then(({data, message}) => {
            if (data == null) {
              setCname('red');
            } else {
              setCname('green');
              setPersons(persons.concat(data));
            }
            setMessage(message);
            setTimeout(() => setMessage(null), 2000);
          })
    }
            setNewName('');
            setNewNumber('');
  }
  const handleNewNameChange = e => {
    setNewName(e.target.value)
  }
  const handleNewNumberChange = e => {
    setNewNumber(e.target.value)
  }
  return (
    <form onSubmit={addNumber}>
    <div>
    name: <input value={newName} onChange={handleNewNameChange} />
    </div>
    <div>
    nunber: <input value={newNumber} onChange={handleNewNumberChange} />
    </div>
    <div>
    <button type='submit'>Add Number</button>
    </div>
    </form>
  )
}

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filteredPhBook, setFilteredPhBook] = useState([]);
  const [message, setMessage] = useState(null);
  const [cname, setCname] = useState('');

  useEffect(() => {
    dbService.getAll()
      .then(data => {
        if(data.persons){
          setPersons(data.persons);
          setCname('green');
        } else {
          setCname('red');
        }
        setMessage(data.message);
        setTimeout(() => setMessage(null), 3000);
      })
  }, []);

  return (
    <div>
    <h1>PhoneBook</h1>
    <Notification cname={cname} message={message} />
    <Filter 
    search={search} setSearch={setSearch}
    persons={persons} setFilteredPhBook={setFilteredPhBook}
    />
    <AddNumber 
    newName={newName} setNewName={setNewName}
    newNumber={newNumber} setNewNumber={setNewNumber}
    persons={persons} setPersons={setPersons}
    setCname={setCname} setMessage={setMessage}
    />
    <Numbers persons={search ? filteredPhBook: persons} setPersons={setPersons} setMessage={setMessage} setCname={setCname} />
    </div>
  )
}

export default App
