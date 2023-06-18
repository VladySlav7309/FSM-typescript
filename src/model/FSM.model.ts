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

export interface FSMBlueprint<
  ST extends State,
  SY extends Alphabet,
  StatesList extends ST[] = ST[]
> {
  states: StatesList;
  alphabet: SY[];
  initialState: StatesList[number];
  acceptingStates: Array<StatesList[number]>;
  transitions?: InpuTransitions<StatesList[number], SY>;
}
