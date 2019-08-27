module.exports = {
  type: 'react-app',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactNwbSite',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    extra: {
      entry: './examples/index',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [
          { test: /\.tsx?$/, loader: ["awesome-typescript-loader"] },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          },
          {
            test: /\.(sa|sc)ss$/,
            use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader",
              "sass-loader", // compiles Sass to CSS, using Node Sass by default,
            ],
          },
        ]
      },
    }
  },
  devServer: {
    // compress: true,
    // hot: true,
    // host: '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/sip-api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
