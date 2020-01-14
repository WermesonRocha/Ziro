const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), // Arquivo de entrada da aplicação
  output: {
    // Onde vai criar o bundle (código transpilado pelo webpack)
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-eval-source-map', // this helps to browser to point to the exact file in the console, helps in debug
  devServer: {
    // Pasta onde é encontrado o index.html
    contentBase: path.resolve(__dirname, 'public'),
    // this prevents the default browser full page refresh on form submission and link change
    historyApiFallback: true,
  },
  module: {
    // As regras dizem ao webpack o que usar para cada tipo de arquivo
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, // loader para carregar arquivos css
          { loader: 'css-loader' }, // loader que habilita opções mais avançadas como importação de imagem no css, etc
        ],
      },
    ],
  },
};
