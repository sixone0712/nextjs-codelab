// 다른 대안은 https://medium.com/sebride/next-js-with-module-sass-a8fe3976147
// node-sass 4.0에서 작동
// node-sass
// @zeit/next-css
// @zeit/next-sass
// const withSass = require('@zeit/next-sass');
// const withCss = require('@zeit/next-css');
// module.exports = withCss(withSass());

// Next.js 홈페이지의 방법
// sass
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
