// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "toggle";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setClient: "SETUP";
    toggle: "TOGGLE";
    updateData: "SETUP" | "UPDATE_DATA";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isOn: "";
  };
  eventsCausingDelays: {};
  matchesStates: "initializing" | "off" | "on" | "provisioning";
  tags: never;
}
