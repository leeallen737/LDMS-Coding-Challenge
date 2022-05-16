import React, {useEffect} from 'react'
import "./App.scss";
import Note from './Components/Note'
import Button from './Components/Button';
import Form from './Components/Form';
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

  //couldn't get the backend from template working due to CORS but this attempted work around didn't mitigate.
  //so I created a mock backend using json-server installed in the frontend dependencies instead using port 5000. 'npm run server'.
  const [lessThanSixMonths, updateLessThansixMonths] = React.useState(false)
  const [myNotes, updateMyNotes] = React.useState([])
  const [addNoteForm, updateAddNoteForm] = React.useState(false)


  //Fetch Notes from json-server backend
  useEffect(() => {
    const getTasks = async () => {
      const notesFromServer = await fetchNotes()
      updateMyNotes(notesFromServer)
    }

    getTasks()
  }, [])

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
  
  //Created a date for 6 months ago
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


  //filter notes less than 6 months
  const myFilteredNotes = myNotes.filter((filteredNote) => {
    return Date.parse(filteredNote.createdAt) > Date.parse(compareSixMonths)
  })

  //toggle button for toggle function
  const toggleNotes = () => {
    updateLessThansixMonths(prevState => !prevState)
  }

  return (
    <div className="App">
      <header>
        <Button clickFunction={toggleNotes} text={lessThanSixMonths ? 'All Notes' : 'Last 6 Months'}/>
        <Button clickFunction={() => updateAddNoteForm(prevState => !prevState)} text='Add Note'/>
      </header>
      
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
      <div id="container" className={addNoteForm ? 'reveal' : 'hide'} >
      
        <Form date={date} addNote={addNote}/>
      </div>
    </div>
  );
}

export default App;
