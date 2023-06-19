import {
  Alphabet,
  FSMBlueprint,
  State,
  TransitionsMap,
} from "./model/FSM.model";
import { convertInputTransitionsToMap } from "./utils/fsm.utils";

export class FiniteStateMachine<
  ST extends State,
  SY extends Alphabet,
  StatesList extends ST[] = ST[]
> {
  protected states: Set<State>;
  protected alphabet: Set<Alphabet>;
  protected initialState: ST;
  protected acceptingStates: Set<State>;
  protected transitions: TransitionsMap<ST, Alphabet>;

  constructor(fsmBlueprint: FSMBlueprint<ST, SY, StatesList>) {
    const {
      states,
      alphabet,
      initialState,
      acceptingStates,
      transitions = {},
    } = fsmBlueprint;
    this.states = new Set(states);
    this.alphabet = new Set(alphabet.map(v => `${v}`));
    this.initialState = initialState;
    this.acceptingStates = new Set(acceptingStates);
    this.transitions = convertInputTransitionsToMap<ST, SY>(transitions);
  }

  protected isValidSymbol(symbol: Alphabet): boolean {
    return this.alphabet.has(symbol);
  }

  protected getNextState(currentState: ST, input: Alphabet): ST | undefined {
    const stateTransitions = this.transitions.get(currentState);
    return stateTransitions ? stateTransitions[input] : undefined;
  }
}
