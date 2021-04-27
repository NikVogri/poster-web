import React, { useState } from "react";
import * as Yup from "yup";

import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import createToast from "../helpers/toast";

import styles from "../styles/pages/Register.module.scss";
import Link from "next/link";

export default function register() {
	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();

	const signupValidationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Please enter a correct email address")
			.required("Email is required"),
		username: Yup.string()
			.min(5, "Username must be more than 5 characters long")
			.max(50, "Max 50 characters")
			.required("Username is required"),
		password: Yup.string()
			.min(6, "Password must be more than 6 characters long")
			.required("Password is required"),
		passwordConfirm: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Passwords don't match"
		),
	});

	const handleSubmit = async (e) => {
		setSubmitting(true);
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
				{ ...e }
			);

			router.push("/login");
			createToast(
				"User created successfully",
				"User created successfully, please log in now",
				"success"
			);
		} catch (err) {
			createToast(
				"User cannot be created",
				err.response.data.error,
				"error"
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<main className={styles.register}>
			<div className={styles.register__container}>
				<Formik
					initialValues={{
						email: "",
						username: "",
						password: "",
					}}
					validationSchema={signupValidationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<Field name="email">
							{({ field, form }) => (
								<div className="form-group">
									<label className="label">Email</label>
									<input
										className={`form-control ${
											form.errors.email &&
											form.touched.email
												? "invalid"
												: ""
										}`}
										type="email"
										required
										{...field}
									/>
									{form.errors.email &&
										form.touched.email && (
											<span className="form-error">
												{form.errors.email}
											</span>
										)}
								</div>
							)}
						</Field>

						<Field name="username">
							{({ field, form }) => (
								<div className="form-group">
									<label className="label">Username</label>
									<input
										className={`form-control ${
											form.errors.username &&
											form.touched.username
												? "invalid"
												: ""
										}`}
										type="text"
										required
										{...field}
									/>
									{form.errors.username &&
										form.touched.username && (
											<span className="form-error">
												{form.errors.username}
											</span>
										)}
								</div>
							)}
						</Field>

						<Field name="password">
							{({ field, form }) => (
								<div className="form-group">
									<label className="label">Password</label>
									<input
										className={`form-control ${
											form.errors.password &&
											form.touched.password
												? "invalid"
												: ""
										}`}
										type="password"
										required
										{...field}
									/>
									{form.errors.password &&
										form.touched.password && (
											<span className="form-error">
												{form.errors.password}
											</span>
										)}
								</div>
							)}
						</Field>

						<Field name="passwordConfirm">
							{({ field, form }) => (
								<div className="form-group">
									<label className="label">
										Confirm password
									</label>
									<input
										className={`form-control ${
											form.errors.passwordConfirm &&
											form.touched.passwordConfirm
												? "invalid"
												: ""
										}`}
										type="password"
										required
										{...field}
									/>
									{form.errors.passwordConfirm &&
										form.touched.passwordConfirm && (
											<span className="form-error">
												{form.errors.passwordConfirm}
											</span>
										)}
								</div>
							)}
						</Field>
						<button className="form-button">
							Create new account
						</button>
					</Form>
				</Formik>
				<Link href="/login">
					<a className={styles.secondary__btn}>
						Already registered? Log in now!
					</a>
				</Link>
				<p className={styles.copyright}>
					Copyright © {new Date().getFullYear()} MIPAGE
				</p>
			</div>
		</main>
	);
}
