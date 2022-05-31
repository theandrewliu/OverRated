function GuessBlock(props) {
  const setText = props.setText;
  const setShowAnswer = props.setShowAnswer;
  const text = props.text;

  return (
    <>
      <p>
        <input type="text" onChange={e => setText(e.target.value)} value={text} />
      </p>
      <p>
        <button className="btn btn-info" onClick={() => setShowAnswer(true)}>Answer</button>
      </p>
    </>
  )
}

export default GuessBlock;
