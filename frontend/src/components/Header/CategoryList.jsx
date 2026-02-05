import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { categoriesData } from "../../utils/data";


const CategoryList = () => {

    const [showCat, setShowCat] = useState(false)

    const handleClick=()=>{
        if(window.innerWidth <= 1199){
            setShowCat(!showCat);
        }
    }

    //Pronalazenje rute za svaku kategoriju
    const getCategoryRoute = (title) => {
        switch(title.toLowerCase()) {
            case "planners":
                return "/shop/planners";
            case "planner pages":
                return "/shop/pages";
            case "stationery":
                return "/shop/stationery";
            default:
                return "/shop";
        }
    }

    return (
        <>
    <Dropdown
    className="me-2 py-1"
    onMouseEnter={()=>
        window.innerWidth <= 1199 ? "" : setShowCat(true)
    }
    onMouseLeave={()=>
        window.innerWidth <= 1199 ? "" : setShowCat(false)
    }
    >
      <Dropdown.Toggle variant="success" id="cat" className="w-100 btn primary-btn">
       <i className="bi bi-ui-radios-grid me-2"></i> Categories
      </Dropdown.Toggle>

      <Dropdown.Menu align='start' show={showCat}> 
        {categoriesData.map((val, index)=>{
            return(
        <Link to={getCategoryRoute(val.title)} key={index} className="dropdown-item body-text py-2">
        {val.title}
        </Link>
            )
        })}
      </Dropdown.Menu>
    </Dropdown>
        </>
    )
}

export default CategoryList