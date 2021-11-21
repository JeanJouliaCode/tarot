import Text from "components/Text";
import { useState } from "react";

interface TimerProps {
  next: Function;
}

export default function Timer({ next }: TimerProps) {
  const [time, setTime] = useState(2);

  setTimeout(() => {
    if (time === 0) {
      next();
    }
    setTime(time - 1);
  }, 1000);

  return (
    <div className="timer">
      <Text content={time.toString()} />
    </div>
  );
}
