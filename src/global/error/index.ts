export class ConstructorExceptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConstructorExceptionError';
  }
}

export class ExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExistError';
  }
}
