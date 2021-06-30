import * as React from "react";

import styled from "styled-components";

const ProgressBarBlock = styled.div`
	width: 12rem;
	height: 0.25rem;

	.progress-bar__background {
		width: inherit;
		height: inherit;

		position: absolute;

		background-color: #828282;
		border-radius: 1px;
	}

	.progress-bar__foreground {
		width: 0;
		height: inherit;

		position: absolute;

		background-color: #fff;
		border-radius: 1px;
	}
`;

const ProgressBar = (props: { percent: number }) => {
	const { percent } = props;

	const [foregroundWidth, setForegroundWidth] = React.useState(0);

	React.useEffect(() => {
		const backgroundList = document.getElementsByClassName("progress-bar__background");
		const background = backgroundList[0];

		const backgroundWidth = background.getBoundingClientRect().width;

		setForegroundWidth((backgroundWidth / 100) * (percent >= 0 && percent <= 100 ? percent : 0));
	}, [percent]);

	return (
		<ProgressBarBlock className="progress-bar">
			<div className="progress-bar__background" />
			<div className="progress-bar__foreground" style={{ width: `${foregroundWidth}px` }} />
		</ProgressBarBlock>
	);
};

export default ProgressBar;
