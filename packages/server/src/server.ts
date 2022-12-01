import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';

import middlewareError from '@middleware/error.middleware';
import userRouter from './routers/user.routes';
import swaggerFile from './doc/swagger-output.json';

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(middlewareError);

app.listen(3015, () => {
	console.log('Utilizando a porta 3015');
},
);
