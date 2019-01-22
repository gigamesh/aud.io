import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";

import styled from "styled-components";

const MyFormHelperTextBig = styled(FormHelperText)`
  font-size: 1rem;
`;

export default (props: any) => {
  return <MyFormHelperTextBig {...props}>{props.children}</MyFormHelperTextBig>;
};
