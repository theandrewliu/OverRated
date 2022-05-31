import React from 'react';
import LoadingBody from './LoadingBody';
import ClueBody from './ClueBody';
import ErrorBody from './ErrorBody';
import ApiSelector from './ApiSelector';

class ClueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      api: 'mongo',
    };
    this.isLoading = false;
    this.loadClue = this.loadClue.bind(this);
    this.handleApiChange = this.handleApiChange.bind(this);
  }

  handleApiChange(e) {
    this.setState({
      api: e.target.value,
    });
  }

  async loadClue() {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/${this.state.api}/clues/random-clue`);
      if (response.ok) {
        const clue = await response.json();
        clue.question = clue.question.replace('\\\\', '');
        clue.answer = clue.answer.replace('\\\\', '');
        this.setState({
          loaded: clue,
          error: false,
        });
      } else {
        this.setState({ error: true });
      }
    } catch (e) {
      this.setState({ error: true });
    }
    this.isLoading = false;
  }

  componentDidMount() {
    this.loadClue();
  }

  render() {
    return (
      <>
        <div className="col-6 offset-3">
          <ApiSelector onChange={this.handleApiChange} label="PostgreSQL API" value="postgres" selected={this.state.api} />
          <ApiSelector onChange={this.handleApiChange} label="MongoDB API" value="mongo" selected={this.state.api} />
        </div>
        <p className="mt-4">
          <button className="btn btn-success" onClick={this.loadClue}>Next clue</button>
        </p>
        <div className="card col-6 offset-3">
          { this.state.error
            ? <ErrorBody />
            : this.state.loaded
            ? <ClueBody clue={this.state.loaded} />
            : <LoadingBody />
          }
        </div>
      </>
    );
  }
}

export default ClueCard;
