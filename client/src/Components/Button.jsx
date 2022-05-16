const Button = ( {clickFunction, text} ) => {
    return (
    <header>
        <nav>
          <button  onClick={clickFunction} className='button'>{text}</button>
        </nav>
    </header>
    )
}

export default Button