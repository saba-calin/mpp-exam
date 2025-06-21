import {Fragment, useEffect, useRef, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import { useNavigate } from "react-router-dom";

import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const navigate = useNavigate();

    const [dummyData, setDummyData] = useState([
        { id: 1, firstName: "John", lastName: "Doe", party: "Red" },
        { id: 2, firstName: "Jane", lastName: "Smith", party: "Blue" },
        { id: 3, firstName: "Alice", lastName: "Johnson", party: "Green" },
        { id: 4, firstName: "Bob", lastName: "Williams", party: "Red" }
    ]);

    const loadCandidates = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/candidate/get-all`);
            if (Array.isArray(response.data)) {
                setDummyData(response.data);
            } else {
                setDummyData([]);
            }
        } catch (error) {
            console.error(error);
            setDummyData([]);
        }
    }

    useEffect(() => {
        console.log("here");
        const fetchCandidates = async () => {
            const response = await axios.get(`http://localhost:8080/api/v1/candidate/get-all`);
            console.log(response.data);
            setDummyData(response.data);
        };
        fetchCandidates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const formattedData = Object.fromEntries(data.entries());

        // Build the candidate object (for readability/logging)
        const candidate = {
            firstName: formattedData.firstName,
            lastName: formattedData.lastName,
            party: formattedData.party,
            photo: data.get("photo") // this gives you the actual File object
        };

        // Create a new FormData to send
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", candidate.firstName);
        formDataToSend.append("lastName", candidate.lastName);
        formDataToSend.append("party", candidate.party);
        formDataToSend.append("photo", candidate.photo);

        await axios.post("http://localhost:8080/api/v1/candidate", formDataToSend);
        loadCandidates();
    };


    const handleEdit = (e) => {
        e.preventDefault();

        const id = parseInt(e.target.id.value);
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const party = e.target.party.value;

        setDummyData((prevData) =>
            prevData.map((user) =>
                user.id === id ? { ...user, firstName: firstName, lastName: lastName, party: party } : user
            )
        );
    }

    const [isGenerating, setIsGenerating] = useState(false);
    const intervalRef = useRef(null);

    const generateRandomCandidate = () => {
        const firstNames = ["Liam", "Olivia", "Noah", "Emma", "Elijah", "Ava", "James", "Sophia"];
        const lastNames = ["Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Lopez"];
        const parties = ["Red", "Blue", "Green", "Yellow"];

        const newCandidate = {
            id: Date.now(),
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            party: parties[Math.floor(Math.random() * parties.length)]
        };

        setDummyData(prevData => [...prevData, newCandidate]);
    };

    const toggleGeneration = async () => {
        if (!isGenerating) {
            await axios.post(`http://localhost:8080/api/v1/generator/start`);
            setIsGenerating(true);
        } else {
            await axios.post(`http://localhost:8080/api/v1/generator/stop`);
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        let interval;
        if (isGenerating) {
            interval = setInterval(loadCandidates, 1000);
        }
        return () => clearInterval(interval);
    }, [isGenerating]);





    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/candidate?id=${id}`);
        loadCandidates();
    };

    const getPartyChartData = () => {
        const counts = dummyData.reduce((acc, curr) => {
            acc[curr.party] = (acc[curr.party] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(counts),
            datasets: [
                {
                    label: "Party Distribution",
                    data: Object.values(counts),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                    borderWidth: 1,
                }
            ]
        };
    };

    return (
        <Fragment>
            <HomeNavbar />

            <div className="container">
                <div className="d-flex justify-content-end py-2">
                    <button
                        className={`btn ${isGenerating ? "btn-danger" : "btn-success"}`}
                        onClick={toggleGeneration}
                    >
                        {isGenerating ? "Stop Generator" : "Start Generator"}
                    </button>
                </div>

                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dummyData.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-primary btn-sm mx-1"
                                        onClick={() => navigate(`/candidate/${index}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm mx-1"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h4 className="mt-5">Party Distribution</h4>
                    <div style={{ maxWidth: "400px", margin: "auto" }}>
                        <Pie data={getPartyChartData()} />
                    </div>
                </div>
            </div>

            <form role="form" className="mb-3 text-center" onSubmit={handleSubmit}>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />

                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />

                <label htmlFor="party" className="form-label">Party</label>
                <input type="text" id="party" name="party" className="form-control" placeholder="Party" style={{marginBottom: "10px"}} />

                <label htmlFor="photo" className="form-label">Photo</label>
                <input type="file" id="photo" name="photo" className="form-control" style={{marginBottom: "50px"}} />

                <button type="submit" className="btn btn-outline-primary">Add</button>
            </form>

            {/*<form role="form" className="mb-3 text-center" onSubmit={handleEdit}>*/}
            {/*    <label htmlFor="id" className="form-label">First Name</label>*/}
            {/*    <input type="number" id="id" name="id" className="form-control" placeholder="Id" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="firstName" className="form-label">First Name</label>*/}
            {/*    <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="lastName" className="form-label">Last Name</label>*/}
            {/*    <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />*/}

            {/*    <label htmlFor="party" className="form-label">Party</label>*/}
            {/*    <input type="text" id="party" name="party" className="form-control" placeholder="Party" style={{marginBottom: "50px"}} />*/}

            {/*    <button type="submit" className="btn btn-outline-primary">Edit</button>*/}
            {/*</form>*/}
        </Fragment>
    );
};

export default Home;
