import {Fragment} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {useParams} from "react-router-dom";
import candidateImage from "../assets/candidate.jpg";

const ViewCandidate = () => {
    const { id } = useParams();

    const dummyData = [
        { id: 1, firstName: "John", lastName: "Doe", party: "party1" },
        { id: 2, firstName: "Jane", lastName: "Smith", party: "party2" },
        { id: 3, firstName: "Alice", lastName: "Johnson", party: "party3" },
        { id: 4, firstName: "Bob", lastName: "Williams", party: "party4" }
    ];

    return (
        <Fragment>
            <HomeNavbar />

            <div className="container">
                <div className="row py-4">
                    <div className="col-sm">
                        <div className="card" style={{width: "18rem"}}>
                            <img className="card-img-top" src={candidateImage} alt="Character image"/>
                            <div className="card-body">
                                <h5 className="card-title">First Name: {dummyData[id].firstName}</h5>
                                <p className="card-text">Last Name: {dummyData[id].lastName}</p>
                                <p className="card-text">Party: {dummyData[id].party}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ViewCandidate;
