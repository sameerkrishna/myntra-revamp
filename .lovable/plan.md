Upgrade the affected TanStack packages to pull in a patched `seroval` transitive dependency, resolving the critical advisory.

## Steps
1. Bump `@tanstack/react-router`, `@tanstack/react-start`, and `@tanstack/router-plugin` in `package.json` to their latest versions that resolve `seroval` to a patched release (GHSA-mv8w-475r-vwqw).
2. Regenerate `bun.lock` via `bun install --save-text-lockfile` so the scanner can verify the fix.
3. Run the dependency scan again to confirm the critical finding is cleared; verify the app still builds and the preview loads.
4. Mark the security finding as fixed.

## Notes
- Only dependency versions and the lockfile change; no application code is modified.
- If upgraded TanStack releases introduce breaking API changes, adjust minimally to keep routing/SSR working.
