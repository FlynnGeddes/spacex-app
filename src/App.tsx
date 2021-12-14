import React, { useState, useEffect } from 'react';
import {Card, CardContent, CardActions, CardHeader, Typography, Avatar, CardMedia, Grid, Button, CircularProgress} from '@mui/material';
//import data from './launch.json';
import './App.css';
import { Box } from '@mui/system';


interface Launch {
  id: string
  name: string
  details: string
  date: string
  date_unix: number
  links: {
    patch: {
      large: string
    }
    article: string
    flickr?: any
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    const url = "https://api.spacexdata.com/v4/launches";
    const fetchData = async () => {
      try{
        const response = await fetch(url);
        const json = await response.json()
        setLaunches(json as any);
        setLoading(false);
      }catch(error){
        console.log("error:", error)
      }
    }
    fetchData();
  }, []);
    


  if (loading) {
    return (
      <Box sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress size={'10vh'} />
      </Box>
    )
  }

    return (
      <div className="App">
        <Box m={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Grid container justifyContent="center" spacing={4}> 
        { launches.map(launch => {
          return(
              <Grid item xs={3}>
              <LaunchCard
                id={launch.id}
                patch={launch.links.patch.large}
                title={launch.name}
                date={launch.date_unix}
                img={launch.links.flickr.original[1]}
                desc={launch.details}
                link={launch.links.article}
              /> 
              </Grid>
           
          )})
        }
        </Grid>
        </Box>
      </div>
    );
  
}
interface LaunchCardProps {
  id: string
  patch: string 
  title: string
  date: number
  img: string
  desc: string 
  link: string
}


function LaunchCard(props: LaunchCardProps) {
  const cardWidth = 400
  const milliseconds = props.date * 1000
  const dateObject = new Date(milliseconds)
  let launchDate = dateObject.toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric"})
   
  return (
    <Card sx={{ maxWidth: cardWidth }}>
    <CardHeader
      avatar={
        <Avatar sx={{ width: cardWidth/5, height: cardWidth/5}} alt="Launch Patch" src={props.patch} />
      }
      title={props.title}
      subheader={launchDate}
    />
    <CardMedia
        component="img"
        height={cardWidth/2}
        image={props.img}
        alt="No Image Available"
      />
    <CardContent>
    <Typography paragraph variant="caption" color="text.secondary">Launch ID: {props.id}</Typography>
    <Typography paragraph variant="body2" color="text.primary" align="left">{props.desc}</Typography>
    <CardActions>
        <Grid container justifyContent="flex-end">
        <Button size="small" target="_blank" href={props.link}>Learn More</Button>
        </Grid>
      </CardActions>
    </CardContent>
    </Card>
  )
}
export default App;
