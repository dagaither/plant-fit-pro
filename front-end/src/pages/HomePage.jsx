import { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Button } from 'reactstrap'
import rickLogo from '../assets/rick-svgrepo-com.svg'
import mortyLogo from '../assets/morty-svgrepo-com.svg'
import juice from '../assets/juice.svg'
import juicer from '../assets/juicer.svg'
import blender from '../assets/blender5.svg'
import coconut from '../assets/coconut.svg'
import dumbbell from '../assets/dumbbell3.svg'
import carrot from '../assets/carrot.svg'
import VideoComponent from '../VideoComponent'



const HomePage = () => {
    return (
    <>
    <div style={{maxWidth: "100%", margin: "0 auto"}}>
    <Link tag="link" to="/recipes">
    <img src={blender} className="logo" alt="Vite logo" />
    </Link>
    <Link tag="link" to="/workouts">
    <img src={dumbbell} className="logo react"/>
    </Link>
    </div>
    <div style={{display: "flex", flexDirection: "column"}}>
    <h1 className="mainH1">PlantFitPro</h1>
    {/* <VideoComponent /> */}
    <Card className="homeCard" style={{marginTop: "10px"}}>
                <CardBody>
                    <CardTitle>
                        <div style={{ textAlign: "center", fontFamily: "Courier New", fontWeight: "bold" }}>
                        Welcome to our plant-based fitness and nutrition app! We create personalized fitness plans tailored to work with your busy schedule plus a library of over 350 healthy plant-based recipes from Michelin rated chefs!  
                        <br/><br/>Explore the navigation bar to browse and favorite recipes, generate workout routines, and managed saved routines.
                        </div>
                    </CardTitle>
                </CardBody>
            </Card>
    </div>
    </>
    )
};

export default HomePage;