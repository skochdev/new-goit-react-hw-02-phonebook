import styled from 'styled-components/macro';

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 400px;

  label {
    display: flex;
    flex-direction: column;
    color: ${p => p.theme.colors.text};
  }

  & label:first-child {
    margin-bottom: ${p => p.theme.space[5]}px;
  }

  input {
    display: block;
    padding: ${p => p.theme.space[3]}px;
    border: ${p => p.theme.borders[1]};
    border-color: ${p => p.theme.colors.primary};
    border-radius: ${p => p.theme.radii.alwaysround};
  }

  button {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const FieldWrapper = styled.div`
  position: relative;
`;

export const ErrorText = styled.span`
  position: absolute;
  bottom: 10px;
  font-size: ${p => p.theme.fontSizes.s};
  color: ${p => p.theme.colors.accent};
`;
