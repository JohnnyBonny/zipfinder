import {
  Box,
  Text,
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  Button,
  Tag,
  Spacer,
} from "@chakra-ui/react";

const Place = (props) => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={props.imageUrl}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md" textAlign="left">
              {props.location}
            </Heading>

            <Text fontSize="md" textAlign="left">
              {props.address}
            </Text>

            <div align="left">
              <Tag colorScheme="yellow" marginRight="5px">
                {props.rating} / 5★
              </Tag>

              <Tag colorScheme="green" marginRight="5px">
                {props.price}
              </Tag>

              <Spacer />

              <Button variant="solid" colorScheme="red" as="a" href={props.url}>
                Link to Yelp
              </Button>
            </div>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default Place;
