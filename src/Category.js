import Place from "./Place";
import { Grid, Heading } from "@chakra-ui/react";

const Category = (props) => {
  return (
    <div style={{ padding: "0px 25px 25px 25px" }}>
      <Heading paddingBottom="10px">{props.name}</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Place />
        <Place />
        <Place />
      </Grid>
    </div>
  );
};

export default Category;
