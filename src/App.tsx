import React from 'react';
import {Card, CardContent, CardActions, CardHeader, Typography, Avatar, CardMedia, Grid, Button} from '@mui/material';
import data from './launch.json';
import './App.css';
import { Box } from '@mui/system';

function App() {
    return (
      <div className="App">
        <Grid container justifyContent="center" spacing={4}> 
        { data.map(launch => {
          return(
              <Grid item xs={3}>
              <LaunchCard id={launch.id} patch={launch.links.patch.large} title={launch.name} date={launch.date_unix} img={launch.links.flickr.original[1]} desc={launch.details} link={launch.links.article}/> 
              </Grid>
           
          )})
        }
        
        { data.map(launch => {
          return(
              <Grid item xs={3}>
              <LaunchCard id={launch.id} patch={launch.links.patch.large} title={launch.name} date={launch.date_unix} img={launch.links.flickr.original[1]} desc={launch.details} link={launch.links.article}/> 
              </Grid>
           
          )})
        }
        </Grid>
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
  const cardWidth = 345
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
        alt="Rocket Picture"
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
