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
          boxShadow: "1px 1px 16px 0px " + Props.color
        }}
      ></div>
    </div>
  );
};

export default CompletionBar;
