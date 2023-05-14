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
  GridItem,
  Button,
} from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Grid templateColumns="repeat(2, 4fr)" gap={1} padding="0% 15% 0% 15%">
          <GridItem colSpan={2}>
            <Heading textAlign="center" padding="10px 0px 10px 0px" size="xl">
              Zipfinder
            </Heading>
            <Spacer />
            <Flex justify="center" paddingBottom="10px">
              <Input placeholder="Enter a zip code" size="lg" width="auto" />
            </Flex>
          </GridItem>
          <GridItem>
            <Category
              name="🍽️ Food"
              location="Location 1"
              address="1111 Bruh Moment Drive"
              rating="4"
              price="$$"
              url="http://google.com"
            />
          </GridItem>
          <GridItem>
            <Category
              name="🚲 Recreation"
              location="Location 2"
              address="1111 Bruh Moment Drive"
              rating="4"
              price="$$"
              url="http://facebook.com"
            />
          </GridItem>
          <GridItem>
            <Category
              name="🎥 Arts & Entertainment"
              location="Location 3"
              address="1111 Bruh Moment Drive"
              rating="4"
              price="$$$"
              url="http://linkedin.com"
            />
          </GridItem>
          <GridItem>
            <Category
              name="🛍️ Shopping"
              location="Location 4"
              address="1111 Bruh Moment Drive"
              rating="4"
              price="$"
              url="http://twitter.com"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Flex align="center" justify="center">
              <Button
                color="white"
                colorScheme="teal"
                size="lg"
                justifyContents="flex-start"
                marginBottom="10px"
              >
                Refresh all locations
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </ChakraProvider>
    </div>
  );
}

export default App;
