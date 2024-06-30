import { Button } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const TestView = () => {
  const { id } = useParams();
  return (
    <div>
      id producto {id}
      <Button>hola</Button>
    </div>
  );
};

export default TestView;
