import { Alphabet, State } from "./FSM.model";

export class SymbolNotInAlphabetError extends Error {
  constructor(symbol: Alphabet) {
    super();

    this.message = `Symbol: ${symbol} in not in the input alphabet`;
  }
}

export class NoTransitionHandlerForSymbolError extends Error {
  constructor(symbol: Alphabet, state: State) {
    super();

    this.message = `State ${state} has no transition handler for symbol ${symbol}`;
  }
}

export class StateIsNotAcceptingError extends Error {
  constructor(state: State) {
    super();

    this.message = `State ${state} is not registered as an accepting state`;
  }
}

export class InputSymbolsNotIterableError extends Error {
  constructor(symbols: string | Alphabet[]) {
    super();

    this.message = `Provided symbols ${symbols} are not iterable`;
  }
}
