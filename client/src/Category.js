import Place from "./Place";
import { Grid, Heading } from "@chakra-ui/react";

const Category = (props) => {
  return (
    <div style={{ padding: "0px 25px 25px 25px" }}>
      <Heading paddingBottom="10px" size="lg" textAlign="center">{props.name}</Heading>
      <Grid>
        <Place location={props.location} address={props.address} rating={props.rating} price={props.price} isOpen={props.isOpen} url={props.url}/>
      </Grid>
    </div>
  );
};

export default Category;
