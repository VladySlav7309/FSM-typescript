import { describe, expect, it } from "vitest";
import { FiniteStateMachine } from "../src/FiniteStateMachine";

describe("With minimum setup", () => {
  const fsm = new FiniteStateMachine(["S3", "S2"], [], "S3", ["S2"]);
  it("Should return initial state", () => {
    expect(fsm.run()).toEqual("S3");
  });
});
