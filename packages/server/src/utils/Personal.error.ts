/**
 * @function PersonalError
 * ? Classe que estende a classe de erro do JS para poder gerar erros personalizados
 */

export default class PersonalError extends Error {
	constructor(public status: number, public message: string) {
		super();
		this.status = status;
		this.message = message;
	}
}
