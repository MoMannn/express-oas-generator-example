import { HttpServer } from '..';

const api = new HttpServer();

(async () => {
  await api.listen();
})().catch(async (err) => {
  console.log(err);
  await api.close();
});
