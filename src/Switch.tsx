import * as React from "react";

import styled from "styled-components";

const SwitchBlock = styled.div``;

const SwitchOption = styled.p<{ color: string }>`
	color: ${(props) => props.color};
`;

const SwitchArrow = styled.button<{ active: boolean }>`
	color: ${(props) => (props.active ? "#00fe1e" : "#f5f5f5")};
`;

const Switch = (props: {
	options: { text: string; hexColor?: string }[];
	defaultIndex?: number;
}): JSX.Element => {
	const { defaultIndex, options } = props;
	const optionsList: { text: string; hexColor?: string; index: number }[] = [...options].map(
		(option, index) => Object.assign(option, { index })
	);

	const [currentOption, setOption] = React.useState(optionsList[defaultIndex || 0]);

	return (
		<SwitchBlock>
			<SwitchArrow
				className="switch__arrow_left"
				active={currentOption.index !== 0}
				onClick={() => {}}
			/>
			<div className="switch__option">
				<SwitchOption color={currentOption.hexColor ? currentOption.hexColor : "#00fe1e"}>
					{currentOption.text}
				</SwitchOption>
			</div>
			<SwitchArrow
				className="switch__arrow_right"
				active={currentOption.index === 0}
				onClick={() => {}}
			/>
		</SwitchBlock>
	);
};

export default Switch;
