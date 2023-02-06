import {ConstructorExceptionError} from 'global/error';

// 값 객체
export class FullName {
  private readonly firstName: FirstName;
  private readonly lastName: LastName;

  constructor(firstName: FirstName, lastName: LastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public toString(): string {
    return this.firstName.getValue() + ' ' + this.lastName.getValue();
  }
}

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

export class FirstName extends Name {
  constructor(value: string) {
    super(value);
  }

  protected isInvalidLength(value: string): boolean {
    return 1 > value.length;
  }
}

export class LastName extends Name {
  constructor(value: string) {
    super(value);
  }

  protected isInvalidLength(value: string): boolean {
    return 2 > value.length;
  }
}
