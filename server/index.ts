import express from 'express';
import next from 'next';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSesssion from 'express-session';

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

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('next + express running on port 3000');
  });
});
