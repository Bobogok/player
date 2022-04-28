import styled, { css } from 'styled-components';

interface ITypography {
  variant: string;
}

const Typography = styled.a<ITypography>`
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5;
  cursor: pointer;

  ${(props) => {
    switch (props.variant) {
      case 'main':
        return css`
          font-weight: 600;
          font-size: 1.25rem;
        `;
      case 'text':
        return css`
          font-weight: 400;
          font-size: 12px;
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}

  &:hover {
    color: #1976d2;
  }
`;

export default Typography;
