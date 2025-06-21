import {Fragment} from "react";
import LoginNavbar from "../../layout/auth/LoginNavbar.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formattedData = Object.fromEntries(formData.entries());

        const authRequest = {
            password: formattedData.password
        };

        console.log(authRequest);

        axios.post("http://localhost:8080/api/v1/user/login", authRequest)
            .then((response) => {
                const user = response.data;
                console.log(user);

                localStorage.setItem("id", user.id);
                localStorage.setItem("username", user.username);

                navigate("/");
            })
            .catch(() => alert("Invalid credentials"));
    }

    return (
        <Fragment>
            <LoginNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Log In
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleEdit}>
                            <label htmlFor="password" className="form-label">CNP</label>
                            <input type="text" id="password" name="password" className="form-control" placeholder="CNP" style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
