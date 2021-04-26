import { Formik, Field, Form, FormikValues } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";

import { AuthContext } from "../components/context/AuthContext";
import { useRouter } from "next/router";

import LoadingButton from "../components/UI/LoadingButton/LoadingButton";

import styles from "../styles/pages/Login.module.scss";
import Link from "next/link";

const loginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Email needs to be an email address")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});
const forgotPassValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Email needs to be an email address")
		.required("Email is required"),
});

const login = () => {
	const { login, userLoading, forgotPassword } = useContext(AuthContext);
	const [loadingForgotPass, setLoadingForgotPass] = useState(false);

	const [showForgotPasswordForm, setForgotPasswordForm] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormikValues) => {
		await login(e.email, e.password);
		router.push("/my");
	};

	const handleForgotPassSubmit = async (e: FormikValues) => {
		setLoadingForgotPass(true);
		await forgotPassword(e.email);
		setLoadingForgotPass(false);
	};

	return (
		<main className={styles.login}>
			{showForgotPasswordForm ? (
				<div className={styles.login__container}>
					<Formik
						initialValues={{
							email: "",
						}}
						validationSchema={forgotPassValidationSchema}
						onSubmit={handleForgotPassSubmit}
					>
						<Form>
							<Field name="email">
								{({ field, form }) => (
									<div className="form-group">
										<label className="label">
											Your email address
										</label>
										<input
											className="form-control"
											type="email"
											required
											placeholder="Email"
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
							<LoadingButton
								isLoading={loadingForgotPass}
								className="form-button"
								disabled={loadingForgotPass}
								type="submit"
							>
								Send email
							</LoadingButton>
						</Form>
					</Formik>
					<p className={styles.copyright}>
						Copyright © {new Date().getFullYear()} MIPAGE
					</p>
				</div>
			) : (
				<div className={styles.login__container}>
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={loginValidationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<Field name="email">
								{({ field, form }) => (
									<div className="form-group">
										<label className="label">
											Your email address
										</label>
										<input
											className="form-control"
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

							<Field name="password">
								{({ field, form }) => (
									<div className="form-group">
										<label className="label">
											Your password
										</label>
										<input
											className="form-control"
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
							<LoadingButton
								isLoading={userLoading}
								className="form-button"
								disabled={userLoading}
								type="submit"
							>
								Sign in
							</LoadingButton>
						</Form>
					</Formik>
					<div className={styles.secondary_buttons}>
						<button
							onClick={() => setForgotPasswordForm(true)}
							className={styles.secondary__btn}
						>
							Forgot password?
						</button>
						<Link href="/register">
							<a className={styles.secondary__btn}>
								New? Create an account!
							</a>
						</Link>
					</div>
					<p className={styles.copyright}>
						Copyright © {new Date().getFullYear()} MIPAGE
					</p>
				</div>
			)}
		</main>
	);
};

export default login;
