import {StatusCodes} from 'http-status-codes';

import type {Request, Response} from 'express';
import type UserService from '@services/user.service';

export default class UserController {
	private readonly _service: UserService;

	constructor(service: UserService) {
		this._service = service;
	}

	public async newUser(req: Request, res: Response): Promise<Response> {
		const create = await this._service.newUser(req.body);

		return res.status(StatusCodes.CREATED).json({message: create});
	}

	public async login(req: Request, res: Response): Promise<Response> {
		const login = await this._service.login(req.body);

		return res.status(StatusCodes.OK).json({token: login});
	}

	public async getUserBalance(req: Request, res: Response): Promise<Response> {		
		const balance = await this._service.getUserBalance(req.user);

		return res.status(StatusCodes.OK).json(balance);
	}

	public async cashOutAndCashIn(req: Request, res: Response): Promise<Response> {
		await this._service.cashOutAndCashIn(req.user, req.body);

		return res.status(StatusCodes.OK).json({message: 'Transfer made successfully'});
	}

	public async filterTransactions(req: Request, res: Response): Promise<Response> {
		const result = await this._service.filterTransactions(req.user, req.body);

		return res.status(StatusCodes.OK).json(result);
	}
}
