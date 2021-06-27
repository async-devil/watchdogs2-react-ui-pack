import * as React from "react";

import styled from "styled-components";

const AlertBlock = styled.div<{ fontName: string }>`
	max-width: 55rem;
	height: 25rem;

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
		bottom: 1.7rem;

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

			font-size: 1.3rem;

			@media (max-width: 500px) {
				font-size: 1rem;
			}
		}
	}

	.alert__main-block {
		height: 19.5rem;

		position: relative;

		margin: 1.5rem;
		margin-bottom: 1rem;

		.alert__main-block__text {
			font-size: 0.95rem;
			text-align: center;
		}

		.alert__main-block__buttons {
			width: 100%;
			position: absolute;

			bottom: 0px;
			right: 0px;
		}

		.alert__button {
			width: 100%;
			height: 2.5rem;

			margin-bottom: 0.3rem;

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
		event: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	}[];
	fontName?: string;
	children: JSX.Element;
}): JSX.Element => {
	const { title, options, fontName, children } = props;

	const buttons = [...options].map(
		(option, index): JSX.Element => (
			<button
				className="alert__button"
				type="button"
				onClick={(event) => option.event(event)}
				key={`alert__button_${index}`}
			>
				{option.text}
			</button>
		)
	);

	return (
		<AlertBlock className="alert" fontName={fontName || "Pexico-Micro"}>
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
