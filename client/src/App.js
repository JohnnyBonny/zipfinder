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
          <Category
            name="🍽️ Food"
            location="Location 1"
            address="1111 Bruh Moment Drive"
            rating="4"
            price="$$"
            isOpen="Open"
            url="http://google.com"
          />
          <Category
            name="🚲 Recreation"
            location="Location 2"
            address="1111 Bruh Moment Drive"
            rating="4"
            price="$$"
            isOpen="Open"
            url="http://facebook.com"
          />
          <Category
            name="🎥 Arts & Entertainment"
            location="Location 3"
            address="1111 Bruh Moment Drive"
            rating="4"
            price="$$$"
            isOpen="Open"
            url="http://linkedin.com"
          />
          <Category
            name="🛍️ Shopping"
            location="Location 4"
            address="1111 Bruh Moment Drive"
            rating="4"
            price="$"
            isOpen="Open"
            url="http://twitter.com"
          />
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
