import {ConstructorExceptionError} from 'global/error';

export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (!value.trim()) {
      throw new ConstructorExceptionError('빈 값');
    }
    this.value = value;
  }
}
