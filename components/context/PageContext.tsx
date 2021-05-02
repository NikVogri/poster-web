import React, { createContext, useContext, useState } from "react";
import { Notebook } from "../../interfaces/notebook";
import { Page } from "../../interfaces/page";

interface PageContextInterface {
	page: Page | null;
	setCurrentPage: (page: Page) => void;
	notebook: Notebook | null;
	setCurrentNotebook: (notebook: Notebook) => void;
}

export const PageContext = createContext<PageContextInterface>({
	page: null,
	setCurrentPage: (page: Page) => {},
	notebook: null,
	setCurrentNotebook: (notebook: Notebook) => {},
});

const PageProvider = ({ children }) => {
	const [page, setPage] = useState<Page | null>(null);
	const [notebook, setNotebook] = useState<Notebook | null>();

	const setCurrentPage = (page: Page) => setPage(page);
	const setCurrentNotebook = (notebook: Notebook) => setNotebook(notebook);

	return (
		<PageContext.Provider
			value={{ page, setCurrentPage, notebook, setCurrentNotebook }}
		>
			{children}
		</PageContext.Provider>
	);
};

export default PageProvider;
