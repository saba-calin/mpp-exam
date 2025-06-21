import { Fragment, useState } from "react";
import NewsNavbar from "../layout/NewsNavbar.jsx";
import axios from "axios";

const Election = () => {
    const [results, setResults] = useState([]);

    const handleStartElection = () => {
        axios.post("http://localhost:8080/api/v1/election/start")
            .then(() => alert("Election started successfully!"));
    };

    const handleViewResults = () => {
        axios.get("http://localhost:8080/api/v1/election/results")
            .then(response => {
                // Sort by votes descending
                const sorted = response.data.sort((a, b) => b.votes - a.votes);
                setResults(sorted);
            });
    };

    return (
        <Fragment>
            <NewsNavbar />

            <div className="container mt-4">
                <h2 className="text-center mb-4">Election Control Panel</h2>

                <div className="d-flex justify-content-center gap-3 mb-5">
                    <button className="btn btn-success" onClick={handleStartElection}>Start Election</button>
                    <button className="btn btn-primary" onClick={handleViewResults}>View Results</button>
                </div>

                {results.length > 0 && (
                    <div className="card">
                        <div className="card-header">
                            <h4>Election Results</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {results.map((res, idx) => (
                                <li
                                    key={res.id}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${idx < 2 ? 'bg-success text-white' : ''}`}
                                >
                                    <strong>{res.firstName} {res.lastName}</strong>
                                    <span className="badge bg-light text-dark rounded-pill">
                                        {res.votes} vote{res.votes !== 1 ? 's' : ''}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Election;
