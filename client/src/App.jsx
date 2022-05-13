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

  const note = {
    
      id: 40,
      createdAt: "2021-07-17T18:04:38.040Z",
      user: "Lee Allen",
      note: "Sit iusto odit amet itaque sequi error laudantium fugit aperiam accusamus et mollitia est et necessitatibus iusto maxime sunt sed incidunt ut saepe quidem aspernatur modi consectetur illum qui vero."
    
  }
  
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
    console.log(lessThanSixMonths)
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
      
    </div>
  );
}

export default App;
