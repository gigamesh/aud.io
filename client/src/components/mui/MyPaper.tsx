import React from "react";
import Paper from "@material-ui/core/Paper";

import "./MyPaper.css";

const MyPaper = (props: any) => {
  let className = `paper${
    props.size_xs
      ? " paper--xs"
      : props.size_s
      ? " paper--s"
      : props.size_m
      ? " paper--m"
      : props.size_xl
      ? " paper--xl"
      : props.size_l
      ? " paper--l"
      : ""
  }`;

  className += props.form ? " form" : "";
  className += props.verticalfix && " paper--vertical-fix";
  className += props.currentwidth === "xs" && " paper--top-margin";

  return (
    <Paper {...props} className={className}>
      {props.children}
    </Paper>
  );
};

export default MyPaper;
