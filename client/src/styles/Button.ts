import styled from "styled-components";

type Props = {
    intent: 'submit' | 'edit' | 'delete';
    theme: any;
}
export const Button = styled.button<Props>(
    ({ intent, theme }) => {
        switch (intent) {
            case 'submit':
                return {
                    background: "linear-gradient(#2c77ff,rgba(44,118,255,.761))"
                }
            default:
                return {
                    background: "#9d1818cc"
                };
        }
    },
    {
        color: "aliceblue",
        width: "150px",
        cursor: "pointer",
        border: "0",
        borderRadius: "7px",
        padding: "10px",
        fontSize: "1rem"
    }
)
