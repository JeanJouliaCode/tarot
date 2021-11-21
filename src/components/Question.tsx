import "styles/question.scss";
import ButtonQuestion from "components/ButtonQuestion";
import Text from "components/Text";
import { useEffect, useState } from "react";

interface questionProps {
  question: any;
  sendResult: Function;
}

export default function Question({ question, sendResult }: questionProps) {
  const [questions, setQuestions] = useState<any>([]);
  const [reveal, setReveal] = useState<any>(false);

  useEffect(() => {
    setReveal(false);
    var tmp = question[3].map((q: any) => {
      return { label: q.value, state: q.state };
    });

    setQuestions(tmp);
  }, [question]);

  const click = (value: any) => {
    console.log("click");
    setReveal(true);
    setTimeout(() => {
      sendResult(value.state);
    }, 2000);
  };

  return (
    <div className="question">
      <div className="question__header" />
      <div className="question__main">
        <div className="question__info">
          <Text content={`${question[0]} - ${question[1]}`.toUpperCase()} />
          <div className="question__title">
            <Text content={`${question[2]}`} />
          </div>
        </div>
        {questions.length > 0 && (
          <div className="question__groupe">
            <ButtonQuestion
              type={
                reveal ? (questions[0].state ? "valide" : "false") : "normal"
              }
              label={questions[0].label}
              onClick={() => click(questions[0])}
            />
            <ButtonQuestion
              type={
                reveal ? (questions[1].state ? "valide" : "false") : "normal"
              }
              label={questions[1].label}
              onClick={() => click(questions[1])}
            />
            <ButtonQuestion
              type={
                reveal ? (questions[2].state ? "valide" : "false") : "normal"
              }
              label={questions[2].label}
              onClick={() => click(questions[2])}
            />
            <ButtonQuestion
              type={
                reveal ? (questions[3].state ? "valide" : "false") : "normal"
              }
              label={questions[3].label}
              onClick={() => click(questions[3])}
            />
          </div>
        )}
      </div>
    </div>
  );
}
