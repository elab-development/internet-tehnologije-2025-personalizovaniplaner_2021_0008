import React from "react";
import "../Cards/card.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryCard = ({ val }) => {
  const getCategoryLink = (title) => {
    if (title === 'Planners') return '/shop/planners';
    if (title === 'Planner pages') return '/shop/pages';
    if (title === 'Stationery') return '/shop/stationery';
    return '/shop';
  };

  return (
    <Link to={getCategoryLink(val.title)} className="text-decoration-none">
      <div className="px-2 card-box">
        <Card className="text-center border-0" style={{ cursor: 'pointer' }}>
          <span className="position-relative">
            <Card.Img variant="top" src={val.image} alt={val.title} />
          </span>
          <Card.Body>
            <h5 className="title">{val.title}</h5>
            <p className="category-description">{val.description}</p>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
};

export default CategoryCard;
