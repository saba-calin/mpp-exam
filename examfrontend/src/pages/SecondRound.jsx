import {Fragment, useState} from "react";
import NewsNavbar from "../layout/NewsNavbar.jsx";
import axios from "axios";

const SecondRound = () => {

    const [results, setResults] = useState([]);

    axios.get("http://localhost:8080/api/v1/election/results")
        .then(response => {
            // Sort by votes descending
            const sorted = response.data.sort((a, b) => b.votes - a.votes);
            setResults(sorted);
        });

    return (
        <Fragment>
            <NewsNavbar />


        </Fragment>
    );
}

export default SecondRound;
