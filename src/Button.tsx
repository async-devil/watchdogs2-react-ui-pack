import * as React from "react";

import styled from "styled-components";

const ButtonBlock = styled.button<{ fontName: string }>`
	width: auto;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #000;
	color: #f5f5f5;

	font-family: "${(props) => props.fontName}", monospace;
	font-size: 2rem;
	line-height: 2rem;

	border: none;

	padding: 0.3rem 4rem 0.5rem 0.4rem;
	margin: 1rem 0 1rem 0;

	&:first-child:hover {
		margin: 0.5rem 0 -0.45rem 0;
	}

	&:hover {
		background-color: #0f0ce3;

		padding: 0.875rem 1.75rem 0.875rem 0.4rem;
		margin: -0.5rem 0 -0.45rem 0;

		&:before {
			content: "//";
			padding-right: 0.5rem;
		}
	}
`;

const Button = (props: {
	clickEvent: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	fontName?: string;
	children: JSX.Element | string;
}): JSX.Element => {
	const { clickEvent, fontName, children } = props;
	return (
		<ButtonBlock
			fontName={fontName || "PixelUnicode"}
			className="button"
			onClick={(event) => clickEvent(event)}
		>
			{children}
		</ButtonBlock>
	);
};

export default Button;
