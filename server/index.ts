import express from 'express';
import next from 'next';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSesssion from 'express-session';
import axios from 'axios';

const dev = process.env.NODE_ENV != 'production';
//const prod = process.env.NODE_ENV == 'production';

const app = next({ dev }); // dev : true or false
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser('CHPARK1234567890!@#'));
  server.use(
    expressSesssion({
      resave: false,
      saveUninitialized: false,
      secret: 'CHPARK1234567890!@#',
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );
  ß;

  // server.get('/detail', (req, res) => {
  //   console.log('/detail');
  // });

  server.get('/detail/:id', async (req, res) => {
    // 서버에서 데이터를 요청하고 params로 전달 할 수도 있다(주소 노출 안됨)
    /*
    try {
      const response = await axios({
        url: `https://jsonplaceholder.typicode.com/users/${router.query.id}`,
        method: 'get'
      });

      const actualPage = '/card_detail';
      const queryParams = {
        data: response.data
      };
      return app.render(req, res, actualPage, queryParams);
    } catch (err) {
      console.error(err);
    }

    const actualPage = '/card_detail';
    const queryParams = {
      id: req.params.id
    };
    */

    const actualPage = '/card_detail';
    const queryParams = {
      data: req.params.id
    };
    return app.render(req, res, actualPage, queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('next + express running on port 3000');
  });
});
