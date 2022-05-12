const Note = ( props ) => {
    return (
        <div className="my-note">
          <h3>{props.note.createdAt}</h3>
          <h3>{props.note.user}</h3>
          <p>{props.note.note}</p>
        </div>
    )
}

export default Note