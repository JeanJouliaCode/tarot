import Text from "components/Text";
import Avatar from "components/Avatar";
import "styles/Waiting.scss";
import check from "assets/check.svg";
import hourglass from "assets/hourglass.svg";

interface WaitingProps {
  users: any[];
}

export default function WaitingRoom({ users }: WaitingProps) {
  const finished = users.reduce((prev, cur) => {
    return cur.answersState.length === 4 && prev;
  }, true);

  const message = finished ? "RESULTS" : "WAITING FOR EVERYONE...";

  return (
    <div className="waiting">
      <div className="waiting__title">
        <Text content={message} />
      </div>
      <div className="waiting__users">
        {users.map((user: any) => {
          return userTile(user, finished);
        })}
      </div>
    </div>
  );
}

function userTile(user: any, finished: boolean) {
  return (
    <div className="waiting__user">
      <div className="waiting__user_wrapper">
        <Avatar url={user.url} size="normal" />
        <div className="waiting__user_info">
          <Text content={user.name} />
          {finished && answersStatus(user.answersState)}
        </div>
        {user.answersState.length === 4 && !finished && (
          <img className="waiting__state_svg" src={check} alt="" />
        )}
        {user.answersState.length < 4 && !finished && (
          <img className="waiting__state_svg" src={hourglass} alt="" />
        )}
      </div>
    </div>
  );
}

function answersStatus(answers: Boolean[]) {
  return (
    <div className="waiting__user_answers">
      {answers.map((answer: Boolean) => {
        return (
          <div
            className={`waiting__user_dot waiting__user_dot--${
              answer ? "green" : "red"
            }`}
          ></div>
        );
      })}
    </div>
  );
}
