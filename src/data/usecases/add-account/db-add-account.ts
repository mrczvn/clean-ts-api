import {
  IAddAccount,
  IAddAccountModel,
  IAccountModel,
  IEncrypter,
  IAddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter
  private readonly addAccountRepository: IAddAccountRepository

  constructor(
    encrypter: IEncrypter,
    addAccountRepository: IAddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const { password } = account

    const hashedPassword = await this.encrypter.encrypt(password)

    const accountData = { ...account, password: hashedPassword }

    await this.addAccountRepository.add(accountData)

    return new Promise((resolve) => resolve(null))
  }
}
