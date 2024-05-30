import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../utilities.jsx'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import WorkoutCard from '../components/WorkoutCard';
import dumbbell from '../assets/dumbbell3.svg'


const MyWorkouts = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [workoutIds, setWorkoutIds] = useState([]);
    const [activeWorkoutId, setActiveWorkoutId] = useState("");
    const [currentWorkout, setCurrentWorkout] = useState({});
    const [loading, setLoading] = useState(false);
    const [exerciseId, setExerciseId] = useState("");

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleDropdownSelect = (workoutId, workoutType) => {
        setSelectedOption(workoutType);
        setActiveWorkoutId(workoutId);
        fetchWorkout(workoutId);
    };

    const handleDeletePlan = async () => {
        try {
            const response = await api.delete(`/v1/workout/userplans/delete/${activeWorkoutId}/`, config);
            console.log(response);
            const updatedWorkoutIds = workoutIds.filter(workout => workout.id !== activeWorkoutId);
            setWorkoutIds(updatedWorkoutIds)
            setSelectedOption(null)
            setCurrentWorkout({});
            setActiveWorkoutId("");
        } catch (error) {
            console.error('Error deleting workout', error);
        }
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await api.get('/v1/workout/userplans/all/', config);
                const sortedWorkoutIds = response.data.workout_routines.sort((a,b) => {
                    return a.days.length -  b.days.length;
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

    const fetchWorkout = async (workoutId) => {
        try {
            setLoading(true);
            const response = await api.get(`/v1/workout/userplans/${workoutId}/`, config);
            setCurrentWorkout(response.data);
        } catch (error) {
            console.error('Error fetching workout', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {workoutIds.length > 0 ? (
        <>
            <h2 className="mainH2">My Workouts</h2>
            <Card className="homeCard">
            <CardBody>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CardTitle style={{ marginBottom: "0px", flex: 1 }}>
                        <div style={{ textAlign: "left", fontFamily: "Courier New", fontWeight: "bold" }}>
                            Use the dropdown to load your saved workout routines.  In the gym?  Check off each exercise as you complete them!
                        </div>
                    </CardTitle>
                    <img src={dumbbell} alt="Dumbbell" style={{ marginLeft: '20px', width: '100px', height: '100px' }} />
                </div>
            </CardBody>
        </Card>
            {/* <strong> In the gym?  Check each exercise off when finished! </strong> */}
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{marginTop: "20px", marginBottom: "20px"}}>
                <DropdownToggle caret>
                    {selectedOption !== null ? `${selectedOption}` : 'Saved Routines'}
                </DropdownToggle>
                <DropdownMenu>
                    {workoutIds.map(workout => (
                        <DropdownItem key={workout.id} onClick={() => handleDropdownSelect(workout.id, workout.workout_type)}>
                            {workout.workout_type}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </>
    ) : (
        <>
            <h2 className="mainH2">No Workouts</h2>
            <a href="../workouts/"><h4>Click here to generate!</h4></a>
        </>
    )} 
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {currentWorkout.days && currentWorkout.days.map(day => (
                        <div key={day.day}>
                            <hr></hr>
                            <h2 style={{marginBottom: "10px"}}>{day.day}</h2>
                            <hr></hr>
                            {day.muscles && day.muscles.map(muscle => (
                                <div key={muscle.muscle}>
                                    <h2 style={{color: "#97ce00"}}>{muscle.muscle}</h2>

                                    {muscle.exercises && muscle.exercises.map(exerciseObj => (
                                        <div key={exerciseObj.exercise.name}>
                                            <WorkoutCard
                                                id={exerciseObj["id"]}
                                                name={exerciseObj.exercise.name}
                                                muscle={exerciseObj.exercise.muscle}
                                                instructions={exerciseObj.exercise.instructions}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                    <hr></hr>
                    {currentWorkout.id ? 
                    <Button color="danger" className="deletePlan" onClick={handleDeletePlan}>Delete Plan</Button>
                    : null}
                    <hr></hr>
                </div>
            )}
        </div>
    );
};

export default MyWorkouts;
