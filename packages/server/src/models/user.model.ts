/* eslint-disable @typescript-eslint/naming-convention */
import {StatusCodes} from 'http-status-codes';

import PersonalError from '@utils/Personal.error';

import type {PrismaClient, transactions, users} from '@prisma/client';
import type {INewUser} from 'src/interfaces/newUser.interface';
import type {IFilter} from 'src/interfaces/filter.interface';

export default class UserModel {
	private readonly _connect: PrismaClient;

	constructor(connect: PrismaClient) {
		this._connect = connect;
	}

	public async newUser(data: INewUser): Promise<users> {
		const user = await this._connect.users.create({
			data: {
				username: data.username,
				password: data.password,
				account: {
					create: {},
				},
			},
		});

		return user;
	}

	public async login(username: string): Promise<users> {
		const user = await this._connect.users.findUnique({where: {username}});

		return user;
	}

	public async getUserBalance(accountId: string): Promise<number> {
		const balance = await this._connect.accounts.findUnique({where: {id: accountId}});

		return balance.balance;
	}

	public async cashOutAndCashIn(accountCashOutId: string, userCashInId: string, value: number): Promise<void> {
		const accountCashOut = await this._connect.accounts.findFirst({where: {id: accountCashOutId}});
		const accountCashIn = await this._connect.users.findFirst({where: {username: userCashInId}});

		if (accountCashOut.balance >= value && accountCashIn.accountId !== accountCashOutId) {
			await this._connect.$transaction([

				this._connect.accounts.update({where: {id: accountCashOutId},
					data: {balance: {decrement: value}}}),

				this._connect.accounts.update({where: {id: accountCashIn.accountId},
					data: {balance: {increment: value}}}),

				this._connect.transactions.create({data: {
					value,
					debitedAccountId: accountCashOut.id,
					creditedAccountId: accountCashIn.accountId,
				}}),
			]);
		} else {
			throw new PersonalError(StatusCodes.BAD_REQUEST, 'Transaction failed, check the information provided'); // Error 400;
		}
	}

	public async filterTransactions(accountId: string, data: IFilter): Promise<transactions[]> {
		if (!Object.keys(data).length) {
			return this._connect.transactions
				.findMany({
					where: {
						OR: [{creditedAccountId: accountId}, {debitedAccountId: accountId}]}});
		}

		return this._connect.transactions
			.findMany({
				where: {
					OR: [
						{creditedAccountId: (data.credited ? accountId : undefined)},
						{debitedAccountId: (data.debited ? accountId : undefined)},
						{createdAt: (data.date && new Date(data.date))},
					],
					AND: [
						{
							debitedAccountId: (data.debited ? accountId : undefined),
							createdAt: (data.date && new Date(data.date)),
						},
						{
							creditedAccountId: (data.credited ? accountId : undefined),
							createdAt: (data.date && new Date(data.date)),
						},
					],
				},
			});
	}
}
