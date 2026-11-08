import { describe, it, expect } from "vitest";
import { projects } from "../data/projects.js";

describe("Projects Data Integrity", () => {
  it("should have at least 2 showcase projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(2);
  });

  it("should have valid ids and names for each project", () => {
    projects.forEach((project) => {
      expect(project.id).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.path).toBeDefined();
      expect(project.status).toBeDefined();
    });
  });

  it("should contain next-station and zaroorat projects", () => {
    const ids = projects.map((p) => p.id);
    expect(ids).toContain("next-station");
    expect(ids).toContain("zaroorat");
  });
});

