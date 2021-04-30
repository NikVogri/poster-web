import { useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: any;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
	const mount = document.querySelector("body");
	const el = document.createElement("div");

	useEffect(() => {
		el.classList.add("custom-portal");
		mount.appendChild(el);

		return () => mount.removeChild(el);
	}, [el, mount]);

	return createPortal(children, el);
};

export default Portal;
