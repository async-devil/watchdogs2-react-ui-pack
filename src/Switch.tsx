import * as React from "react";

import styled from "styled-components";

const SwitchBlock = styled.div<{ fontName: string; defaultWidth: string | undefined }>`
	width: ${(props) => (props.defaultWidth ? props.defaultWidth : "min-content")};

	font-family: "${(props) => props.fontName}", monospace;
	font-size: 2rem;

	.switch__main-container {
		display: flex;
	}
`;

const SwitchOption = styled.p<{ color: string }>`
	color: ${(props) => props.color};

	margin: 1px auto 0 auto;
`;

const SwitchArrow = styled.button`
	background: none;
	border: none;

	cursor: ${(props) => (props.disabled ? "default" : "pointer")};

	&.switch__arrow_right {
		margin-left: 0.3rem;
	}
	&.switch__arrow_left {
		margin-right: 0.3rem;
	}

	path {
		fill: #f5f5f5;
	}
`;

const SwitchIndicatorsContainer = styled.div<{
	selectedIndex: number;
	haveWidth: boolean;
	disabled: boolean;
}>`
	height: 1rem;
	width: fit-content;

	display: ${(props) => (props.disabled ? "none" : "flex")};

	margin: ${(props) => (props.haveWidth ? "0 auto 0 auto" : "0 0 0 2.2rem")};

	button {
		width: 7px;
		height: 6px;

		padding: 0;
		margin: 0 0.3rem 0.2rem 0.3rem;

		background-color: #000;
		border: none;

		cursor: pointer;

		&:nth-child(${(props) => props.selectedIndex + 1}) {
			background-color: #00fe1e;
		}
	}
`;

function returnValidColorOrUndefined(color: string | undefined): string | undefined {
	// ? Regex test without strict sharp check
	if (!color || !/^#?(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) return undefined;

	return color.charAt(0) === "#" ? color : `#${color}`;
}

function returnValidWidthOrUndefined(width: string | undefined): string | undefined {
	// ? CSS units test
	if (!width || !/(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc|rem+)/.test(width)) return undefined;
	return width;
}

const Switch = (props: {
	options: { text: string; hexColor?: string }[];
	selectEvent: (
		clickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		option: { text: string; hexColor?: string; index: number }
	) => void;
	fontName?: string;
	defaultIndex?: number;
	defaultCSSWidth?: string;
	disableIndicators?: boolean;
}): JSX.Element => {
	const { defaultIndex, defaultCSSWidth, disableIndicators, options, selectEvent, fontName } =
		props;

	// ? index assigning and color validating for active property selection
	const optionsList: { text: string; hexColor?: string; index: number }[] = [...options].map(
		(option, index) =>
			Object.assign(option, {
				index,
				hexColor: returnValidColorOrUndefined(option.hexColor),
			})
	);

	const [currentOption, setOption] = React.useState(
		optionsList[
			defaultIndex ? (defaultIndex >= 0 && defaultIndex < optionsList.length ? defaultIndex : 0) : 0
			// ? selects valid index
		]
	);

	const indicators = [...optionsList].map((option) => (
		<button
			className="switch__indicator"
			key={`indicator_${option.index}`}
			onClick={(clickEvent) => {
				const selectedOption = optionsList[option.index];

				selectEvent(clickEvent, selectedOption);
				setOption(selectedOption);
			}}
			type="button"
			aria-label={`${option.index + 1}`}
		/>
	));

	return (
		<SwitchBlock
			fontName={fontName || "PixelUnicode"}
			defaultWidth={returnValidWidthOrUndefined(defaultCSSWidth)}
			className="switch"
		>
			<div className="switch__main-container">
				<SwitchArrow
					className="switch__arrow switch__arrow_left"
					disabled={currentOption.index === 0}
					onClick={(clickEvent) => {
						if (currentOption.index === 0) return;

						const nextOption = optionsList[currentOption.index - 1];

						selectEvent(clickEvent, nextOption);
						setOption(nextOption);
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="27" height="14" viewBox="0 0 27 14">
						<path d="M11,0h4V2H11V0ZM23,0h4V2H23V0ZM7,2h4V4H7V2ZM19,2h4V4H19V2ZM3,4H7V6H4V8H7v2H3V8H0V6H3V4ZM15,4h4V6H16V8h3v2H15V8H12V6h3V4ZM7,10h4v2H7V10Zm12,0h4v2H19V10Zm-8,2h4v2H11V12Zm12,0h4v2H23V12Z" />
					</svg>
				</SwitchArrow>
				<SwitchOption className="switch__option" color={currentOption.hexColor || "#00fe1e"}>
					{currentOption.text}
				</SwitchOption>
				<SwitchArrow
					className="switch__arrow switch__arrow_right"
					disabled={currentOption.index === optionsList.length - 1}
					onClick={(clickEvent) => {
						if (currentOption.index === optionsList.length - 1) return;

						const nextOption = optionsList[currentOption.index + 1];

						selectEvent(clickEvent, nextOption);
						setOption(nextOption);
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="27" height="14" viewBox="0 0 27 14">
						<path d="M0,0H4V2H0V0ZM12,0h4V2H12V0ZM4,2H8V4H4V2ZM16,2h4V4H16V2ZM8,4h4V6h3V8H12v2H8V8h3V6H8V4ZM20,4h4V6h3V8H24v2H20V8h3V6H20V4ZM4,10H8v2H4V10Zm12,0h4v2H16V10ZM0,12H4v2H0V12Zm12,0h4v2H12V12Z" />
					</svg>
				</SwitchArrow>
			</div>
			<SwitchIndicatorsContainer
				selectedIndex={currentOption.index}
				haveWidth={!!returnValidWidthOrUndefined(defaultCSSWidth)}
				disabled={!!disableIndicators}
				className="switch__indicators-container"
			>
				{indicators}
			</SwitchIndicatorsContainer>
		</SwitchBlock>
	);
};

export default Switch;
