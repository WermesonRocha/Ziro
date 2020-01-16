import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 3%;
  margin-left: 26%;
  margin-right: 20%;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    a {
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      padding: 25px;
    }
  }
`;

export default Container;
