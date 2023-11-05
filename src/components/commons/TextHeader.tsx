import { colors, font } from "@/config/theme";
import styled from "@emotion/styled";

const TextHeader = styled.div`
  font-family: ${font.style.fontFamily};
  font-weight: 800;
  font-size: 2rem;
  text-align: left;
  padding-top: 2rem;
  padding-bottom: 1rem;
  color: ${colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  `;

export default TextHeader;