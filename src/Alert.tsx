import * as React from "react";

import styled from "styled-components";

const AlertBlock = styled.div<{ fontName: string }>`
	max-width: 55rem;
	min-height: 25rem;

	background-color: #202020;
	color: #f5f5f5;

	font-family: "${(props) => props.fontName}", monospace;

	border: 0.2rem solid #e8e9e8;
	border-top: 2rem solid #e8e9e8;
	border-bottom: 2rem solid #e8e9e8;
	border-radius: 0.5rem;

	.alert__top-dots {
		height: 0;

		position: relative;
		bottom: 3.4rem;
		left: 4px;

		font-size: 3rem;
		letter-spacing: 0.3rem;

		color: #cccccc;
		text-align: center;
	}

	.alert__title {
		display: flex;

		height: 3rem;
		width: 100%;

		background-color: #ff0000;

		p {
			margin: auto;

			font-size: 2.5rem;

			@media (max-width: 500px) {
				font-size: 1.8rem;
			}
		}
	}

	.alert__main-block {
		min-height: 19.5rem;

		position: relative;

		margin: 1.5rem;
		margin-bottom: 1rem;

		.alert__main-block__text {
			font-size: 1.6rem;

			text-align: center;

			h1 {
				font-size: 2rem;
			}

			ul {
				list-style: none;

				margin: 0;
				padding: 0;
			}

			li {
				padding-left: 1em;
				text-indent: -1em;
			}

			li:before {
				content: "-";
				padding-right: 0.625rem;
			}
		}

		.alert__main-block__buttons {
			width: 100%;
			position: relative;

			margin-top: 2rem;
			margin-bottom: 1rem;
		}

		.alert__button {
			width: 100%;
			height: 2.5rem;

			margin-bottom: 0.3rem;

			font-size: 2rem;
			background-color: #000;
			color: #fff;

			border: none;

			cursor: pointer;

			transition: background-color 0.15s cubic-bezier(0.79, 0.14, 0.15, 0.86);

			&:last-child {
				margin-bottom: none;
			}

			&:hover {
				background-color: #0f0ce3;
			}
		}
	}
`;

const Alert = (props: {
	title: string;
	options: {
		text: string;
		clickEvent: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	}[];
	fontName?: string;
	children?: JSX.Element;
}): JSX.Element => {
	const { title, options, fontName, children } = props;

	const buttons = [...options].map(
		(option, index): JSX.Element => (
			<button
				className="alert__button"
				type="button"
				onClick={(event) => option.clickEvent(event)}
				key={`alert__button_${index}`}
			>
				{option.text}
			</button>
		)
	);

	return (
		<AlertBlock className="alert" fontName={fontName || "PixelUnicode"}>
			<p className="alert__top-dots">...</p>
			<div className="alert__title">
				<p className="alert__title_text">{title}</p>
			</div>
			<div className="alert__main-block">
				<div className="alert__main-block__text">{children}</div>
				<div className="alert__main-block__buttons">{buttons}</div>
			</div>
		</AlertBlock>
	);
};

export default Alert;
