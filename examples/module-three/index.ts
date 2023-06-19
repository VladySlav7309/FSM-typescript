import { StatelessFSM } from "../../src/StatelessFSM";

const fsm = new StatelessFSM({
  states: ["S0", "S1", "S2"],
  alphabet: [0, 1],
  initialState: "S0",
  acceptingStates: ["S0", "S1", "S2"],
  transitions: {
    S0: {
      on: {
        0: "S0",
        1: "S1",
      },
    },
    S1: {
      on: {
        0: "S2",
        1: "S0",
      },
    },
    S2: {
      on: {
        0: "S1",
        1: "S2",
      },
    },
  },
});

window.fsm = fsm;

export const setupCalculator = (
  element: HTMLElement,
  resultTarget: HTMLElement
) => {
  element.addEventListener("click", (event: MouseEvent) => {
    const htmlTarget = event.target as HTMLElement;
    if (element.contains(htmlTarget)) {
      const input = htmlTarget.innerHTML;
      console.log("Will run with input: ", input);
      if (!isNaN(+input)) {
        try {
          resultTarget!.innerHTML = `Result: ${fsm.run(input as any)}`;
        } catch (error) {
          resultTarget!.innerHTML = `
            Failed to run. <br> <span class="error">${error}</span>
          `;
        }
      }
    }
  });
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Example FSM that calculates module-three from binary input</h1>
    <div id="calculator" class="card">
      <button type="button">1101</button>
      <button type="button">1110</button>
      <button type="button">1111</button>
    </div>
    <p id="calculation-result" class="calculation-result">
      Click any of the buttons above to see the result!
    </p>
  </div>
`;

setupCalculator(
  document.querySelector<HTMLElement>("#calculator")!,
  document.querySelector<HTMLElement>("#calculation-result")!
);
