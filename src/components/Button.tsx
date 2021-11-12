import "styles/Button.scss"
import Text from "components/Text"

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

Button.defaultProps = {
  disabled: false,
};

export default function Button({label,onClick,disabled}:ButtonProps){
  return(
    <button className={`button ${disabled ?'button_disabled':''}`} onClick={onClick}>
      <Text content={label}/>
    </button>
  )
}