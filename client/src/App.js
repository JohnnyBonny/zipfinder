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
  const [value, setValue] = React.useState('93116');
  //const handleChange = event => setValue(event.target.value);
  const [data, setdata] = React.useState()

  const backup = JSON.parse('{"MESSAGE":"Successful retrieval","RESULT":[{"address":["905 Embarcadero Del Norte","Isla Vista, ' + 
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
    '-7Gg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=E3qInhZC9uMgEEvM_F-7Gg"}]}');
  
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

  function backupData(newData, idx, attribute) {
    try {
      return (newData[idx][attribute]);
    } catch (e) {
      return (backup["RESULT"][idx][attribute]);
    }
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
              location={backupData(data, 0, "name")}
              address={backupData(data, 0, "address")}
              rating={backupData(data, 0, "rating")}
              price={backupData(data, 0, "price")}
              url={backupData(data, 0, "url")}
              imageUrl={backupData(data, 0, "imageurl")}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🚲 Recreation"
              location={backupData(data, 1, "name")}
              address={backupData(data, 1, "address")}
              rating={backupData(data, 1, "rating")}
              price={backupData(data, 1, "price")}
              url={backupData(data, 1, "url")}
              imageUrl={backupData(data, 1, "imageurl")}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🎥 Arts & Entertainment"
              location={backupData(data, 2, "name")}
              address={backupData(data, 2, "address")}
              rating={backupData(data, 2, "rating")}
              price={backupData(data, 2, "price")}
              url={backupData(data, 2, "url")}
              imageUrl={backupData(data, 2, "imageurl")}
            />
          </GridItem>
          <GridItem>
            <Category
              name="🛍️ Shopping"
              location={backupData(data, 3, "name")}
              address={backupData(data, 3, "address")}
              rating={backupData(data, 3, "rating")}
              price={backupData(data, 3, "price")}
              url={backupData(data, 3, "url")}
              imageUrl={backupData(data, 3, "imageurl")}
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
