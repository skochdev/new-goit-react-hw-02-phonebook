import styled from 'styled-components/macro';

export const ContactList = styled.ul`
  width: 600px;
  font-weight: ${p => p.theme.fontWeights[1]};
`;

export const RemoveButton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: ${p => p.theme.radii.round};
  padding: 0;
  margin: 0;
  cursor: pointer;
`;
