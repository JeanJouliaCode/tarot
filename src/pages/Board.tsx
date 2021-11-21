import { Component, useContext } from "react";
import useGame from "hooks/useGame";
import Waiting from "components/WaitingRoom";
import Timer from "components/Timer";
import { useParams } from "react-router-dom";
import Question from "components/Question";
import { toaster } from "App";
import "styles/Board.scss";
import "styles/player.scss";
import { getPlayerID } from "services/localStorage";
import { sendResult } from "services/functions";

interface IProps {
  game: any;
  showMessage: Function;
  gameID: string;
}

export default function Board() {
  const { id: gameID } = useParams<string>();

  let testID: string = "Icef7RKtrq5pIMaDGL1e";
  if (gameID && gameID?.length > 10) testID = gameID;

  const { error, isPending, data } = useGame(testID);
  const showMessage = useContext(toaster);

  if (!!error) {
    showMessage(error as string);
  }

  return (
    <div className="page board">
      {!isPending && !error && !!data && gameID && (
        <BoarPage gameID={gameID} game={data} showMessage={showMessage} />
      )}
    </div>
  );
}

interface IState {
  subState: String;
  currentQuestionIndex: 0;
  user: any;
}

class BoarPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const user = props.game.users.find(
      (user: any) => user.id === getPlayerID()
    );

    let state: string = user.answersState.length > 0 ? "questions" : "timer";
    if (user.answersState.length === 4) {
      state = "waiting";
    }

    this.state = {
      currentQuestionIndex: user.answersState.length,
      subState: state,
      user,
    };
  }

  startQuestions = () => {
    this.setState((state) => {
      return { subState: "questions" };
    });
  };

  handleResult = async (valide: boolean) => {
    await sendResult(this.props.gameID, this.state.user.id, valide);

    if (this.state.currentQuestionIndex >= 3) {
      this.setState((state: any) => {
        return { subState: "waiting" };
      });
      return;
    }

    this.setState((state: any) => {
      return { currentQuestionIndex: state.currentQuestionIndex + 1 };
    });
  };

  render() {
    if (this.state.subState === "timer") {
      return <Timer next={this.startQuestions} />;
    }
    if (this.state.subState === "waiting") {
      return <Waiting users={this.props.game.users} />;
    }
    if (this.state.subState === "questions") {
      const ques = this.props.game.questions[this.state.currentQuestionIndex];
      console.log(this.props.game);
      return (
        <Question
          question={[
            ques.category,
            ques.difficulty,
            ques.question,
            ques.answers,
          ]}
          sendResult={this.handleResult}
        />
      );
    }
  }
}
