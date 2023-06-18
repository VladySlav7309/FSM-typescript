export type State = string;
export type Alphabet = string | number;

export type OptionalTransitions<ST extends State, SY extends Alphabet> = {
  [key in SY]?: ST;
};

export type InpuTransitions<ST extends State, SY extends Alphabet> = {
  [key in ST]?: {
    on: OptionalTransitions<ST, SY>;
  };
};

export type TransitionsMap<ST extends State, SY extends Alphabet> = Map<
  State,
  OptionalTransitions<ST, SY>
>;

export class FiniteStateMachine<
  ST extends State,
  SY extends Alphabet,
  StatesList extends ST[] = ST[]
> {
  private states: Set<State>;
  private alphabet: Set<Alphabet>;
  private initialState: ST;
  private acceptingStates: Set<State>;
  private transitions: TransitionsMap<ST, SY>;

  constructor(
    states: StatesList,
    alphabet: SY[],
    initialState: StatesList[number],
    acceptingStates: Array<StatesList[number]>,
    transitions: InpuTransitions<StatesList[number], SY> = {}
  ) {
    this.states = new Set(states);
    this.alphabet = new Set(alphabet.map(v => `${v}`));
    this.initialState = initialState;
    this.acceptingStates = new Set(acceptingStates);
    this.transitions = this.convertInputTransitionsToMap(transitions);
  }

  private convertInputTransitionsToMap = (
    transitions: InpuTransitions<ST, SY>
  ): TransitionsMap<ST, SY> => {
    const statesKeys = (Object.keys(transitions) || []) as ST[];
    const initial: TransitionsMap<ST, SY> = new Map();

    return statesKeys.reduce((acc, stateName: ST) => {
      const transitionsFromState = transitions[stateName]?.on;
      if (transitionsFromState) {
        acc.set(stateName, transitionsFromState);
      }
      return acc;
    }, initial);
  };

  private isValidState(state: ST): boolean {
    return this.states.has(state);
  }

  private isValidSymbol(symbol: SY): boolean {
    return this.alphabet.has(symbol);
  }

  private getNextState(currentState: ST, input: SY): ST | undefined {
    const stateTransitions = this.transitions.get(currentState);
    return stateTransitions ? stateTransitions[input] : undefined;
  }

  public run(inputSymbols: SY[] = []): ST | null {
    let currentState = this.initialState;

    for (const symbol of inputSymbols) {
      if (!this.isValidSymbol(symbol)) {
        throw new Error(`Symbol: ${symbol} in not in the input alphabet`);
      }

      const nextState = this.getNextState(currentState, symbol);
      if (nextState) {
        currentState = nextState;
      } else {
        throw new Error(
          `State ${currentState} has no transition handler for symbol ${symbol}`
        );
      }
    }

    if (this.acceptingStates.has(currentState)) {
      return currentState;
    }

    throw new Error(
      `State ${currentState} is not registered as an accepting state`
    );
  }
}
