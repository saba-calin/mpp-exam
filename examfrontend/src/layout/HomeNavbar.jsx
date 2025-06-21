import {Link} from "react-router-dom";

const HomeNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Exam-Test</a>
                <div>
                    <Link to={'/second-round'} className="btn btn-outline-light" style={{marginRight: "10px"}}>Second Round</Link>
                    <Link to={'/news'} className="btn btn-outline-light" style={{marginRight: "10px"}}>News</Link>
                    <Link to={'/election'} className="btn btn-outline-light" style={{marginRight: "10px"}}>Election</Link>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavbar;
