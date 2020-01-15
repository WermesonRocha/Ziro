import styled, { keyframes, css } from "styled-components";

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 10px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
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

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 2px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;

export const EmptyUsers = styled.strong`
  margin-left: 150px;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
`;
