import React from "react";
import styled, { css } from "styled-components";
import { COLORS, FONT } from "@/styles/theme";
import { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit";
  size?: keyof typeof buttonStyle;
  children?: ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ size, children, isSelected, ...restProps }: ButtonProps) => (
  <StyledButton size={size} isSelected={isSelected} {...restProps}>
    {children}
  </StyledButton>
);

const SMALL_BUTTON = css`
  width: 95px;
  height: 40px;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
  font-size: ${FONT.SIZE.MEDIUM};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  background: ${COLORS.WHITE};
  :hover {
    background: ${COLORS.BLUE};
    color: ${COLORS.WHITE};
  }
`;

const MEDIUM_BUTTON = css<ButtonProps>`
  width: 240px;
  height: 60px;
  background: ${COLORS.WHITE};
  color: ${({ isSelected }) => (isSelected ? COLORS.BLUE : COLORS.BLACK)};
  border: none;
  border-radius: 10px;
  font-weight: inherit;

  :hover {
    background: ${COLORS.BUTTON};
  }
`;

const LARGE_BUTTON = css<ButtonProps>`
  width: 350px;
  height: 50px;
  background: ${COLORS.BLUE};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: 10px;
  font-weight: inherit;
`;

const buttonStyle = {
  small: SMALL_BUTTON,
  medium: MEDIUM_BUTTON,
  large: LARGE_BUTTON,
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${({ size = "medium" }) => buttonStyle[size]}
`;

export default Button;
