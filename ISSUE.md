# Shared board: retrying fetch, host save-as-image, guest lock

The shared anatomy board already has `src/board.ts`, `src/http.ts`, and `src/math.ts`.

Please add:

1. `fetchWithRetry` in `src/http.ts`. Retry failed HTTP fetches three times total. Default timeout is **2000ms**. Retry on network errors and HTTP 5xx. Do not retry 4xx. Keep `fetchJson`.
2. Host can save the current board view as a JPEG from `src/saveImage.ts`. Reuse `abs()` from `src/math.ts` if you clamp quality.
3. Guests must not change the model in **tour** or **doctor** mode. Paint mode is allowed. Host can always change the model.
4. Keep the change in these modules. Do not add packages. Do not add auth or a dashboard.
