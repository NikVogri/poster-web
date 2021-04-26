import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../../UI/Avatar/Avatar";

import styles from "./Navigation.module.scss";
import { DropdownButton, DropdownList } from "../../UI/Dropdown/Dropdown";

const UserIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="32 32 0 0"
	>
		<g fill="#fff">
			<path d="M15.36 17.28c4.77 0 8.64-3.87 8.64-8.64s-3.87-8.64-8.64-8.64-8.64 3.87-8.64 8.64 3.87 8.64 8.64 8.64z m7.68 1.92h-3.31c-1.33 0.61-2.81 0.96-4.37 0.96s-3.04-0.35-4.37-0.96h-3.31c-4.24 0-7.68 3.44-7.68 7.68v0.96c0 1.59 1.29 2.88 2.88 2.88h24.96c1.59 0 2.88-1.29 2.88-2.88v-0.96c0-4.24-3.44-7.68-7.68-7.68z"></path>
		</g>
	</svg>
);

const LogoutIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
		<title>logout</title>
		<g fill="none">
			<path
				d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
				stroke="#fff"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</g>
	</svg>
);

const NavItem = ({ name, to }) => {
	return (
		<li>
			<Link href={to}>
				<a>{name}</a>
			</Link>
		</li>
	);
};

const Navigation = () => {
	const { user, logout } = useContext(AuthContext) as any;
	const [showDropdown, setShowDropdown] = useState(true);

	return (
		<nav className={styles.navigation}>
			<div>
				<Link href="/">
					<h1>PAGER</h1>
				</Link>
			</div>

			{!user && (
				<ul className={styles.navigation__right}>
					<NavItem to="/login" name="Login" />
					<NavItem to="/register" name="Register" />
				</ul>
			)}
			{/* 
			{user && (
				<div className={styles.dropdown}>
					<DropdownButton
						show={showDropdown}
						toggleDropdown={setShowDropdown}
					>
						<Avatar name={user.username} size="md" withUsername />
					</DropdownButton>
					<DropdownList
						show={showDropdown}
						toggleDropdown={setShowDropdown}
					>
						<ul>
							<li>{UserIcon}View All My pages</li>
							<li>{UserIcon} My pages</li>
							<li>{LogoutIcon} Logout</li>
						</ul>
					</DropdownList>
				</div>
			)} */}
			{user && <p>{user.username}</p>}

			{/* {user && (
				<Menu colorScheme="var(--background-darker)">
					<Button background="#fff">
						<Avatar name={user.username} size="sm" withUsername />
					</Button>
					<MenuList>
						<MenuItem>
							<i>{UserIcon}</i>
							<Text ml={2}>Profile</Text>
						</MenuItem>
						<MenuItem>
							<Link href="/pages/new">
								<a>
									<Flex alignItems="center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
										>
											<title>plus-circle</title>
											<g fill="none">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11a1 1 0 1 0-2 0v2H7a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7z"
													fill="#303030"
												></path>
											</g>
										</svg>
										<Text ml={2}>Create new page</Text>
									</Flex>
								</a>
							</Link>
						</MenuItem>
						<MenuItem onClick={logout}>
							<i>{LogoutIcon}</i>
							<Text ml={2}>Logout</Text>
						</MenuItem>
					</MenuList>
				</Menu>
			)} */}
		</nav>
	);
};

export default Navigation;
