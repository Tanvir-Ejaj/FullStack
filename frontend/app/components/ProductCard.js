// "use client";
// import React from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Image from "next/image";

// const ProductCard = ({ data }) => {
//   return data.map((item) => (
//     <Card style={{ width: "18rem" }}>
//       <Image
//         src={`http://localhost:8000${item.image}`}
//         alt="Picture of the author"
//         width={300}
//         height={300}
//       />
//       <Card.Body>
//         <Card.Title>{item.name}</Card.Title>
//         <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
//         <Button variant="primary">Go</Button>
//       </Card.Body>
//     </Card>
//   ));
// };

// export default ProductCard;

"use client";

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from "html-react-parser";

const ProductCard = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <Container>
      <Row>
        {data.map((item) => (
          <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Image
                src={`http://localhost:8000${item.image}`}
                alt={item.name}
                width={300}
                height={300}
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column text-center">
                <Card.Title className="text-center">{item.name}</Card.Title>
                <Card.Text as="span" className="mb-4">
                  {parse(`<span>Description: ${item.description}</span>`)}
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  View Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductCard;
