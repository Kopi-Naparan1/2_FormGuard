// Strict TypeScript: small helper types
type Validator = (value: string) => { ok: boolean; msg?: string };

const $ = <T extends HTMLElement = HTMLElement>(sel: string) =>
  document.querySelector(sel) as T | null;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string) =>
  Array.from(document.querySelectorAll(sel)) as T[];

const nameInput = $("#name") as HTMLInputElement;
const emailInput = $("#email") as HTMLInputElement;
const passwordInput = $("#password") as HTMLInputElement;
const confirmInput = $("#confirmPassword") as HTMLInputElement;
const submitBtn = $("#submitBtn") as HTMLInputElement;

// Status elements
const nameHelp = $("#nameHelp") as HTMLElement;
const emailHelp = $("#emailHelp") as HTMLElement;
const passwordHelp = $("#passwordHelp") as HTMLElement;
const confirmHelp = $("#confirmHelp") as HTMLElement;

const nameStatus = $("#nameStatus") as HTMLElement;
const emailStatus = $("#emailStatus") as HTMLElement;
const passwordStatus = $("#passwordStatus") as HTMLElement;
const confirmStatus = $("#confirmStatus") as HTMLElement;
