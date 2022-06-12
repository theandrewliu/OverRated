class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/users/me`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      this.setState({
        user: await response.json(),
      });
    }
  }

  componentDidMount() {
    this.getMyDetails();
  }

  render() {
    return (
      <div>{this.state.user.username}</div>
    );
  }
}
