import styled from "styled-components";

export const User = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center !important;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    margin-top: 5px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  h2 {
    font-size: 22px;
    margin-top: 10px;
  }

  h3 {
    font-size: 20px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const UpdateButton = styled.button`
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
`;
