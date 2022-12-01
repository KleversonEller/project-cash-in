/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import Joi from 'joi';
import JoiPassword from 'joi-password-complexity';
import {StatusCodes} from 'http-status-codes';

import PersonalError from '@utils/Personal.error';

import type {INewUser} from 'src/interfaces/newUser.interface';
import type {ITransaction} from 'src/interfaces/transaction.interface';
import type {IFilter} from 'src/interfaces/filter.interface';

const validPasswordOptions = {
	min: 8,
	max: 50,
	upperCase: 1,
	numeric: 1,
};

export default class UserValidate {
	static validNewUser(data: INewUser): void {
		const {error} = Joi.object({
			username: Joi.string().required().min(3),
			password: JoiPassword(validPasswordOptions).required(),
		}).validate(data);

		if (error) {
			throw new PersonalError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405;
		}
	}

	static validLogin(data: INewUser): void {
		const {error} = Joi.object({
			username: Joi.string().required(),
			password: Joi.string().required(),
		}).validate(data);

		if (error) {
			throw new PersonalError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405;
		}
	}

	static validTransaction(data: ITransaction): void {
		const {error} = Joi.object({
			username: Joi.string().required(),
			value: Joi.number().required().positive().strict(),
		}).validate(data);

		if (error) {
			throw new PersonalError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405;
		}
	}

	static validFilter(data: IFilter): void {
		const {error} = Joi.object({
			date: [Joi.date().optional(), Joi.allow(null)],
			debited: [Joi.boolean().optional(), Joi.allow(null)],
			credited: [Joi.boolean().optional(), Joi.allow(null)],
		}).validate(data);

		if (error) {
			throw new PersonalError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405;
		}
	}
}
