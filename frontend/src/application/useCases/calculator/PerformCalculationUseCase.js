export default class PerformCalculationUseCase {
  constructor(calculatorRepository, calculatorService) {
    this.calculatorRepository = calculatorRepository;
    this.calculatorService = calculatorService;
  }
  
  async execute(operation, operands) {
    if (!this.calculatorService.isValidOperation(operation, operands)) {
      throw new Error('Opération invalide');
    }
    
    return await this.calculatorRepository.performCalculation(operation, operands);
  }
}