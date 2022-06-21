function MatchesList(props) {
    return(
    <table className="table table-striped">
      <thead>
      {props.users.map(user => {
          return(
        <tr>
          <th>{user.profile}</th>
        </tr>     
          );
      })}
      </thead>
      <tbody>
        {props.users.map(user => {
          return (
            <tr key={user.id}>
              <td>{ user.info }</td>
              <td>{ user.info }</td>
              <td>{ user.info }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MatchesList