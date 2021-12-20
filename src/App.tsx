import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Avatar,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
//import data from './launch.json';
import "./App.css";
import { Box } from "@mui/system";
import Done from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Pagination from "@material-ui/lab/Pagination";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Menu, MenuItem } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#005288",
    },
    secondary: {
      main: "#A7A9AC",
    },
  },
});

interface Launch {
  id: string;
  name: string;
  details: string;
  date: string;
  date_unix: number;
  links: {
    patch: {
      large: string;
    };
    article: string;
    flickr?: any;
  };
  success: boolean;
  upcoming: boolean;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {
  let itemLimit = 24;
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function paginate(array: Launch[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const sortByName = () => {
    launches.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setPage(1);
    handleClose();
  };

  const sortByDate = () => {
    launches.sort((a: any, b: any) => (a.date_unix > b.name ? -1 : 1));
    setPage(1);
    handleClose();
  };

  const sortBySuccess = () => {
    launches.sort((a: any, b: any) => {
      return a.success === b.success ? 0 : a.success ? -1 : 1;
    });
    setPage(1);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const url = "https://api.spacexdata.com/v4/launches";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        let sortedJSON = json.sort((a: any, b: any) =>
          a.date_unix > b.date_unix ? -1 : 1
        );
        setLaunches(sortedJSON as any);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={"10vh"} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static" style={{ backgroundColor: "#005288" }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              SpaceX Launch Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justifyContent="right">
          <Box m={1}>
            <Button
              id="demo-positioned-button"
              aria-controls="demo-positioned-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Sort By
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={sortByName}>Name</MenuItem>
              <MenuItem onClick={sortByDate}>Date</MenuItem>
              <MenuItem onClick={sortBySuccess}>Success</MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Box
          m={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container justifyContent="center" spacing={4}>
            {paginate(launches, itemLimit, page).map((launch) => {
              return (
                <Grid key={launch.id} item xs={3}>
                  <LaunchCard
                    id={launch.id}
                    patch={launch.links.patch.large}
                    title={launch.name}
                    date={launch.date_unix}
                    img={launch.links.flickr.original[1]}
                    desc={launch.details}
                    link={launch.links.article}
                    success={launch.success}
                    upcoming={launch.upcoming}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box
          m={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.round(launches.length / itemLimit)}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </Box>
      </div>
    </ThemeProvider>
  );
}

interface LaunchCardProps {
  id: string;
  patch: string;
  title: string;
  date: number;
  img: string;
  desc: string;
  link: string;
  success: boolean;
  upcoming: boolean;
}

function LaunchCard(props: LaunchCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardWidth = 400;
  const milliseconds = props.date * 1000;
  const dateObject = new Date(milliseconds);
  let launchDate = dateObject.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatFirstDesc = (description: string) => {
    if (description.length > 0) {
      let initDescArr = description.split(" ").slice(0, 10);
      let initDesc = initDescArr.join(" ") + "...";
      return initDesc;
    }
  };

  const formatLastDesc = (description: string) => {
    if (description.length > 0) {
      let initDescArr = description.split(" ").slice(10, description.length);
      let initDesc = "..." + initDescArr.join(" ");
      return initDesc;
    }
  };

  return (
    <Card sx={{ maxWidth: cardWidth }}>
      <CardHeader
        avatar={
          props.patch && (
            <Avatar
              sx={{ width: cardWidth / 7, height: cardWidth / 7 }}
              alt="Launch Patch"
              src={props.patch}
            />
          )
        }
        title={props.title}
        subheader={launchDate}
      />
      {props.img && (
        <CardMedia component="img" height={cardWidth / 2} image={props.img} />
      )}
      <Box m={1}>
        <Grid container justifyContent="center">
          {props.success && (
            <Chip label="Successful" color="success" icon={<Done />} />
          )}
          {!props.success && !props.upcoming && (
            <Chip label="Failed" color="error" icon={<ErrorIcon />} />
          )}
          {props.upcoming && <Chip label="Upcoming" color="warning" />}
        </Grid>
      </Box>
      <CardContent>
        <Typography paragraph variant="caption" color="text.secondary">
          Launch ID: {props.id}
        </Typography>
        {props.desc && (
          <Typography
            paragraph
            variant="body2"
            color="text.primary"
            align="left"
          >
            {formatFirstDesc(props.desc)}
          </Typography>
        )}
      </CardContent>
      <Grid>
        <CardActions>
          {props.desc && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )}

          {props.link && (
            <Grid container justifyContent="flex-end">
              <Button size="small" target="_blank" href={props.link}>
                Learn More
              </Button>
            </Grid>
          )}
        </CardActions>
        {props.desc && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography
                paragraph
                variant="body2"
                color="text.primary"
                align="left"
              >
                {formatLastDesc(props.desc)}
              </Typography>
            </CardContent>
          </Collapse>
        )}
      </Grid>
    </Card>
  );
}
export default App;
