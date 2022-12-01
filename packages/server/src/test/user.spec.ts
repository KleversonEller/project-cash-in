import UserModel from '@models/user.model';
import UserService from '@services/user.service';
import prisma from '@models/connect.prisma';
import {
	mockNewUser,
	newUserMock,
	mockNewUserFail,
	newUserMockFail,
	loginMock,
	mockLogin,
	mockLoginFail,
} from './mock/user.mock';

describe('Testando as regras de negocio para usuários', () => {
	const model = new UserModel(prisma);
	const service = new UserService(model);

	it('Verificando se a criação de um novo usuário é bem sucedida', async () => {
		const newUser = jest.spyOn(model, 'newUser').mockImplementation(newUserMock);

		const result = await service.newUser(mockNewUser);

		expect(newUser).toHaveBeenCalled();
		expect(typeof result).toBe('string');
		expect(result).toEqual('User created successfully');
	});

	it('Verificando a falha na criação de um novo usuário ao passar argumentos inválidos', async () => {
		try {
			await service.newUser(mockNewUserFail);
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 405);
		}
	});

	it('Verificando a falha ao testar criar um usuário ja existente', async () => {
		const newUser = jest.spyOn(model, 'newUser').mockImplementation(newUserMockFail);
		try {
			await service.newUser(mockNewUser);
		} catch (error: unknown) {
			expect(newUser).toHaveBeenCalled();
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 400);
			expect(error).toHaveProperty('message', 'User already exists');
		}
	});

	it('Verificando se o login é bem sucedido', async () => {
		const login = jest.spyOn(model, 'login').mockImplementation(loginMock);

		const result = await service.login(mockLogin);

		expect(login).toHaveBeenCalled();
		expect(typeof result).toBe('string');
	});

	it('Verificando a falha no login ao passar argumentos inválidos', async () => {
		try {
			await service.login(mockLoginFail);
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 400);
		}
	});

	it('Verificando a falha no login ao passar um usuário não cadastrado', async () => {
		try {
			await service.login(mockLoginFail);
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 400);
			expect(error).toHaveProperty('message', 'Non-existent user');
		}
	});
});

