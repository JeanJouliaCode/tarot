import Text from "components/Text";
import "styles/Waiting.scss";

interface WaitingProps {
  users: any[];
}

export default function WaitingRoom({ users }: WaitingProps) {
  return (
    <div>
      {users.map((user) => {
        return (
          <div className="waiting">
            <Text
              content={`name:${user.name} status:${
                user.answersState.length >= 4 ? "finished" : "wating"
              } values:${user.answersState}`}
            />
          </div>
        );
      })}
    </div>
  );
}
