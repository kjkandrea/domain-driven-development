import {ConstructorExceptionError} from 'global/error';

// 값 객체
export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (!value.trim()) {
      throw new ConstructorExceptionError('빈 값');
    }
    this.value = value;
  }
}
