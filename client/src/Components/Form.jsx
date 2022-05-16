import React from 'react'

    const Form = ( {addNote, date} ) => {
    const [myNote, updateMyNote] = React.useState('')
    const [myName, updateMyName] = React.useState('')
    const [tooManyCharacters, updateTooManyCharacters] = React.useState(false)
    const [aNoteIsRequired, updateANoteIsRequired] = React.useState(false)

  const checkCharacters = () => {
    if (myNote.length > 500) {
      updateTooManyCharacters(true)
    }else if (myNote.length === 0){
      updateANoteIsRequired(true)
    }else {
      updateTooManyCharacters(false)
      updateANoteIsRequired(false)
      addNote({createdAt:date, user:myName, note: myNote})
      updateMyNote('')
      updateMyName('')
    }
  }

    const handleSubmit = (e) => {
        e.preventDefault()
        checkCharacters(e)
        
      }

    return (
        <form id="form" onSubmit={handleSubmit} className="my-form">
        <div id="form-container">
          <input 
          placeholder="name"
          id="name"
          
          value={myName}
          onChange={(e) => updateMyName(e.target.value)} 
          type="text"></input>
        </div>
        <div id="form-container">
          <textarea
          placeholder="Add note..."
          id="my-note"
          className={tooManyCharacters ? 'error' : ''}
          value={myNote} 
          onChange={(e) => updateMyNote(e.target.value)} 
          type="text" />
          {
            aNoteIsRequired && <small id="error-note-required">The note is required</small>
          }
          
          {
            tooManyCharacters && <small id="error-500-exceeded">The note cannot exceed 500 characters</small>
          }
          
        </div>
          <button id="submit">Submit</button>
        </form>
    )
}

export default Form