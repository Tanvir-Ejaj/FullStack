"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";

const ProductCard = ({ data }) => {
  return data.map((item) => (
    <Card style={{ width: "18rem" }}>
      <Image
        src={`http://localhost:8000${item.image}`}
        alt="Picture of the author"
        width={300}
        height={300}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
        <Button variant="primary">Go</Button>
      </Card.Body>
    </Card>
  ));
};

export default ProductCard;
