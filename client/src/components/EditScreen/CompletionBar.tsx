import React from "react";

interface completionProps {
  completion: number;
  color: string;
}

const CompletionBar = (Props: completionProps) => {
  return (
    <div className="completion-bar">
      <div
        className="completion-bar-bar"
        style={{
          backgroundColor: Props.color,
          width: Math.min(Props.completion, 100) + "%",
        }}
      ></div>
    </div>
  );
};

export default CompletionBar;
