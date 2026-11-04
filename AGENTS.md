<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- This is a static Vite + React SPA using React Router; routes are defined in `src/router.tsx`. Signed-in pages go under the route that uses the `requireUser` loader (redirects to `/sign-in`), which keeps the session check in one place.
