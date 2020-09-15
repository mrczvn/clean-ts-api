import { IAccountModel } from '../../domain/models/account'
import { IAddAccountModel } from '../../domain/usecases/add-account'

export interface IAddAccountRepository {
  add(account: IAddAccountModel): Promise<IAccountModel>
}
