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
import FilterListIcon from "@mui/icons-material/FilterList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles({
  root: {
    borderRadius: 40,
    background: "linear-gradient(45deg,#b5b5b3, #ffffff);",
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
  const [openDialog, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
    setLaunches(
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
      })
    );
    setPage(1);
    handleClose();
  };

  const sortByName2 = () => {
    setLaunches(
      launches.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      })
    );
    setPage(1);
    handleClose();
  };

  const sortByDate = () => {
    setLaunches(
      launches.sort((a: any, b: any) => (a.date_unix > b.date_unix ? -1 : 1))
    );
    setPage(1);
    handleClose();
  };

  const sortByDate2 = () => {
    setLaunches(
      launches.sort((a: any, b: any) => (a.date_unix < b.date_unix ? -1 : 1))
    );
    setPage(1);
    handleClose();
  };

  const sortBySuccess = () => {
    setLaunches(
      launches.sort((a: any, b: any) => {
        return a.success === b.success ? 0 : a.success ? -1 : 1;
      })
    );
    setPage(1);
    handleClose();
  };

  const sortBySuccess2 = () => {
    setLaunches(
      launches.sort((a: any, b: any) => {
        return a.success === b.success ? 0 : b.success ? -1 : 1;
      })
    );
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
            <Box sx={{ flexGrow: 1 }} textAlign="left">
              <Button href="/spacex-app" style={{ textTransform: "none" }}>
                <Typography
                  variant="h6"
                  style={{ color: "#ffffff", textAlign: "left" }}
                  component="div"
                >
                  SpaceX Launch Tracker
                </Typography>
              </Button>
            </Box>
            <Box
              m={2}
              pt={3}
              sx={{ maxHeight: 15, display: "flex", p: 1, m: 1 }}
            >
              <Button
                onClick={handleDialogOpen}
                size="large"
                color="inherit"
                style={{ color: "white" }}
              >
                About
              </Button>
            </Box>

            <Dialog
              open={openDialog}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"SpaceX Launch Tracker By Flynn Geddes"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  My first react app developed as part of upskilling for my
                  apprenticeship. This app was made to help me to learn
                  Typescript, React and API usage.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  target="_blank"
                  href={"https://github.com/FlynnGeddes/spacex-app"}
                  style={{ color: "dodgerblue" }}
                >
                  Github
                </Button>
                <Button
                  target="_blank"
                  href={"https://api.spacexdata.com/v4/launches"}
                  style={{ color: "dodgerblue" }}
                >
                  API
                </Button>
              </DialogActions>
            </Dialog>

            <Box
              m={2}
              pt={3}
              sx={{ maxHeight: 15, display: "flex", p: 1, m: 1 }}
            >
              <Button
                size="large"
                style={{ color: "white" }}
                id="demo-positioned-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Sort By
                <FilterListIcon style={{ paddingLeft: 5 }} />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={sortByName}>Name (A-Z)</MenuItem>
                <MenuItem onClick={sortByName2}>Name (Z-A)</MenuItem>
                <MenuItem onClick={sortByDate}>Date (New-Old)</MenuItem>
                <MenuItem onClick={sortByDate2}>Date (Old-New)</MenuItem>
                <MenuItem onClick={sortBySuccess}>Success (Fail Last)</MenuItem>
                <MenuItem onClick={sortBySuccess2}>
                  Success (Fail First)
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
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
            count={Math.ceil(launches.length / itemLimit)}
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

  const cardWidth = window.screen.width / 4;
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

  const classes = useStyles();

  return (
    <Card className={classes.root} sx={{ maxWidth: cardWidth }}>
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
            <Box sx={{ m: 1 }}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
          )}

          {props.link && (
            <Grid container justifyContent="flex-end">
              <Box sx={{ m: 1 }}>
                <Button size="small" target="_blank" href={props.link}>
                  Learn More
                </Button>
              </Box>
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
