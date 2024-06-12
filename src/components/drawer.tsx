/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

const AnimatedDrawer = ({
  visible,
  onClose,
  children,
  closable,
  style,
}: AnimatedDrawerProps) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <DrawerContainer
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DrawerContent
            onClick={(e: any) => e.stopPropagation()}
            initial={{ y: "-100%" }}
            animate={{ y: "0" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            style={style ? style : {}}
          >
            {closable && (
              <CloseContainer>
                <button onClick={onClose}>
                  <CloseOutlined />
                </button>
              </CloseContainer>
            )}
            {children}
          </DrawerContent>
        </DrawerContainer>
      )}
    </AnimatePresence>
  );
};

export default AnimatedDrawer;

const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 24px 24px 0;
`;

const DrawerContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 99;
  opacity: 0;
`;

const DrawerContent = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  height: auto;
  background-color: white;
  padding: 24px 0 50px 0;
`;

interface AnimatedDrawerProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closable?: boolean;
  style?: React.CSSProperties;
}
