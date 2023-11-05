import styled from "@emotion/styled";

const HelperText = styled.p<{error?:boolean}>`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  ${({error}) => error ==true && "color: red" };
  `;

export default HelperText