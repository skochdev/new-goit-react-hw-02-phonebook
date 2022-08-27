import styled from 'styled-components/macro';

export const About = styled.div`
  font-family: 'Roboto', serif;
  font-size: ${p => p.theme.fontSizes.s};

  span {
    line-height: 1.5;
    font-family: 'Rubik', serif;
    color: ${p => p.theme.colors.primary};
    font-weight: ${p => p.theme.fontWeights[3]};
  }
`;
