export default class CalculatorService {
  isValidOperation(operation, operands) {
    if (operation === 'division' && operands.includes(0) && operands.indexOf(0) !== 0) {
      return false;
    }
    return true;
  }
}