import React, { useState, useEffect } from 'react';

const CalculatorPage = ({ 
  performCalculationUseCase, 
  getCalculationHistoryUseCase 
}) => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const calculationHistory = await getCalculationHistoryUseCase.execute();
        setHistory(calculationHistory);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique', error);
      }
    };

    if (getCalculationHistoryUseCase) {
      loadHistory();
    }
  }, [getCalculationHistoryUseCase]);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = async (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const currentValue = firstOperand || 0;
      
      const operationMappings = {
        '+': 'addition',
        '-': 'subtraction',
        '*': 'multiplication',
        '/': 'division'
      };
      
      const operationName = operationMappings[operator] || '';
      
      try {
        const calculation = await performCalculationUseCase.execute(
          operationName, 
          [currentValue, inputValue]
        );
        
        setHistory((prevHistory) => [...prevHistory, calculation]);
        setDisplay(String(calculation.result));
        setFirstOperand(calculation.result);
      } catch (error) {
        setDisplay('Error');
        console.error('Erreur de calcul:', error);
        setTimeout(clearDisplay, 2000);
        return;
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const mapOperationToSymbol = (operation) => {
    const symbols = {
      'addition': '+',
      'subtraction': '-',
      'multiplication': '×',
      'division': '÷'
    };
    return symbols[operation] || operation;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-5 text-apple-dark">Calculatrice</h2>
        <div className="glass-darker rounded-2xl p-5 max-w-md mx-auto">
          <div className="bg-white bg-opacity-80 p-4 text-right text-2xl rounded-xl mb-4 shadow-inner">
            {display}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <button 
              onClick={clearDisplay}
              className="p-4 text-lg bg-red-400 bg-opacity-80 hover:bg-opacity-100 text-white rounded-xl transition-all"
            >
              C
            </button>
            <button 
              onClick={() => setDisplay(display.slice(0, -1) || '0')}
              className="p-4 text-lg bg-gray-300 bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all"
            >
              ⌫
            </button>
            <button 
              disabled
              className="p-4 text-lg bg-gray-200 bg-opacity-50 rounded-xl opacity-50 cursor-not-allowed"
            >
              %
            </button>
            <button 
              onClick={() => performOperation('/')}
              className="p-4 text-lg bg-amber-400 bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all"
            >
              /
            </button>
            
            <button onClick={() => inputDigit('7')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">7</button>
            <button onClick={() => inputDigit('8')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">8</button>
            <button onClick={() => inputDigit('9')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">9</button>
            <button 
              onClick={() => performOperation('*')}
              className="p-4 text-lg bg-amber-400 bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all"
            >
              ×
            </button>
            
            <button onClick={() => inputDigit('4')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">4</button>
            <button onClick={() => inputDigit('5')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">5</button>
            <button onClick={() => inputDigit('6')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">6</button>
            <button 
              onClick={() => performOperation('-')}
              className="p-4 text-lg bg-amber-400 bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all"
            >
              -
            </button>
            
            <button onClick={() => inputDigit('1')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">1</button>
            <button onClick={() => inputDigit('2')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">2</button>
            <button onClick={() => inputDigit('3')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">3</button>
            <button 
              onClick={() => performOperation('+')}
              className="p-4 text-lg bg-amber-400 bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all"
            >
              +
            </button>
            
            <button onClick={() => inputDigit('0')} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all col-span-2">0</button>
            <button onClick={inputDecimal} className="p-4 text-lg bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl transition-all">.</button>
            <button 
              onClick={() => performOperation('=')}
              className="p-4 text-lg bg-green-500 bg-opacity-80 hover:bg-opacity-100 text-white rounded-xl transition-all"
            >
              =
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <h2 className="text-2xl font-semibold mb-5 text-apple-dark">Historique</h2>
        <div className="glass-darker rounded-2xl p-6">
          <h3 className="text-lg font-medium border-b border-gray-200 pb-3 mb-3 text-gray-700">Calculs récents</h3>
          {history.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">Aucun calcul effectué</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {history.map((calc, index) => (
                <li key={index} className="py-3 hover:bg-white hover:bg-opacity-20 rounded-lg px-2 transition-all">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      {mapOperationToSymbol(calc.operation)}
                    </span>
                    <span className="text-gray-700">{calc.operands[0]} {mapOperationToSymbol(calc.operation)} {calc.operands[1]} = </span>
                    <span className="text-apple-blue font-medium ml-1">{calc.result}</span>
                  </div>
                  <div className="mt-1">
                    <small className="text-xs text-gray-400">{formatTimestamp(calc.timestamp)}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;