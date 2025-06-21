import {Fragment} from "react";
import {Link} from "react-router-dom";

const NewsNavbar = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand">Exam-Test</a>
                    <div>
                        <Link to={'/'} className="btn btn-outline-light" style={{marginRight: "10px"}}>Back</Link>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default NewsNavbar;
