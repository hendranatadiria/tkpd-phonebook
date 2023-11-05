import { colors } from "@/config/theme";
import styled from "@emotion/styled";

const StyledButton = styled.button<{fullWidth?: boolean}>`
    background-color: ${colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #fff;
    font-weight: bold;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    &:hover {
        cursor: pointer;
    }
    width: ${({fullWidth}) => fullWidth== true ? '100%' : 'auto'};
`;

export default StyledButton;