import Place from "./Place";
import { GridItem, Heading } from "@chakra-ui/react";

const Category = (props) => {
  return (
    <div style={{ padding: "0px 25px 25px 25px" }}>
      <Heading paddingBottom="10px" size="lg" textAlign="center">
        {props.name}
      </Heading>
      <GridItem>
        <Place
          location={props.location}
          address={props.address}
          rating={props.rating}
          price={props.price}
          url={props.url}
        />
      </GridItem>
    </div>
  );
};

export default Category;
