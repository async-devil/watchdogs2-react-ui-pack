import * as React from "react";

import styled from "styled-components";

const MessageBoxBlock = styled.div`
	max-width: 37.5rem;

	margin: 1.2rem;

	background-color: #000b;

	font-family: "Pexico-micro", monospace;
	font-size: 1.1rem;
	color: #f5f5f5;

	.message-box_title {
		width: inherit;
		height: 0;
		position: relative;

		top: 11px;

		text-align: center;
	}

	.message-box_top {
		display: flex;

		width: inherit;
		position: relative;

		top: 0.25rem;

		svg {
			position: relative;
		}
	}

	.message-box_top__middle {
		width: calc(100% - 122px);
		height: 25px;

		border-top: 5px solid #808080;
		border-bottom: 5px solid #808080;
	}

	.message-box_body {
		width: inherit;
		min-height: 25rem;

		border: 3px solid #808080;
		border-top: 0px;

		padding: 1rem 1.25rem 1rem 1.25rem;

		overflow-wrap: break-word;
	}

	ul {
		list-style: none;
		margin-left: 0;
		padding-left: 0;
	}

	li {
		padding-left: 1em;
		text-indent: -1em;
	}

	li:before {
		content: "-";
		padding-right: 10px;
	}
`;

const MessageBox = (props: { title: string; children: JSX.Element }): JSX.Element => {
	const { title, children } = props;

	return (
		<MessageBoxBlock className="message-box">
			<div className="message-box_title">{title}</div>
			<div className="message-box_top">
				<svg
					className="message-box_top__left"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					width="61"
					height="35"
					viewBox="0 0 61 35"
				>
					<image
						data-name="message-box_left"
						width="61"
						height="35"
						xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAjCAQAAACNt8qJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQflBRwMIim0aGDuAAAA+klEQVRYw+1X2RKDMAhcYj6717T+doMPTZpqDvFAnan7ogbMQiAwEKOMBzcFCeFC4b1lLq6lf0SJrTCDUDMsgDNaXPwzSoxgbyXYKco0RXkZNcOAAbz94Ti/7npG0OCZNzLVorE0YwCM+7oOAxDGWoF3jNqIMnwusrFuNRnr1KzqbcCO9/qk/h9qm7Y3bJLfgJVcJJ1qZnMbp21eifqz+/Vn8TUIgk4Ajto+ApxESYdaByf1xsj2a/I5rZNeVeowRTxVK2r1wJ3SjRZQB+xYUnTOXTT4sI96NIFw0500h17HjDc96bxJs0rdeDXz/Y4+LMfRSsq4b2tMmh0YkUdmaMBv9QAAAABJRU5ErkJggg=="
					/>
				</svg>
				<div className="message-box_top__middle" />
				<svg
					className="message-box_top__right"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					width="61"
					height="35"
					viewBox="0 0 61 35"
				>
					<image
						data-name="message-box_right"
						width="61"
						height="35"
						xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAjCAQAAACNt8qJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQflBRwMIzYge1xaAAAA5ElEQVRYw+1XQRLDIAhcMj67udS8O/YQY1MllGa66UzsXnQEXBURkXsCAEBwEwCYUh4oWCVbqTbWYqvVItRmCWlfW5XaFvsYDll9BT+kDqsz6vYJUfqyI1/gc4Ac85ONWC7jaFwzyoGLS4vqa3sJgUE5l3bK/tTim0JdL0LffZ9x/ac+GeQbviAhNo+mcKgFbSo+adcttRbZFOqW+DWNLMd/tfQxu7T6jOs+qcmvmbUzKvVgVh/UA7d/uxRq36QUat/fPsSq0oyanYy546s0ndSfVR8XqTSV4FJSHoeaUWm+lwDAA7PwOV6H4/Q4AAAAAElFTkSuQmCC"
					/>
				</svg>
			</div>
			<div className="message-box_body">{children}</div>
		</MessageBoxBlock>
	);
};

export default MessageBox;
