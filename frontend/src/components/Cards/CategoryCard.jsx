import React from "react";
import "../Cards/card.css";
import { Card } from "react-bootstrap";

const CategoryCard = ({ val }) => {
  return (
    <div className="px-2 card-box">
      <Card className="text-center border-0">
        <span className="position-relative">
          <Card.Img variant="top" src={val.image} alt={val.title} />
        </span>
        <Card.Body>
          <h5 className="title">{val.title}</h5>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryCard;