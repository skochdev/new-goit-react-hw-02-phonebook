import styled from 'styled-components/macro';

export const Filter = styled.input`
  padding: ${p => p.theme.space[3]}px;
  border: ${p => p.theme.borders[1]};
  border-color: ${p => p.theme.colors.muted};
  border-radius: ${p => p.theme.radii.alwaysround};
`;
