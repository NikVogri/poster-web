import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikValues } from "formik";

import { useState } from "react";
import SelectCard from "../../components/form/SelectCard";
import Container from "../../components/partials/Container/Container";
import useApi from "../../components/hooks/useApi";
import createToast from "../../helpers/toast";
import { useRouter } from "next/router";
import { PageType } from "../../interfaces/page";

const pageValidationSchema = Yup.object().shape({
	title: Yup.string()
		.max(255, "Title can't be longer than 255 characters")
		.required("Title is required"),
});

const NewPage = () => {
	const [selectedPageType, setSelectedPageType] = useState<
		"notebook" | "todo"
	>("notebook");
	const [isPrivate, setIsPrivate] = useState<boolean>(true);

	const { api, loading } = useApi();
	const router = useRouter();

	const handleCreatePage = async (e: FormikValues) => {
		const data = {
			isPrivate,
			type: selectedPageType,
			title: e.title,
		};

		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages`,
			"post",
			true,
			data
		);

		if (res.success) {
			createToast(
				"Page created",
				"Your page has been successfully created",
				"success"
			);

			router.push(`/pages/${res.page.id}`);
		}
	};
	return (
		<Container>
			<Text fontSize="3xl" mb={5} fontWeight="700">
				Create a new page
			</Text>
			<Formik
				initialValues={{ title: "", isPrivate: false }}
				validationSchema={pageValidationSchema}
				onSubmit={handleCreatePage}
			>
				<Form>
					<Field name="title">
						{({ field, form }) => (
							<FormControl
								isRequired
								isInvalid={
									form.errors.title && form.touched.title
								}
							>
								<FormLabel>Title</FormLabel>
								<Input
									type="title"
									required
									placeholder="title"
									{...field}
								/>
								<FormErrorMessage>
									{form.errors.title}
								</FormErrorMessage>
							</FormControl>
						)}
					</Field>

					<Text mb={5}>Select the type of page</Text>
					<Flex mx="auto" flexDir="column" alignItems="center">
						<Flex mb={5}>
							<SelectCard
								id="notebook"
								isActive={
									selectedPageType === PageType.Notebook
								}
								type="page"
								onSelect={() =>
									setSelectedPageType(PageType.Notebook)
								}
							>
								<Text fontSize="lg" fontWeight="500" mb={3}>
									Notebook
								</Text>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="48"
									viewBox="0 0 576 512"
								>
									<title>book-open</title>
									<g fill="#303030">
										<path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path>
									</g>
								</svg>
							</SelectCard>
							<SelectCard
								id="todo"
								isActive={selectedPageType === PageType.Todo}
								type="page"
								onSelect={() =>
									setSelectedPageType(PageType.Todo)
								}
							>
								<Text fontSize="lg" fontWeight="500" mb={3}>
									Todo List
								</Text>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="48"
									viewBox="0 0 512 512"
								>
									<title>th-list</title>
									<g fill="#303030">
										<path d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path>
									</g>
								</svg>
							</SelectCard>
						</Flex>
						<Text mb={5}>Do you want your page to be private?</Text>
						<Flex mb={5}>
							<SelectCard
								id="public"
								isActive={!isPrivate}
								type="availability"
								onSelect={() => setIsPrivate(false)}
							>
								<Text fontSize="lg" fontWeight="500" mb={3}>
									Public
								</Text>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="48"
									viewBox="0 0 48 48"
								>
									<title>multiple-11</title>
									<g fill="#303030">
										<circle cx="9" cy="10" r="5"></circle>{" "}
										<circle
											fill="#303030"
											cx="24"
											cy="8"
											r="7"
										></circle>{" "}
										<path d="M13.272,35.911C11.934,35.576,11,34.379,11,33V22c0-1.906,0.768-3.634,2.008-4.898 C12.682,17.035,12.345,17,12,17H6c-2.757,0-5,2.243-5,5v9c0,0.431,0.275,0.812,0.684,0.949l2.38,0.793l0.94,10.349 C5.051,43.605,5.483,44,6,44h6c0.517,0,0.949-0.395,0.996-0.91l0.644-7.088L13.272,35.911z"></path>{" "}
										<circle cx="39" cy="10" r="5"></circle>{" "}
										<path d="M34.728,35.911C36.066,35.576,37,34.379,37,33V22c0-1.906-0.768-3.634-2.008-4.898 C35.318,17.035,35.655,17,36,17h6c2.757,0,5,2.243,5,5v9c0,0.431-0.275,0.812-0.684,0.949l-2.38,0.793l-0.94,10.349 C42.949,43.605,42.517,44,42,44h-6c-0.517,0-0.949-0.395-0.996-0.91l-0.644-7.088L34.728,35.911z"></path>{" "}
										<path
											fill="#303030"
											d="M30,17H18c-2.757,0-5,2.243-5,5v11c0,0.459,0.312,0.859,0.757,0.97l3.306,0.826l0.94,11.287 C18.047,46.602,18.48,47,19,47h10c0.52,0,0.953-0.398,0.997-0.917l0.94-11.287l3.306-0.826C34.688,33.859,35,33.459,35,33V22 C35,19.243,32.757,17,30,17z"
										></path>
									</g>
								</svg>
							</SelectCard>
							<SelectCard
								id="private"
								isActive={isPrivate}
								type="availability"
								onSelect={() => setIsPrivate(true)}
							>
								<Text fontSize="lg" fontWeight="500" mb={3}>
									Private
								</Text>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="40"
									viewBox="0 0 640 512"
								>
									<title>user-lock</title>
									<g fill="#303030">
										<path d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm96 64a63.08 63.08 0 0 1 8.1-30.5c-4.8-.5-9.5-1.5-14.5-1.5h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h280.9a63.54 63.54 0 0 1-8.9-32zm288-32h-32v-80a80 80 0 0 0-160 0v80h-32a32 32 0 0 0-32 32v160a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V320a32 32 0 0 0-32-32zM496 432a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm32-144h-64v-80a32 32 0 0 1 64 0z"></path>
									</g>
								</svg>
							</SelectCard>
						</Flex>
					</Flex>

					<Button
						colorScheme="blue"
						mr={3}
						mt={4}
						type="submit"
						isLoading={loading}
					>
						Create Page
					</Button>
				</Form>
			</Formik>
		</Container>
	);
};

export default NewPage;
