export class ConstructorExceptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConstructorExceptionError';
  }
}
