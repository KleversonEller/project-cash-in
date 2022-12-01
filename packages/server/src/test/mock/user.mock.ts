import type {users} from '@prisma/client';

export async function newUserMock(): Promise<users> {
	return {
		id: 'f77516ca-7a-4ba1-b117-dea8a55b31b2',
		username: 'UserTeste',
		password: '$2b$10$Ws5g.lJEWLN4FCPTG7znaOjq9746dYd6BAXe65sRD9uoXWTOM/.gu',
		accountId: '9c15596d-9d7e-4495-98f6-9b1250900a85',
	};
}

export async function newUserMockFail(): Promise<users> {
	throw new Error();
}

export const mockNewUser = {
	username: 'UserTeste',
	password: 'Testnewuser24',
};

export const mockNewUserFail = {
	username: 'Us',
	password: 'test',
};

export async function loginMock(): Promise<users> {
	return {
		id: '85c9cf90-d572-4152-8681-59870589923b',
		username: 'UserTeste',
		password: '$2b$10$yTJBAmF7eY8mJMkuIVgTTueUrIZBeiqvi13bIe8EQZsguCSxmQ3eu',
		accountId: 'a75d86a5-bb78-4f0b-bda8-1a9298401c02',
	};
}

export const mockLogin = {
	username: 'UserTeste',
	password: 'Testnewuser24',
};

export const mockLoginFail = {
	username: 'UserTes',
	password: 'Testnewuser24',
};

export default {
	mockNewUser,
	mockNewUserFail,
	mockLogin,
	newUserMock,
	newUserMockFail,
	loginMock,
};
