function ConnectionList(props) {
  if(props.length < 1) {
    return(
      <h1>Put yourself out there!</h1>
    )  
  }
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

export default ConnectionList