import React from "react";
import styled from "styled-components";
import { alignItems, background, border, borderRadius, color, compose, fontSize, fontStyle, fontWeight, justifyContent, layout, margin, padding } from "styled-system";
type Props = React.CSSProperties;

export const Box = styled.div<Props>(
    ({ theme }) => ({
        margin: 0,
        padding: 0,
        color: theme.text,
        transition: 'all 0.3s'
    }),
    compose(
        layout,
        color,
        background,
        border,
        borderRadius,
        fontSize,
        padding,
        margin,
        fontWeight,
        alignItems,
        justifyContent,
        fontStyle
    )
)
