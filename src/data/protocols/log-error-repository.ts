export interface ILogErrorRepository {
  log(stack: string): Promise<void>
}
