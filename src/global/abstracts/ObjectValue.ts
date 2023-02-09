export abstract class ObjectValue<ValueType> {
  private readonly value: ValueType;

  constructor(value: ValueType) {
    this.value = value;
  }

  public getValue(): ValueType {
    return this.value;
  }
}
