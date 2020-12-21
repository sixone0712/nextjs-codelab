// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import '../styles/styles.scss';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>React Practice</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no"
        />
        {/* 스타일시트 링크 */}
        {/* 웹폰트 임포팅 */}
        {/* 매타 설정 */}
      </Head>

      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

/*
// react store
const configureStore = (initialState, options) => {
  const middlewares = []; // 미들웨어 react-thunk나 react-saga 등등
  // Compose를 통해 미들웨어 결합
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, initialState, enhancer);

  return store;
};

// store는 withRdux를 통해 props로 주입
export default withRedux(configureStore)(MyApp);
*/

export default wrapper.withRedux(MyApp);
