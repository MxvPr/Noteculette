export default class Calculation {
  constructor(id, operation, operands, result, timestamp) {
    this.id = id;
    this.operation = operation;
    this.operands = operands;
    this.result = result;
    this.timestamp = timestamp || new Date();
  }
}