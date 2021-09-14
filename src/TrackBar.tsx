import * as React from "react";
import { useState } from "react";

import styled from "styled-components";

const TrackBarBlock = styled.div<{ fontName: string }>`
	height: 3rem;
	width: fit-content;

	display: flex;

	background-color: #0f0ce3;
	color: #00fe00;

	font-family: "${(props) => props.fontName}", monospace;
	font-size: 2rem;

	& > div {
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

			margin-right: 1rem;

			.track-bar__bar__brackets {
				fill: #000;
				stroke-width: 3px;
			}

			.track-bar__bar__active {
				display: flex;

				position: relative;
				top: 2px;
			}

			.track-bar__bar__hyphen {
				margin: 0 0.175rem;

				cursor: pointer;

				rect {
					fill: lime;
				}
			}

			.track-bar__bar_container__input {
				width: fit-content;

				input {
					position: relative;
					height: 1rem;

					background: none;
				}

				input::-webkit-slider-thumb {
					background: none;
					border: none;
				}
				input::-moz-range-thumb {
					background: none;
					border: none;
				}
				input::-ms-thumb {
					background: none;
					border: none;
				}

				input::-webkit-slider-runnable-track {
					background: none;
					border: none;
				}
				input::-moz-range-track {
					background: none;
					border: none;
				}
				input::-ms-track {
					background: none;
					border: none;
				}

				.track-bar__bar_container__hyphens {
					position: relative;
					height: 2px;
					width: fit-content;

					top: 15px;

					pointer-events: none;

					svg {
						height: inherit;
						width: 11px;
					}
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
			bottom: 16px;
		}

		.arrow_bottom {
			bottom: 33.5px;
		}
	}
`;

type Options = {
	defaultPercent?: number;
	numberOfHyphens?: number;
};

const TrackBar = (props: {
	selectEvent: (event: React.ChangeEvent<HTMLInputElement>, percent: number) => void;
	options?: Options;
	fontName?: string;
}): JSX.Element => {
	const { selectEvent, fontName } = props;
	const config = {
		defaultPercent: 0,
		numberOfHyphens: 21,
	};

	const { options } = props;

	// ? Overrides default config
	if (options) Object.assign(config, options);

	// ? Percent validation
	const [percent, setPercent] = useState(
		config.defaultPercent < 100 && config.defaultPercent > 0 ? config.defaultPercent : 0
	);

	const hyphens = [];
	for (let i = 0; i < config.numberOfHyphens; i += 1) {
		hyphens.push(
			<span className="track-bar__bar__hyphen" key={`hyphen_${i}`}>
				<svg xmlns="http://www.w3.org/2000/svg">
					<rect width="11" height="2" />
				</svg>
			</span>
		);
	}
	const getCenterByRect = (rect: DOMRect): number => rect.x + rect.width / 2;
	const getNumberOfHyphenByPercent = (perc: number, length: number): number =>
		Math.floor(perc / (100 / length));

	const [selctedHyphenCenterX, setCenterX] = useState(0);

	React.useEffect(() => {
		const hyphenList = document.getElementsByClassName("track-bar__bar__hyphen");

		const firstHyphen = hyphenList[0];
		const selectedHyphen = hyphenList[getNumberOfHyphenByPercent(percent, hyphenList.length - 1)];

		// ? Gets width between first and selected hyphen
		setCenterX(
			getCenterByRect(selectedHyphen.getBoundingClientRect()) -
				getCenterByRect(firstHyphen.getBoundingClientRect())
		);
	}, [percent]);

	const hyphensBlockRef = React.useRef<HTMLDivElement>(null);
	const [inputBlockWidth, setInputBlockWidth] = React.useState(0);

	// ? Gets width of hyphens block to set to the input
	React.useLayoutEffect(() => {
		setInputBlockWidth(hyphensBlockRef.current?.getBoundingClientRect().width as number);
	}, []);

	return (
		<TrackBarBlock fontName={fontName || "PixelUnicode"} className="track-bar">
			<div className="track-bar__percent">
				<span>{percent}</span>
				<span style={{ marginLeft: "5px" }}>%</span>
			</div>
			<div className="track-bar__bar">
				<div
					className="track-bar__bar__arrow arrow_top"
					style={{ left: `${selctedHyphenCenterX + 4.5}px` }}
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
					<div className="track-bar__bar_container__input">
						<div className="track-bar__bar_container__hyphens" ref={hyphensBlockRef}>
							{hyphens}
						</div>
						<input
							type="range"
							min="0"
							max="100"
							step={100 / (config.numberOfHyphens - 1)}
							value={percent}
							style={{ width: `${inputBlockWidth}px` }}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setPercent(parseInt(event.target.value, 10));
								selectEvent(event, parseInt(event.target.value, 10));
							}}
						/>
					</div>
					<span className="track-bar__bar__brackets">
						<svg xmlns="http://www.w3.org/2000/svg" width="4" height="21" viewBox="0 0 4 21">
							<path d="M0,0H4V21H0V19H2V2H0V0Z" />
						</svg>
					</span>
				</div>
				<div
					className="track-bar__bar__arrow arrow_bottom"
					style={{ left: `${selctedHyphenCenterX + 4.5}px` }}
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
