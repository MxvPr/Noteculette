export default class GetCalculationHistoryUseCase {
  constructor(calculatorRepository) {
    this.calculatorRepository = calculatorRepository;
  }
  
  async execute() {
    return await this.calculatorRepository.getHistory();
  }
}