import "styles/Button.scss";
import Text from "components/Text";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
  icon: string;
}

Button.defaultProps = {
  disabled: false,
  icon: "",
};

export default function Button({
  label,
  onClick,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <button
      className={`button ${disabled ? "button_disabled" : ""}`}
      onClick={onClick}
    >
      <img src={icon} alt="" />
      <Text content={label} />
    </button>
  );
}
