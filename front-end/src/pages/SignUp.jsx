import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            const userData = {
                "email": email,
                "display_name": displayName,
                "password": password
            };

            let response = await axios.post("http://127.0.0.1:8000/api/v1/users/signup/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token, display_name } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('display_name', display_name);

            setErrorMessage("");
            setSuccessMessage("Sign up successful!");
            setDisplayName("");
            setEmail("");
            setPassword("");
            
            setTimeout(() => {
                navigate("/");
            }, 2000);

            console.log(response)

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                if (errorMessage && errorMessage.message === "User with this Email already exists.") {
                    setErrorMessage(errorMessage.message);
                } else {
                    console.log('Error', errorMessage);
                }
            } else {
                console.log('Error', error.message);
            }
        }
    };

    return (
        <>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 className="mainH1">Sign Up</h1>
                <Form style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }} onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label
                            for="exampleDisplayName"
                            hidden
                        >
                            Display Name
                        </Label>
                        <Input
                            id="exampleDisplayName"
                            name="displayName"
                            placeholder="Display Name"
                            type="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label
                            for="exampleEmail"
                            hidden
                        >
                            Email
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label
                            for="examplePassword"
                            hidden
                        >
                            Password
                        </Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <Button type="Submit">Submit</Button>
                </Form>
                {successMessage ? (
                    <>
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    </>
                ) : (
                    <>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <p>Already have an account? <Link tag="link" to="/login">Log in!</Link></p>
                    </>
                )}
            </div>
        </>
    )
};

export default SignUp;
