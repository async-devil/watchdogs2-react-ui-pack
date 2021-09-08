import * as React from "react";
import { useState } from "react";

import styled from "styled-components";

const TrackBarBlock = styled.div<{ fontName: string }>`
	height: 3rem;
	width: min-content;

	display: flex;

	background-color: #0f0ce3;
	color: #00fe00;

	font-family: "${(props) => props.fontName}", monospace;
	font-size: 2rem;

	& > div {
		height: 2.3rem;

		margin: auto 0 auto 0;
	}

	.track-bar__percent {
		width: 69px;

		text-align: center;
	}

	.track-bar__bar {
		user-select: none;

		.track-bar__bar_container {
			display: flex;

			.track-bar__bar__brackets {
				color: #000;
			}

			.track-bar__bar__active {
				display: flex;

				position: relative;
				top: 2px;
			}

			.track-bar__bar__hyphen {
				margin: 0 0.175rem;

				cursor: pointer;

				svg {
					margin: 50% 0;
				}

				rect {
					fill: lime;
				}
			}
		}

		.track-bar__bar__arrow {
			height: 0;
			position: relative;

			path {
				fill: #fff;
			}
		}

		.arrow_top {
			bottom: 0.9rem;
		}

		.arrow_bottom {
			bottom: 1.7rem;
		}
	}
`;

type Options = {
	defaultPercent?: number;
	numberOfHyphens?: number;
};

const TrackBar = (props: {
	clickEvent: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, percent: number) => void;
	options?: Options;
	fontName?: string;
}): JSX.Element => {
	const { clickEvent, fontName } = props;
	const config = {
		defaultPercent: 0,
		numberOfHyphens: 21,
	};

	const { options } = props;

	// ? Overrides default config
	if (options) Object.assign(config, options);

	const [percent, setPercent] = useState(
		config.defaultPercent < 100 && config.defaultPercent > 0 ? config.defaultPercent : 0
	);

	const hyphens = [];
	for (let i = 0; i < config.numberOfHyphens; i += 1) {
		hyphens.push(
			<span className="track-bar__bar__hyphen" key={`hyphen_${i}`}>
				<svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2">
					<rect width="11" height="2" />
				</svg>
			</span>
		);
	}
	const getCenterByRect = (rect: DOMRect): number => rect.x + rect.width / 2;
	const getNumberOfHyphenByPercent = (perc: number, length: number): number =>
		Math.floor(perc / (100 / length));

	const [selctedHyphenCenterX, setCenterX] = useState(0);

	const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = event.currentTarget.getBoundingClientRect();

		const { x, width } = rect;
		const { clientX } = event;

		const xDelta = clientX - x;
		const newPercent = Math.floor(
			getNumberOfHyphenByPercent(Math.round(xDelta / (width / 100)), config.numberOfHyphens) *
				(100 / (config.numberOfHyphens - 1))
		);

		clickEvent(event, newPercent);
		setPercent(newPercent);
	};

	React.useEffect(() => {
		const hyphenList = document.getElementsByClassName("track-bar__bar__hyphen");
		const selectedHyphen = hyphenList[getNumberOfHyphenByPercent(percent, hyphenList.length - 1)];

		setCenterX(getCenterByRect(selectedHyphen.getBoundingClientRect()));
	}, [percent]);

	return (
		<TrackBarBlock fontName={fontName || "PixelUnicode"} className="track-bar">
			<div className="track-bar__percent">
				<span>{percent}</span>
				<span style={{ marginLeft: "5px" }}>%</span>
			</div>
			<div className="track-bar__bar">
				<div
					className="track-bar__bar__arrow arrow_top"
					style={{ left: `${selctedHyphenCenterX - 82}px` }}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9">
						<path d="M0,0H3V3H0V0ZM12,0h3V3H12V0ZM3,3H6V6H3V3ZM9,3h3V6H9V3ZM6,6H9V9H6V6Z" />
					</svg>
				</div>
				<div className="track-bar__bar_container">
					<span className="track-bar__bar__brackets">
						<svg xmlns="http://www.w3.org/2000/svg" width="4" height="21" viewBox="0 0 4 21">
							<path d="M0,0H4V2H2V19H4v2H0V0Z" />
						</svg>
					</span>
					<div
						className="track-bar__bar__active"
						onClick={(ev) => onClick(ev)}
						role="button"
						tabIndex={0}
					>
						{hyphens}
					</div>
					<span className="track-bar__bar__brackets">
						<svg xmlns="http://www.w3.org/2000/svg" width="4" height="21" viewBox="0 0 4 21">
							<path d="M0,0H4V21H0V19H2V2H0V0Z" />
						</svg>
					</span>
				</div>
				<div
					className="track-bar__bar__arrow arrow_bottom"
					style={{ left: `${selctedHyphenCenterX - 82}px` }}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9">
						<path d="M6,0H9V3H6V0ZM3,3H6V6H3V3ZM9,3h3V6H9V3ZM0,6H3V9H0V6ZM12,6h3V9H12V6Z" />
					</svg>
				</div>
			</div>
		</TrackBarBlock>
	);
};

export default TrackBar;
