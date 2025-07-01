import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',
    inverted:'inverted'
}

const Button = ({childeren, buttonType, ...otherProps} ) =>{
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {childeren}
        </button>
    )
}

export default Button;