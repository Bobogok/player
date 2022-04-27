import styled, { css } from 'styled-components';

interface IWrapper {
  column?: boolean;
  flex?: string;
  justify?: string;
  margin?: string;
  setMargins?: boolean | string;
  alignItems?: string;
}

const Wrapper = styled.div<IWrapper>`
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  margin: ${(props) => props.margin};
  // margin-right: 10px;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  flex: ${(props) => props.flex};
  justify-content: ${(props) => props.justify};

  ${(props) => {
    if (typeof props.setMargins === 'boolean') {
      return css`
        & > svg {
          margin-right: 20px;
        }
      `;
    } else {
      return css`
        & > svg {
          margin: ${props.setMargins};
        }
      `;
    }
  }}
`;

export default Wrapper;
