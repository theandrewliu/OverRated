function ConnectionList(props) {
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
              <td>{ user.profile }</td>
              <td>{ user.address }</td>
              <td>{ user.phone }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CustomerList