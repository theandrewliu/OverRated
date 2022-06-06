import { Navigate } from 'react-router-dom';

function Logout(props) {
  const { logout } = props;
  logout();
  return <Navigate to="/" />;
}

export default Logout;
