import React from 'react';
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

function App() {
  const [value, setValue] = React.useState('');
  const handleChange = event => setValue(event.target.value);
  let toDisplay = JSON.parse('{"MESSAGE":"Successful retrieval","RESULT":[{"address":["905 Embarcadero Del Norte","Isla Vista, ' + 
    'CA 93117"],"imageurl":"https://s3-media2.fl.yelpcdn.com/bphoto/azxovmSN1Plm4iqCAGBDqA/o.jpg","name":"IV Drip","price":"$",' + 
    '"rating":4.0,"url":"https://www.yelp.com/biz/iv-drip-isla-vista-2?adjust_creative=E3qInhZC9uMgEEvM_F-7Gg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=E3qInhZC9uMgEEvM_F-7Gg"}' + 
    ',{"address":["2948 San Marcos Ave","Ste E","Los Olivos, CA 93441"],"imageurl":"https://s3-media2.fl.yelpcdn.com/bphoto/' + 
    'NXXGG-wVUjjn9ajhiTZldg/o.jpg","name":"Pedego Electric Bikes Los Olivos","price":"$$","rating":5.0,"url":"https://www.yelp.com/' + 
    'biz/pedego-electric-bikes-los-olivos-los-olivos?adjust_creative=E3qInhZC9uMgEEvM_F-7Gg&utm_campaign=yelp_api_v3&utm_medium=api_v3' + 
    '_business_search&utm_source=E3qInhZC9uMgEEvM_F-7Gg"},{"address":["5330 Debbie Rd","Ste 200","Santa Barbara, CA 93111"],' + 
    '"imageurl":"https://s3-media2.fl.yelpcdn.com/bphoto/_9j79jlVbHjSGzLiC7Aw-Q/o.jpg","name":"Gold Medal Wine Club","price":"N/A"' + 
    ',"rating":4.5,"url":"https://www.yelp.com/biz/gold-medal-wine-club-santa-barbara?adjust_creative=E3qInhZC9uMgEEvM_F-7Gg&utm_' + 
    'campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=E3qInhZC9uMgEEvM_F-7Gg"},{"address":["29 S Fairview Ave",' + 
    '"Goleta, CA 93117"],"imageurl":"https://s3-media2.fl.yelpcdn.com/bphoto/O5bWVv_wP5vHNURpUuELXQ/o.jpg","name":"Island Seed & Feed"' + 
    ',"price":"$$","rating":5.0,"url":"https://www.yelp.com/biz/island-seed-and-feed-goleta?adjust_creative=E3qInhZC9uMgEEvM_F' + 
    '-7Gg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=E3qInhZC9uMgEEvM_F-7Gg"}]}')

  async function getReplyAsynch() {
    try {
      const response = await fetch('http://127.0.0.1:5000/addzipcode');
      console.log(response)
      const responseJson = await response.json();
      console.log("Got the JSON!")
      console.log(responseJson)
      return responseJson;
    } catch (error) {
      console.error(error);
    }
 }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('http://127.0.0.1:5000/addzipcode', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({value: value}),
    })
    setTimeout(() => {
      console.log('1 second passed; reaching out for reply.');
    }, 1000);
    toDisplay = await getReplyAsynch()
    console.log(toDisplay)
      //.then(res => console.log(res))
      //.then(res => res.json())
      //.then(res => console.log(res));
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
              Zipfinder
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
              name="🍽️ Food"
              location={toDisplay.RESULT[0].name}
              address={toDisplay.RESULT[0].address}
              rating={toDisplay.RESULT[0].rating}
              price={toDisplay.RESULT[0].price}
              url={toDisplay.RESULT[0].imageurl}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🚲 Recreation"
              location={toDisplay.RESULT[1].name}
              address={toDisplay.RESULT[1].address}
              rating={toDisplay.RESULT[1].rating}
              price={toDisplay.RESULT[1].price}
              url={toDisplay.RESULT[1].imageurl}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🎥 Arts & Entertainment"
              location={toDisplay.RESULT[2].name}
              address={toDisplay.RESULT[2].address}
              rating={toDisplay.RESULT[2].rating}
              price={toDisplay.RESULT[2].price}
              url={toDisplay.RESULT[2].imageurl}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🛍️ Shopping"
              location={toDisplay.RESULT[3].name}
              address={toDisplay.RESULT[3].address}
              rating={toDisplay.RESULT[3].rating}
              price={toDisplay.RESULT[3].price}
              url={toDisplay.RESULT[3].imageurl}
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
