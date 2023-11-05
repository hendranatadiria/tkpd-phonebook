import { colors } from "@/config/theme";
import styled from "@emotion/styled";

const OutlinedButton = styled.button<{fullWidth?: boolean}>`
    background-color: transparent;
    color: ${colors.primary};
    font-weight: bold;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    border: 2px solid ${colors.primary};
    &:hover {
        cursor: pointer;
    }
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    width: ${({fullWidth}) => fullWidth== true ? '100%' : 'auto'};
`;

export default OutlinedButton;