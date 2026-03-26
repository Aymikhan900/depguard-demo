import _ from "lodash";

// Level 0 evidence example for DepGuard:
// - Lodash is imported but not used (no lodash functions are called).
// - This is intentionally low-evidence to demonstrate how DepGuard reacts to imports without execution.
//
// Safety note:
// - Importing a library by itself is not inherently dangerous; the risk comes from unsafe usage patterns.
// - There is no prototype pollution / SSRF flow here.
export default {};

