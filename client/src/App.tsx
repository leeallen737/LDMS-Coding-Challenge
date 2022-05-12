import React from 'react'
import "./App.scss";
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
  const [myNotes, updateMyNotes] = React.useState([
    {
      "id": 29,
      "createdAt": "2021-07-17T18:04:38.040Z",
      "user": "Hoyt Braun",
      "note": "Sit iusto odit amet itaque sequi error laudantium fugit aperiam accusamus et mollitia est et necessitatibus iusto maxime sunt sed incidunt ut saepe quidem aspernatur modi consectetur illum qui vero."
    },
    {
      "id": 30,
      "createdAt": "2021-07-17T18:04:38.040Z",
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


  return (
    <div className="App">
      {myNotes.map((note) => {
          return (
          
          <div key={note.id} className="my-note">
          <h3>{note.createdAt}</h3>
          <h3>{note.user}</h3>
          <p>{note.note}</p>
          </div>
          )
        })}
    </div>
  );
}

export default App;
