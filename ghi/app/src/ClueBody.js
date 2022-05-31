import React, { useEffect, useState } from 'react';
import AnswerBlock from './AnswerBlock';
import GuessBlock from './GuessBlock';

function ClueBody(props) {
  const clue = props.clue;
  const [showAnswer, setShowAnswer] = useState(false);
  const [text, setText] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setWinner(text.toLowerCase() === clue.answer.toLowerCase())
  }, [showAnswer])

  useEffect(() => {
    setShowAnswer(false);
    setText('');
  }, [clue]);

  return (
    <div className="card-body">
      <div className="clue-card card-text d-flex flex-column justify-content-center">
        <h5>{clue.category.title}</h5>
        <p dangerouslySetInnerHTML={{ __html: clue.question}} />
        { showAnswer
          ? <AnswerBlock answer={clue.answer} winner={winner} />
          : <GuessBlock text={text} setText={setText} setShowAnswer={setShowAnswer} />
        }
      </div>
    </div>
  )
};

export default ClueBody;
