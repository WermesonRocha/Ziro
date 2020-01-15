import styled from "styled-components";

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
  margin-left: 35%;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
`;
