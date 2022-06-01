import ClueCard from './ClueCard';
import './public'

function MainPage() {


  return (
    <div className="px-4 my-5 text-center">
      <h1 className="display-5 fw-bold">OverRated</h1>
      <ClueCard />
      <img src="/images/Logo.png" alt="Logo"></img>
      <div>
      <p className="lead mb-4">
          The premiere solution for loneliness!
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/signup" className="btn btn-primary btn-lg px-4 gap-3">Be Toxic Today!</Link>
            </div>
      </div>
    </div>
  );
}


export default MainPage;
