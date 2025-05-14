import CalculatorRepository from '../../domain/repositories/CalculatorRepository';
import Calculation from '../../domain/entities/Calculation.js';

export default class ApiCalculatorRepository extends CalculatorRepository {
  constructor(calculatorApi) {
    super();
    this.calculatorApi = calculatorApi;
    this.history = [];
  }
  
  async performCalculation(operation, operands) {
    let result;
    
    if (operands.length !== 2) {
      throw new Error('Cette implémentation ne supporte que 2 opérandes');
    }
    
    const [a, b] = operands;
    
    switch (operation) {
      case 'addition':
        result = await this.calculatorApi.addition(a, b);
        break;
      case 'subtraction':
        result = await this.calculatorApi.soustraction(a, b);
        break;
      case 'multiplication':
        result = await this.calculatorApi.multiplication(a, b);
        break;
      case 'division':
        result = await this.calculatorApi.division(a, b);
        break;
      default:
        throw new Error('Opération non supportée');
    }
    
    const calculation = new Calculation(
      Date.now().toString(),
      operation,
      operands,
      result.result,
      new Date()
    );
    
    // Sauvegarder en mémoire locale pour l'historique
    this.history.push(calculation);
    
    return calculation;
  }
  
  async getHistory() {
    return this.history;
  }
}