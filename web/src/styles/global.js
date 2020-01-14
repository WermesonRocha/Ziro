import { createGlobalStyle } from 'styled-components';

// Definindo um estilo global para todos os componentes da aplicação
// box-sizing => Faz com que todas as propriedades aplicadas (margin, padding, etc) sejam somadas com as propriedades do elemento
// min-height => Faz com que a página ocupe 100% da altura por padrão
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #app {
    min-height: 100%;
  }

  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
