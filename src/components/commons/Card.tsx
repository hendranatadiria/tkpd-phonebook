import styled from "@emotion/styled";

const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  ${props => props.onClick !== undefined && `cursor: pointer`}
  `;

export default Card;