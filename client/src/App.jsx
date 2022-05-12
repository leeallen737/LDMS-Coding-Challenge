import React from 'react'
import "./App.scss";
import Note from './Components/Note'
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
  const [myNotes, updateMyNotes] = React.useState([
    {
      "id": 29,
      "createdAt": "2021-11-17T18:04:38.040Z",
      "user": "Hoyt Braun",
      "note": "Sit iusto odit amet itaque sequi error laudantium fugit aperiam accusamus et mollitia est et necessitatibus iusto maxime sunt sed incidunt ut saepe quidem aspernatur modi consectetur illum qui vero."
    },
    {
      "id": 30,
      "createdAt": "2022-01-17T18:04:38.040Z",
      "user": "David Braun",
      "note": "Sit iusto odit amet itaque sequi error laudantium fugit aperiam accusamus et mollitia est et necessitatibus iusto maxime sunt sed incidunt ut saepe quidem aspernatur modi consectetur illum qui vero."
    },
    {
      "id": 31,
      "createdAt": "2018-07-17T18:04:38.040Z",
      "user": "Jessica Braun",
      "note": "Sit iusto odit amet itaque sequi error laudantium fugit aperiam accusamus et mollitia est et necessitatibus iusto maxime sunt sed incidunt ut saepe quidem aspernatur modi consectetur illum qui vero."
    },
    {
      "id": 32,
      "createdAt": "2019-07-17T18:04:38.040Z",
      "user": "Stacey Braun",
      "note": "Sit iusto odit amet itaque sequi error laudantium fugit aperiam accusamus et mollitia est et necessitatibus iusto maxime sunt sed incidunt ut saepe quidem aspernatur modi consectetur illum qui vero."
    }
  ])


  
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


  console.log(myFilteredNotes)

  return (
    <div className="App">
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
  );
}

export default App;
