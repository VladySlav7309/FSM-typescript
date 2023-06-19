import { FiniteStateMachine } from "./FiniteStateMachine";
import { State, Alphabet } from "./model/FSM.model";
import {
  InputSymbolsNotIterableError,
  NoTransitionHandlerForSymbolError,
  StateIsNotAcceptingError,
  SymbolNotInAlphabetError,
} from "./model/Errors.model";

export class StatelessFSM<
  ST extends State,
  SY extends Alphabet,
  StatesList extends ST[] = ST[]
> extends FiniteStateMachine<ST, SY, StatesList> {
  public run(inputSymbols: string | Alphabet[] = []): ST | null {
    if (!inputSymbols || !inputSymbols[Symbol.iterator]) {
      throw new InputSymbolsNotIterableError(inputSymbols);
    }
    let currentState = this.initialState;

    for (const symbol of inputSymbols) {
      if (!this.isValidSymbol(symbol)) {
        throw new SymbolNotInAlphabetError(symbol);
      }

      const nextState = this.getNextState(currentState, symbol);
      if (nextState) {
        currentState = nextState;
      } else {
        throw new NoTransitionHandlerForSymbolError(symbol, currentState);
      }
    }

    if (this.acceptingStates.has(currentState)) {
      return currentState;
    }

    throw new StateIsNotAcceptingError(currentState);
  }
}
