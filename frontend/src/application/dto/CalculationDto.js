export default class CalculationDto {
  constructor(id, operation, operands, result, timestamp) {
    this.id = id;
    this.operation = operation;
    this.operands = operands;
    this.result = result;
    this.timestamp = timestamp;
  }

  static fromDomain(calculation) {
    return new CalculationDto(
      calculation.id,
      calculation.operation,
      calculation.operands,
      calculation.result,
      calculation.timestamp
    );
  }

  static toDomain(dto) {
    return {
      id: dto.id,
      operation: dto.operation,
      operands: dto.operands,
      result: dto.result,
      timestamp: dto.timestamp
    };
  }
}