import axios from 'axios';
import { api } from '../utilities.jsx'
import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const handleGuestLogin = async () => {
        try {
            const userData = {
                "email": "guest@nonexistentemail.com",
                "password": "xyz123"
            };

            const response = await api.post("/v1/users/login/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { token, display_name } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('display_name', display_name);

            navigate('/');
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                setErrorMessage(errorMessage);
                console.log('Error', errorMessage);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const userData = {
                "email": email,
                "password": password
            };

            let response = await api.post("/v1/users/login/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token, display_name } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('display_name', display_name);
            
            setErrorMessage("");
            setEmail("");
            setPassword("");
            
            navigate('/')
            
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                setErrorMessage(errorMessage);
                console.log('Error', errorMessage);
                } 
        }
    };
    
    return (
        <>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 className="mainH1">Login</h1>
            <Form id="loginForm" style={{width: "300px", marginTop: "20px", marginBottom: "20px"}} onSubmit={handleSubmit}>
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p>Don't have an account?  <Link tag="link" to="/signup">Sign up!</Link></p>
            <Button onClick={handleGuestLogin}>Click here to view the site as a guest</Button>
            </div>
        </>
    )
};

export default Login;