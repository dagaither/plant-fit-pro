import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className="mainLogo">
    <Link tag="link" to="/recipes">
    <img src={blender} className="logo" alt="Vite logo" />
    </Link>
    <Link tag="link" to="/workout">
    <img src={dumbbell} className="logo react"/>
    </Link>
    </div>
    <h1 className="mainH1">PlantFitPro</h1>
    <VideoComponent />
    </>
    )
};

export default HomePage;