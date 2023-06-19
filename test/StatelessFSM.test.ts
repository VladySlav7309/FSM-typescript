import { describe, expect, it } from "vitest";
import { StatelessFSM } from "../src/StatelessFSM";

describe("Stateless State Machine", () => {
  const fsm = new StatelessFSM({
    states: ["S0", "S1"],
    alphabet: [0, 1],
    initialState: "S0",
    acceptingStates: ["S0"],
  });

  describe("With minimum setup", () => {
    it("Should return initial state when called with no arguments", () => {
      expect(fsm.run()).toEqual("S0");
    });
  });

  describe("Should throw correct error", () => {
    it("When input symbol is not in alphabet", () => {
      const incorrectInputSymbols = "312";
      expect(() => fsm.run(incorrectInputSymbols)).toThrowError(
        /not in the input alphabet/
      );
    });

    it("When input symbols list is not iterable", () => {
      const incorrectInputSymbols = 123 as any;
      expect(() => fsm.run(incorrectInputSymbols)).toThrowError(/not iterable/);
    });

    it("When reached end but state is not accepting", () => {
      const fsmWithIncompleteAcceptingStates = new StatelessFSM({
        states: ["S0", "S1"],
        alphabet: [0, 1],
        initialState: "S0",
        acceptingStates: ["S1"],
        transitions: {
          S0: {
            on: {
              1: "S0",
              0: "S0",
            },
          },
        },
      });
      expect(() => fsmWithIncompleteAcceptingStates.run("01")).toThrowError(
        /not registered as an accepting state/
      );
    });

    it("When has no transition for symbol in state", () => {
      const fsmWithIncompleteAcceptingStates = new StatelessFSM({
        states: ["S0", "S1"],
        alphabet: [0, 1],
        initialState: "S0",
        acceptingStates: ["S1"],
        transitions: {
          S0: {
            on: {
              1: "S0",
            },
          },
        },
      });
      expect(() => fsmWithIncompleteAcceptingStates.run("0")).toThrowError(
        /no transition handler for symbol/
      );
    });
  });
});
