import PersonalError from '@utils/Personal.error';
import {StatusCodes} from 'http-status-codes';

import Hash from '@utils/Hash';
import UserValidate from '@middleware/userValidate.middleware';
import Token from '@utils/Token';

import type UserModel from '@models/user.model';
import type {INewUser} from 'src/interfaces/newUser.interface';
import type {TokenPayload} from '@utils/Token';
import type {ITransaction} from 'src/interfaces/transaction.interface';
import type {IFilter} from 'src/interfaces/filter.interface';
import type {IBalance} from '../interfaces/balance.interface'
import type {transactions} from '@prisma/client';

export default class UserService {
	private readonly _model: UserModel;

	constructor(model: UserModel) {
		this._model = model;
	}

	public async newUser(data: INewUser): Promise<void | string> {
		UserValidate.validNewUser(data);
		const hashPassword = await Hash.newHash(data.password);

		try {
			await this._model.newUser({...data, password: hashPassword});
			return 'User created successfully';
		} catch (error: unknown) {
			throw new PersonalError(StatusCodes.BAD_REQUEST, 'User already exists');
		}
	}

	public async login(data: INewUser): Promise<string> {
		UserValidate.validLogin(data);

		const user = await this._model.login(data.username);
		if (!user) {
			throw new PersonalError(StatusCodes.BAD_REQUEST, 'Non-existent user'); // Error 400;
		}

		const valid = await Hash.validateHash(data.password, user.password);
		if (!valid) {
			throw new PersonalError(StatusCodes.BAD_REQUEST, 'Password invalid'); // Error 400;
		}

		return Token.newToken({id: user.id, accountId: user.accountId});
	}

	public async getUserBalance(token: TokenPayload): Promise<IBalance> {
		const balance = await this._model.getUserBalance(token.accountId);

		return {balance, accountId: token.accountId};
	}

	public async cashOutAndCashIn(token: TokenPayload, data: ITransaction): Promise<void> {
		UserValidate.validTransaction(data);

		await this._model.cashOutAndCashIn(token.accountId, data.username, data.value);
	}

	public async filterTransactions(token: TokenPayload, data: IFilter): Promise<transactions[] | IFilter[]> {
		UserValidate.validFilter(data);

		const filterResult = await this._model.filterTransactions(token.accountId, data);

		if (!filterResult.length) {
			throw new PersonalError(StatusCodes.NOT_FOUND, 'No transaction found'); // Error 404
		}

		return filterResult;
	}
}
