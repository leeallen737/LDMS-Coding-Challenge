import PropTypes from "prop-types"

const Button = ( {clickFunction, text} ) => {
    return (
    <header>
        <nav>
          <button  onClick={clickFunction} className='button'>{text}</button>
        </nav>
    </header>
    )
}

Button.propTypes = {
  text: PropTypes.string,
  clickFunction: PropTypes.func,
}

export default Button