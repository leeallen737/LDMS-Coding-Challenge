import React, {useEffect} from 'react'
import "./App.scss";
import Note from './Components/Note'
import Button from './Components/ToggleButton';
// const { createProxyMiddleware } = require('http-proxy-middleware');
function App() {
  // const apiProxy = createProxyMiddleware({
  //   target: 'http://localhost:8080',
  //   changeOrigin: true,
    
  // });
  // const myFunction = async () => {
  //   const response = await fetch(
  //     "http://localhost:8080/api/notes",
  //     apiProxy
  //   );
  //   let data = await response.json()
  //   console.log(data)
    
  //   }  

  //   myFunction()
  const [lessThanSixMonths, updateLessThansixMonths] = React.useState(false)
  const [myNotes, updateMyNotes] = React.useState([])
  const [myNote, updateMyNote] = React.useState('')
  const [myName, updateMyName] = React.useState('')

  console.log(myName)

  useEffect(() => {
    const getTasks = async () => {
      const notesFromServer = await fetchNotes()
      updateMyNotes(notesFromServer)
    }

    getTasks()
  }, [])

  //Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch('http://localhost:5000/notes')
    const data = await res.json()

    return data
  }

  //Add Note
  const addNote = async (note) => {
    const res = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    const data = await res.json()
    // console.log(data)
    updateMyNotes([...myNotes, data])
    console.log(myNotes)

  }

  const date = new Date().toLocaleTimeString(
    'en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  //submit form

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({myName, myNote})
    addNote({createdAt:date, user:myName, note: myNote})
    updateMyNote('')
    updateMyName('')
  }

  // console.log(myNotes)
  
  let sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const compareSixMonths = sixMonthsAgo.toLocaleTimeString(
    'en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const myFilteredNotes = myNotes.filter((filteredNote) => {
    return Date.parse(filteredNote.createdAt) > Date.parse(compareSixMonths)
  })

  const toggleNotes = () => {
    updateLessThansixMonths(prevState => !prevState)
    // console.log(lessThanSixMonths)
  }

  return (
    <div className="App">
      
      <Button toggleNotes={toggleNotes} timeScale={lessThanSixMonths}/>
      
      <div className="notes">
          { lessThanSixMonths ? myFilteredNotes.map((note) => {
            
            return (
            <Note key={note.id} note={note} />
            )
          }) 
        :
        myNotes.map((note) => {
          
          return (
          <Note key={note.id} note={note} />
          )
        }) 
        }
      </div>
      <div id="container">
      <form id="form" onSubmit={handleSubmit} className="my-form">
      <div id="form-container">
        <input 
        placeholder="name"
        id="name"
        className="success"
        value={myName}
        onChange={(e) => updateMyName(e.target.value)} 
        type="text"></input>
      </div>
      <div id="form-container">
        <textarea
        placeholder="Add note..."
        id="my-note"
        className="error"
        value={myNote} 
        onChange={(e) => updateMyNote(e.target.value)} 
        type="text" />
        <small id="error-note-required">The note is required</small>
        <small id="error-500-exceeded">The note cannot exceed 500 characters</small>
      </div>
        <button id="submit">Submit</button>
      </form>
        
      </div>
    </div>
  );
}

export default App;
