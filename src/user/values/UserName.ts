import {ConstructorExceptionError} from 'global/error';

abstract class Name {
  private readonly value: string;

  protected constructor(value: string) {
    // 값 객체는 준수해야 할 규칙을 강제할 수 있다.
    if (!value.trim()) {
      throw new ConstructorExceptionError('빈 값');
    }
    if (this.isInvalidWord(value)) {
      throw new ConstructorExceptionError('허가되지 않은 문자가 사용됨');
    }
    if (this.isInvalidLength(value)) {
      throw new ConstructorExceptionError('길이가 다름');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  private isInvalidWord(value: string): boolean {
    return !/^[a-zA-Z]+$/.test(value);
  }

  protected abstract isInvalidLength(value: string): boolean;
}

export class UserName extends Name {
  constructor(value: string) {
    super(value);
  }

  protected isInvalidLength(value: string): boolean {
    return 2 > value.length;
  }
}
