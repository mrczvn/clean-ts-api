import {
  IAddAccount,
  IAddAccountModel,
  IAccountModel,
  IEncrypter
} from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const { password } = account

    await this.encrypter.encrypt(password)

    return new Promise((resolve) => resolve(null))
  }
}
