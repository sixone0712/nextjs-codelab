import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <html lang="en">
//       <Head>
//         <meta charSet="utf-8" />
//         <title>React Practice</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no" />
//         {/* 스타일시트 링크 */}
//         {/* 웹폰트 임포팅 */}
//         {/* 매타 설정 */}
//       </Head>
//       <body>
//         <Main />  {/* 라우터에 해당하는 페이지가 렌더링 되는 부분 */}
//         <NextScript />  {/* Next 관련 된 자바스크립트 파일 */}
//       </body>
//     </html>
//     )
//   }
// }

import { ServerStyleSheet } from 'styled-components';
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles form components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a props
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main /> {/* 라우터에 해당하는 페이지가 렌더링 되는 부분 */}
          <NextScript /> {/* Next 관련 된 자바스크립트 파일 */}
        </body>
      </Html>
    );
  }
}
