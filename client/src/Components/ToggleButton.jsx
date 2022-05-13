const Button = ( {toggleNotes, timeScale} ) => {
    return (
    <header>
        <nav>
          <button onClick={toggleNotes}>{timeScale ? 'All Notes' : 'Last 6 Months'}</button>
        </nav>
    </header>
    )
}

export default Button