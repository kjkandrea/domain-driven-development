import {ConstructorExceptionError} from 'global/error';
import {ObjectValue} from 'global/abstracts/ObjectValue';

export class CircleName extends ObjectValue<string> {
  protected constructor(value: string) {
    super(value);

    if (!value.trim()) {
      throw new ConstructorExceptionError('빈 값');
    }
    if (value.length < 3) {
      throw new ConstructorExceptionError('서클명은 3글자 이상이어야 함');
    }
    if (value.length > 20) {
      throw new ConstructorExceptionError('서클명은 20글자 이하이어야 함');
    }
  }

  public equals(other: CircleName): boolean {
    return this.getValue() === other.getValue();
  }
}
