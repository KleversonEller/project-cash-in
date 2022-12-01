/* eslint-disable new-cap */
import {Router} from 'express';

import UserModel from '@models/user.model';
import UserService from '@services/user.service';
import UserController from '@controllers/user.controller';
import prisma from '@models/connect.prisma';
import Token from '@utils/Token';

const model = new UserModel(prisma);
const service = new UserService(model);
const controller = new UserController(service);

const userRouter = Router();

userRouter.post('/newUser', async (req, res) => controller.newUser(req, res));
userRouter.post('/login', async (req, res) => controller.login(req, res));
userRouter.get('/getUserBalance', (req, res, next) => {
	Token.decodedToken(req, res, next);
}, 	async (req, res) => controller.getUserBalance(req, res));

userRouter.patch('/cashOut', (req, res, next) => {
	Token.decodedToken(req, res, next);
}, 	async (req, res) => controller.cashOutAndCashIn(req, res));

userRouter.post('/filterTransactions', (req, res, next) => {
	Token.decodedToken(req, res, next);
}, 	async (req, res) => controller.filterTransactions(req, res));

export default userRouter;
