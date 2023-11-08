export function isPasswordValid(password: string, strict?: boolean) {
  let cap = false, // Has uppercase characters
    low = false, // Has lowercase characters
    num = false, // At least one number
    min = false, // Eight characters, or fifteen in strict mode.
    admin_min = false;
  if (password.length >= 7 && (!strict || password.length > 14)) min = true;
  if (strict && password.length > 14) admin_min = true;
  if (password.match(/\d/)) num = true;
  if (password.match(/[a-z]/)) low = true;
  if (password.match(/[A-Z]/)) cap = true;

  return cap && low && num && min && (strict ? admin_min : true);
}
