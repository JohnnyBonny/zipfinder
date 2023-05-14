import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Button,
  Input,
  Tag,
} from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Input placeholder="Zip Code" size="lg" width="auto" />
      </ChakraProvider>

      <h1>Clothing</h1>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Heading size="md" textAlign="left">
                  Location Name
                </Heading>

                <Text fontSize="md" textAlign="left">
                  1111 Bruh Moment Drive
                </Text>

                <Tag colorScheme="yellow" marginRight="5px">
                  4 / 5★
                </Tag>

                <Tag colorScheme="green" marginRight="5px">
                  $$
                </Tag>

                <Tag colorScheme="blue">Open</Tag>
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  URL
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
