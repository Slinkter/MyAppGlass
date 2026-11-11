import { describe, it, expect } from "vitest";
import { createLookupMap, createGroupMap } from "@/shared/utils/algorithm-utils";

describe("algorithm-utils", () => {
  const sampleItems = [
    { id: "v-nova", name: "Sistema Nova", category: "ventana", year: 2024 },
    { id: "m-temp", name: "Mampara Templada", category: "mampara", year: 2024 },
    { id: "d-alum", name: "Ducha Corrediza", category: "ducha", year: 2023 },
  ];

  describe("createLookupMap - O(1) lookup", () => {
    it("debe crear un Map y recuperar elementos por clave instantáneamente en O(1)", () => {
      const map = createLookupMap(sampleItems, (item) => item.id);
      expect(map.get("v-nova")?.name).toBe("Sistema Nova");
      expect(map.get("m-temp")?.category).toBe("mampara");
      expect(map.get("inexistente")).toBeUndefined();
    });
  });

  describe("createGroupMap - O(1) category/group access", () => {
    it("debe agrupar elementos en O(n) permitiendo acceder a los grupos en O(1)", () => {
      const yearMap = createGroupMap(sampleItems, (item) => item.year);
      expect(yearMap.get(2024)?.length).toBe(2);
      expect(yearMap.get(2023)?.length).toBe(1);
      expect(yearMap.get(2022)).toBeUndefined();
    });
  });
});
