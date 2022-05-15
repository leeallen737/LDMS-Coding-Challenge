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

  //submit form

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({myName, myNote})
    addNote({myName, myNote})
    updateMyName('')
    updateMyNote('')
  }

  // console.log(myNotes)
  
  let sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const compareSixMonths = sixMonthsAgo.toLocaleDateString(
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
      <form onSubmit={handleSubmit} className="my-form">
        <label htmlFor="name">Name</label>
        <input 
        id="name"
        value={myName}
        onChange={(e) => updateMyName(e.target.value)} 
        type="text"></input>
        <label htmlFor="my-note">Add Note</label>
        <textarea
        id="my-note" 
        value={myNote} 
        onChange={(e) => updateMyNote(e.target.value)} 
        type="text" />
        <button >Add Note</button>
      </form>
    </div>
  );
}

export default App;
