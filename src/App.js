import React from "react";
import Category from "./Category";

import {
  ChakraProvider,
  theme,
  Heading,
  Spacer,
  Input,
  Flex,
} from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Heading textAlign="center">Zipfinder</Heading>
        <Spacer />

        <Flex justify="center">
          <Input placeholder="Enter a zip code" size="lg" width="auto" />
        </Flex>

        <Category name='Food' loc='Placeholder'/>
        <Category name='Shopping' />

      </ChakraProvider>
    </div>
  );
}

export default App;
