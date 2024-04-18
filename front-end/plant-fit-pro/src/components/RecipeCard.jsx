import axios from "axios";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import cross from '../assets/cross.svg'
import close from '../assets/close.svg'


const RecipeCard = ({ id, title, image, removeFromFavorites }) => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Token ${token}`
      }
  };
    const routeRecipe = `/recipes/${id}`;


  const toggleRemove = () => {
    removeFromFavorites(id);
  };
    
    
    return (
        <Card key={id} style={{ margin: "2rem", width: "302px", height: "366px" }}>
                <Button alt="Remove" className="closeButton" onClick={(e) => {toggleRemove(id); e.stopPropagation();}}>
                 X </Button>
              <Link to={routeRecipe} key={id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardImg top src={image} alt={title} style={{ width: "300px", height: "300px" }} />
                </Link>
              <CardBody>
                <CardTitle>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{ marginLeft: "20px" }}>
                    {title}
                </div>
                </div>
                </CardTitle>
              </CardBody>
          </Card>
    )
}

export default RecipeCard;