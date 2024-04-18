import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useState } from 'react';
import axios from "axios";
import checkboxFilled from "../assets/checkboxFilled.svg"
import checkboxEmpty from "../assets/checkboxEmpty.svg"

const WorkoutCard = ({ id, name, muscle, instructions }) => {

    const token = localStorage.getItem('token');
    const [varName, setVarName] = useState(name)
    // const [varMuscle, setVarMuscle] = useState(muscle)
    const [varInstructions, setVarInstructions] = useState(instructions)
    const [done, setDone] = useState(true)
    const [checked, setChecked] = useState(false)
    const config = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    const regenerateExercise = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/workout/userplans/regenerate/${id}/`, config);
            console.log(response);
            setVarName(response.data.exercise.name)
            // setVarMuscle(response.data.exercise.muscle)
            setVarInstructions(response.data.exercise.instructions)
        } catch (error) {
            console.error('Error regenerating workout', error);
        }
    };

    const toggleDone = () => {
        setDone(prevDone => !prevDone);
    }

    const toggleCheck = () => {
        setChecked(prevChecked => !prevChecked)
    }
    
    

    return (
        <Card style={{ margin: "2rem", width: "600px", maxHeight: done ? "110px" : "366px", overflowY: done ? "hidden" : "auto" }}>
            <CardBody>
                <CardTitle>
                    <div style={{ textAlign: "center" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
                    <img src={checked ? checkboxFilled : checkboxEmpty} style={{ width: "32px", height: "32px", borderRadius: "50%" }} onClick={toggleCheck}/>
                    </div>
                        {/* <h3 style={{color: "#2f2f2f"}}>Muscle: {varMuscle}</h3> */}
                        <h4 className="cardName" style={{ textDecoration: checked ? "line-through" : "none", color: checked ? "#6c757d" : "inherit" }}>{varName}</h4>
                        <div className="buttonContainer">
                        <Button disabled={checked ? true : false} className="exerciseButton" onClick={toggleDone}>{done ? "Open" : "Close"}</Button> 
                        <Button disabled={checked ? true : false} className="exerciseButton" onClick={() => regenerateExercise(id)}>Regenerate</Button>
                        </div>
                    </div>
                </CardTitle>
                <div style={{ padding: "1rem", overflowY: "auto", fontFamily: "Courier New"}}>
                    <p>{varInstructions}</p>
                    {/* <Button style={{width: "400px"}} onClick={() => regenerateExercise(id)}>Regenerate Exercise</Button> */}
                </div>
            </CardBody>
        </Card>
    );
};

export default WorkoutCard;
