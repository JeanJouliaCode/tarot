import "styles/question.scss";
import ButtonQuestion from "components/ButtonQuestion";
import Text from "components/Text";
import { useEffect, useState } from "react";
import { decodeHtml } from "services/utils";

interface questionProps {
  question: any;
  sendResult: Function;
}

export default function Question({
  question: questionData,
  sendResult,
}: questionProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [reveal, setReveal] = useState<Boolean>(false);

  useEffect(() => {
    setReveal(false);
    var tmp = questionData[3].map((question: any) => {
      return { label: decodeHtml(question.value), state: question.state };
    });

    setQuestions(tmp);
  }, [questionData]);

  const click = (answer: number) => {
    setReveal(true);
    setTimeout(() => {
      sendResult(questions[answer].state);
    }, 1000);
  };

  return (
    <div className="question">
      <div className="question__header" />
      <div className="question__main">
        <div className="question__info">
          <Text
            content={`${questionData[0]} - ${questionData[1]}`.toUpperCase()}
          />
          <div className="question__title">
            <Text content={`${questionData[2]}`} />
          </div>
        </div>
        {questions.length > 0 && (
          <div className="question__groupe">
            <ButtonQuestion
              type={
                reveal ? (questions[0].state ? "valide" : "false") : "normal"
              }
              label={questions[0].label}
              onClick={() => click(0)}
            />
            <ButtonQuestion
              type={
                reveal ? (questions[1].state ? "valide" : "false") : "normal"
              }
              label={questions[1].label}
              onClick={() => click(1)}
            />
            <ButtonQuestion
              type={
                reveal ? (questions[2].state ? "valide" : "false") : "normal"
              }
              label={questions[2].label}
              onClick={() => click(2)}
            />
            <ButtonQuestion
              type={
                reveal ? (questions[3].state ? "valide" : "false") : "normal"
              }
              label={questions[3].label}
              onClick={() => click(3)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
