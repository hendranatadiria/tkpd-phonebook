import { colors } from "@/config/theme";
import styled from "@emotion/styled";
import { error } from "console";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { HelperText } from ".";

const TextFieldBase = styled.input<{error?: boolean}>`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border: 1px solid transparent;
  &::placeholder {
    color: #9e9e9e;
  }
  &:focus {
    outline: none;
    border: 1px solid ${colors.primary};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  }
  ${({error}) => error ==true && "border: 1px solid red" };
  `;

  const TextFieldContainer = styled.div`
  margin-bottom: 1rem;
  `;

  type TextFieldProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    error?: boolean;
    helperText?: string;
  }


  const TextField = ({error, helperText, ...props}: TextFieldProps) => {
    return (
      <TextFieldContainer>
        <TextFieldBase {...props} error={error} />
        {Boolean(helperText) && (<HelperText error={error}>{helperText}</HelperText>)}
      </TextFieldContainer>
    )
  }

export default TextField;