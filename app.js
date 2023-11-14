import express from 'express';
import router from './router/index.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);




app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
