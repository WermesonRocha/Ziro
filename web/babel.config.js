module.exports = {
  presets: [
    '@babel/preset-env', // Responsável por alterar as funções JS que o navegador ainda não entende
    '@babel/preset-react', // Responsável por alterar as funções do próprio react que o navegador ainda não entende (JSX, etc)
  ],
};
