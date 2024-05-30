import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { api } from '../utilities.jsx';

const Workouts = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [workoutIds, setWorkoutIds] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleDropdownSelect = (option) => {
        setErrorMessage("");
        setSuccessMessage("");
        setSelectedOption(option);
    };

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await api.get('/v1/workout/userplans/all/', config);
                const sortedWorkoutIds = response.data.workout_routines.sort((a, b) => {
                    return a.days.length - b.days.length;
                });
                setWorkoutIds(sortedWorkoutIds);
                console.log(sortedWorkoutIds)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching workouts', error);
            }
        };
        fetchWorkouts();
    }, []);

    const handleButtonClick = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/v1/workout/userplans/generate/${selectedOption}_dpw/`, config);
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

    const isOptionDisabled = (type) => {
        return workoutIds.some(workout => workout.workout_type === type);
    };

    const handleMyWorkoutsClick = () => {
        navigate('/myworkouts');
    };

    return (
        <div>
            <h2 className="mainH2">Workouts</h2>
            <Card className="homeCard">
                <CardBody>
                    <CardTitle>
                        <div style={{ textAlign: "center", fontFamily: "Courier New" }}>
                            Use our Workout Generator to create personalized strength training plans based on your weekly commitment to the gym. Whether you're able to hit the gym two days a week or up to five, our custom-made workout plans are tailored to help you achieve your strength and fitness goals.
                        </div>
                    </CardTitle>
                </CardBody>
            </Card>

            <h2 className="mainH2">Generate</h2>
            <div className="buttonContainer2">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                        {selectedOption ? `${selectedOption} Days / Week` : 'Days per Week'}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            disabled={isOptionDisabled('2 Days Per Week')}
                            onClick={() => handleDropdownSelect('two')}>
                            2 {isOptionDisabled('2 Days Per Week') && '(Exists)'}
                        </DropdownItem>
                        <DropdownItem
                            disabled={isOptionDisabled('3 Days Per Week')}
                            onClick={() => handleDropdownSelect('three')}>
                            3 {isOptionDisabled('3 Days Per Week') && '(Exists)'}
                        </DropdownItem>
                        <DropdownItem
                            disabled={isOptionDisabled('4 Days Per Week')}
                            onClick={() => handleDropdownSelect('four')}>
                            4 {isOptionDisabled('4 Days Per Week') && '(Exists)'}
                        </DropdownItem>
                        <DropdownItem
                            disabled={isOptionDisabled('5 Days Per Week')}
                            onClick={() => handleDropdownSelect('five')}>
                            5 {isOptionDisabled('5 Days Per Week') && '(Exists)'}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button className="generateButton" style={{ marginLeft: "10px" }} onClick={handleButtonClick} disabled={selectedOption ? false : true}>
                    Generate Workout
                </Button><br /><br />
                <Button className="generateButton" style={{ marginLeft: "10px" }} onClick={handleMyWorkoutsClick}>
                    My Workouts
                </Button><br /><br />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {successMessage && <Link tag={Link} to="/myworkouts"><p style={{ color: '' }}>{successMessage}</p></Link>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </>
            )}
        </div>
    );
};

export default Workouts;
