#!/bin/bash

mkdir $1 && cd $1
cp /media/lolimay/Code/Web/Template/webpack/scaffold/. . -r
npm init -y
cnpm i -D chalk
node build/initialize.js
cnpm i -D babel-eslint clean-webpack-plugin css-loader eslint html-webpack-plugin inline-manifest-webpack-plugin optimize-css-assets-webpack-plugin style-loader uglifyjs-webpack-plugin webpack webpack-dev-server webpack-merge copy-webpack-plugin