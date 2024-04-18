import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Workouts = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleDropdownSelect = (option) => {
        setErrorMessage("");
        setSuccessMessage("");
        setSelectedOption(option);
    };

    const handleButtonClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/workout/userplans/generate/${selectedOption}_dpw/`, config);
            if (response.status >= 200 && response.status < 300) {
                setLoading(false)
                setSuccessMessage("Workout added to My Workouts!");
            } else {
                setLoading(false)
                setErrorMessage("Failed to add workout. Please try again later.");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setLoading(false)
                setErrorMessage("Workout plan already exists!");
            } else if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setLoading(false)
                setErrorMessage("Failed to add workout. Please try again later.");
            }
        }
    };

    return (
        <div>
            <h2 className="mainH2">Workouts</h2>
            <div style={{ width: "600px", margin: "0 auto", textAlign: "left" }}>
                <p>
                    Welcome to our Workout Generator page, where you can create personalized strength training plans based on your weekly commitment to the gym. Whether you're able to hit the gym two days a week or up to five, our custom-made workout plans are tailored to help you achieve your strength and fitness goals.
                </p>
            </div>
            <h2 className="mainH2">Generate</h2>
            <div className="buttonContainer2">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                        {selectedOption ? `${selectedOption} Days Per Week` : 'Days per Week'}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleDropdownSelect('two')}>2</DropdownItem>
                        <DropdownItem onClick={() => handleDropdownSelect('three')}>3</DropdownItem>
                        <DropdownItem onClick={() => handleDropdownSelect('four')}>4</DropdownItem>
                        <DropdownItem onClick={() => handleDropdownSelect('five')}>5</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button className="generateButton" style={{ marginLeft: "10px" }} onClick={handleButtonClick} disabled={selectedOption ? false : true}>
                    Generate Workout
                </Button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {successMessage && <a href="../myworkouts/"><p style={{ color: '' }}>{successMessage}</p></a>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </>
            )}
        </div>
    );
};

export default Workouts;
