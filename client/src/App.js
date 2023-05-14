import React,{useState, useEffect} from 'react';
import Category from './Category';

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
} from '@chakra-ui/react';
import { result } from 'lodash';

function App() {
  const [value, setValue] = React.useState('');
  //const handleChange = event => setValue(event.target.value);
  const [data, setdata] = React.useState()

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/addzipcode', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({value: value}),
    })
      //.then(res => console.log(res))
      .then(res => res.json())
      .then
          (data =>{
            body: setdata(data)
            console.log(data)
            
          })
  }

  function handleValue(e) {
    setValue(e.target.value);
  }

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Grid templateColumns="repeat(2, 4fr)" gap={1} padding="0% 15% 0% 15%">
          <GridItem colSpan={2}>
            <Heading textAlign="center" padding="10px 0px 10px 0px" size="xl">
            </Heading>
            <Spacer />
            <Flex justify="center" paddingBottom="10px">
              <form action="" onSubmit={handleSubmit}>
                <Input
                  value={value}
                  onChange={handleValue}
                  placeholder="Enter a zip code"
                  size="lg"
                  width="auto"
                />
              </form>
            </Flex>
          </GridItem>
          <GridItem>
            <Category
              name = "🍽️ Food"
              location= {data[0].name}
              address={data[0].address}
              rating={data[0].rating}
              price={data[0].price}
              url={data[0].url}
              imageUrl={data[0].imageurl}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🚲 Recreation"
              location= {data[1].name}
              address={data[1].address}
              rating={data[1].rating}
              price={data[1].price}
              url={data[1].url}
              imageUrl={data[1].imageurl}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🎥 Arts & Entertainment"
              location= {data[2].name}
              address={data[2].address}
              rating={data[2].rating}
              price={data[2].price}
              url={data[2].url}
              imageUrl={data[2].imageurl}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🛍️ Shopping"
              location= {data[3].name}
              address={data[3].address}
              rating={data[3].rating}
              price={data[3].price}
              url={data[3].url}
              imageUrl={data[3].imageurl}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Flex align="center" justify="center">
              <Button
                color="white"
                colorScheme="teal"
                size="lg"
                justifycontents="flex-start"
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
