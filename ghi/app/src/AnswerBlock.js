function AnswerBlock(props) {
  return (
    <>
      <h5>Answer</h5>
      <p dangerouslySetInnerHTML={{ __html: props.answer}} />
      { props.winner
        ? <div class="alert alert-success">WINNER</div>
        : null
      }
    </>
  );
}

export default AnswerBlock;
