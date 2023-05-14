import React from "react";
import Category from "./Category";

import {
  ChakraProvider,
  theme,
  Heading,
  Spacer,
  Input,
  Flex,
  Grid,
  Button,
} from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Heading textAlign="center" padding="10px 0px 10px 0px" size="xl">
          Zipfinder
        </Heading>
        <Spacer />

        <Flex justify="center" paddingBottom="10px">
          <Input placeholder="Enter a zip code" size="lg" width="auto" />
        </Flex>

        <Grid templateColumns="repeat(2, 2fr)" gap={1} padding="0% 15% 0% 15%">
          <Category name="🍽️ Food" />
          <Category name="🚲 Recreation" />
          <Category name="🎥 Arts & Entertainment" />
          <Category name="🛍️ Shopping" />
        </Grid>

        <div align="center">
          <Button justify="center" color="white" colorScheme="teal" size="lg">
            Refresh all locations
          </Button>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
