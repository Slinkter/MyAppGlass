/**
 * @file algorithm-utils.ts
 * @description Utilidades de alta eficiencia algorítmica para transformar
 * colecciones secuenciales O(n) a HashMaps O(1) y búsqueda binaria O(log n).
 */

/**
 * Convierte un array en un Map indexado por una propiedad única en O(n)
 * permitiendo búsquedas subsiguientes instantáneas en O(1).
 */
export function createLookupMap<T, K extends string | number>(
  items: readonly T[],
  keySelector: (item: T) => K
): Map<K, T> {
  const map = new Map<K, T>();
  for (let i = 0; i < items.length; i++) {
    map.set(keySelector(items[i]), items[i]);
  }
  return map;
}

/**
 * Agrupa elementos en un Map<K, T[]> en una sola pasada O(n)
 * permitiendo consultas de categorías, años o tags en O(1).
 */
export function createGroupMap<T, K extends string | number>(
  items: readonly T[],
  keySelector: (item: T) => K
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (let i = 0; i < items.length; i++) {
    const key = keySelector(items[i]);
    const group = map.get(key);
    if (group) {
      group.push(items[i]);
    } else {
      map.set(key, [items[i]]);
    }
  }
  return map;
}
