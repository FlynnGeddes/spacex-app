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
	ButtonGroup,
} from "@mui/material";
//import data from './launch.json';
import "./App.css";
import { Box, typography } from "@mui/system";
import Done from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Pagination from "@material-ui/lab/Pagination";

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
		// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
		return array.slice((page_number - 1) * page_size, page_number * page_size);
	}

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
					{paginate(launches, itemLimit, page).map((launch) => {
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

			<Box
				m={1}
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
