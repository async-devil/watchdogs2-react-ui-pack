import * as React from "react";

import styled from "styled-components";

const AlertBlock = styled.div``;

const Alert = (props: { title: string; options: string[]; children: JSX.Element }): JSX.Element => {
	const { title, options, children } = props;

	return <AlertBlock>{children}</AlertBlock>;
};

export default Alert;
