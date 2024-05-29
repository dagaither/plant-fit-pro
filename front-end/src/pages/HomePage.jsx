import { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { Card, CardBody, CardTitle } from 'reactstrap'
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
    <Link tag="link" to="/workout">
    <img src={dumbbell} className="logo react"/>
    </Link>
    </div>
    <div style={{display: "flex", flexDirection: "column"}}>
    <h1 className="mainH1">PlantFitPro</h1>
    {/* <VideoComponent /> */}
    <Card className="homeCard">
                <CardBody>
                    <CardTitle>
                        <div style={{ textAlign: "center" }}>
                        Welcome to our innovative plant-based fitness and nutrition app! We offer personalized fitness plans tailored to users' goals plus a library of over 350 healthy plant-based recipes from Michelin rated chefs!  Start generating plans and recipes now!
                        </div>
                    </CardTitle>
                </CardBody>
            </Card>
    </div>
    </>
    )
};

export default HomePage;