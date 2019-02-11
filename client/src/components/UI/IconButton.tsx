import React from "react";
import styled from "styled-components";
import { IObj } from "../../typeDefs";

const Icon: any = styled.i`
  position: relative;
  display: inline-block;
  align-self: center;
  flex-grow: 0;
  flex-basis: content;
  font-size: ${(props: IObj) => props.size};
  color: ${(props: IObj) => props.color};
  &:hover {
    transform: scale(1.1);
    transition: transform 500ms;
  }
`;

export default function IconButton(props: IObj) {
  return (
    <Icon size={props.size} color={props.color} className="material-icons">
      {props.children}
    </Icon>
  );
}
