import {
  Alphabet,
  InpuTransitions,
  State,
  TransitionsMap,
} from "../model/FSM.model";

export const convertInputTransitionsToMap = <
  ST extends State,
  SY extends Alphabet
>(
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
