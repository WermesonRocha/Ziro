import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SubmitButton = styled.button.attrs(props => ({
  disabled: props.loading
}))`
  background: #fff;
  border-width: 1px;
  border-color: #7159c1;
  padding: 0 15px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  color: #7159c1;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;

  :hover {
    border: none;
    background: #7159c1;
    color: #fff;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export default SubmitButton;
