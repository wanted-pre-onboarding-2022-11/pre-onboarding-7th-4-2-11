import styled from "styled-components";
import React, { CSSProperties, HTMLAttributes, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { useClickAway } from "@/hooks";
import classes from "./index.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  style?: CSSProperties;
  scrollBlock?: boolean;
}

const blockTabKey = (e: KeyboardEvent) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }
};

const Modal = ({ children, visible = false, onClose, scrollBlock = false, ...props }: Props) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    onClose && onClose();
  });

  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(el);
  }, [el]);

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", blockTabKey);
      document.addEventListener("keyup", blockTabKey);
    }
    if (scrollBlock) {
      document.body.classList.add(classes["scroll-block"]);
    }

    return () => {
      document.removeEventListener("keydown", blockTabKey);
      document.removeEventListener("keyup", blockTabKey);
      if (scrollBlock) {
        document.body.classList.remove(classes["scroll-block"]);
      }
    };
  }, [visible, scrollBlock]);

  return ReactDOM.createPortal(
    <BackgroundDim style={{ display: visible ? "block" : "none" }}>
      <ModalContainer ref={ref} {...props}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el,
  );
};

export default Modal;

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: ${({ style }) => style?.backgroundColor || "white"};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  animation: slide-up 1s ease-out;

  @keyframes slide-up {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
