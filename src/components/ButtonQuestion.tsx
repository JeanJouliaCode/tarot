import "styles/buttonQuestion.scss";
import Text from "components/Text";

interface buttonProps {
  label: string;
  type: string;
  onClick: Function;
}

ButtonQuestion.defaultProps = {
  type: "normal",
};

export default function ButtonQuestion({ label, type, onClick }: buttonProps) {
  return (
    <button
      className={`buttonQ buttonQ__${type}`}
      onClick={() => {
        onClick();
      }}
    >
      <Text content={label} />
    </button>
  );
}
