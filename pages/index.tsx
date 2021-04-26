import { Text } from "@chakra-ui/react";
import Link from "next/link";
import Container from "../components/partials/Container/Container";

const Home = () => {
	return (
		<Container>
			<Text>Welcome to Mipage</Text>
			<Text>Version: alpha 0.0.5</Text>
			<Text>Developed by Nik Vogrinec</Text>
			<a href="https://www.github.com/nikvogri">Github</a>

			<hr />
			<Link href="/pages/new">
				<a>Create new page</a>
			</Link>
		</Container>
	);
};

export default Home;
