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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

function App() {
	const [loading, setLoading] = useState(true);
	const [launches, setLaunches] = useState<Launch[]>([]);

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
		<div className="App">
			<Box
				m={3}
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<Grid container justifyContent="center" spacing={4}>
					{launches.map((launch) => {
						return (
							<Grid item xs={3}>
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
		</div>
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
	const cardWidth = 400;
	const milliseconds = props.date * 1000;
	const dateObject = new Date(milliseconds);
	let launchDate = dateObject.toLocaleString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

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
				<CardMedia
					component="img"
					height={cardWidth / 2}
					image={
						props.img ||
						"https://www.doz.com/cms/wp-content/uploads/2015/03/spacex-logo.jpg"
					}
					alt="No Image Available"
				/>
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
				<Typography paragraph variant="body2" color="text.primary" align="left">
					{props.desc}
				</Typography>
				{props.link && (
					<Grid>
						<CardActions>
							<Grid container justifyContent="flex-end">
								<Button size="small" target="_blank" href={props.link}>
									Learn More
								</Button>
							</Grid>
						</CardActions>
					</Grid>
				)}
			</CardContent>
		</Card>
	);
}
export default App;
