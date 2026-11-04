import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { routes } from "@/router";

describe("App routing", () => {
  it.each(["/", "/app", "/sign-in", "/sign-up"])("matches a page for %s", (path) => {
    const matches = matchRoutes(routes, path);

    expect(matches?.at(-1)?.route.path).toBe(path);
  });

  it("falls back to not found for unknown paths", () => {
    const matches = matchRoutes(routes, "/nope");

    expect(matches?.at(-1)?.route.path).toBe("*");
  });
});
