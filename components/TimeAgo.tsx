import InitTimeAgo from "javascript-time-ago";

import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";

InitTimeAgo.getDefaultLocale();
InitTimeAgo.addLocale(en);

const TimeAgo = ({ type, date, ...otherProps }) => {
	return (
		<p {...otherProps}>
			Last {type}: <ReactTimeAgo date={date} locale="en-US" />
		</p>
	);
};

export default TimeAgo;
