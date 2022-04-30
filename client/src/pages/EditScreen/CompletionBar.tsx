import React from "react";
import styled from "styled-components";
import { Box } from "../../styles/Box";

interface completionProps {
  completion: number;
  color: string;
}

const StyledBar = styled(Box)`
  border-radius: 9px;
  height: 6px;
  width: 100%;
  ${({ theme }) => `
    background: ${theme.emptyBar}
  `}
`;

const Bar = styled(Box)`
  border-radius: 9px;
  height: 6px;
`;

const CompletionBar = ({ completion, color }: completionProps) => {
  return (
    <StyledBar>
      <Bar
        style={{
          backgroundColor: color,
          width: Math.min(completion, 100) + "%",
          boxShadow: "1px 1px 16px 0px " + color,
          transition: "all 1s ease-in-out",
        }}
      />
    </StyledBar>
  );
};

export default CompletionBar;
