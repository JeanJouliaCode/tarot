import Text from "components/Text";
import "styles/Score.scss";
import { getUserScore } from "services/utils";
import Avatar from "components/Avatar";

interface IProps {
  users: any[];
}

export default function score({ users }: IProps) {
  let scores: number[] = [];

  users.forEach((user: any, index: number) => {
    const score = getUserScore(user);
    console.log(score);
    scores.push(score);
  });

  return (
    <div className="score">
      <div className="score__title">
        <Text content="RESULTS" />
      </div>
      <div className="score__content">
        {bar(Math.max(...scores))}
        <div className="score__race">
          {users.map((user: any) => {
            return <Avatar size="small" url={user.url} />;
          })}
        </div>
      </div>
    </div>
  );
}

function bar(value: number) {
  let segments = [];

  for (let i = 0; i < 15; i++) {
    segments.push({ state: i < value ? true : false });
  }

  return (
    <div className="score__bar">
      {segments.map((segment) => {
        return (
          <div
            className={`score__segment score__segment_${
              !segment.state ? "green" : "white"
            }`}
          ></div>
        );
      })}
    </div>
  );
}
