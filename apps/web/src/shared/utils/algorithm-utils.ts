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

/**
 * Búsqueda binaria O(log2 n) sobre un array ordenado por clave ascendente.
 * Retorna el elemento o null si no existe.
 */
export function binarySearchBy<T, K extends string | number>(
  sortedArray: readonly T[],
  target: K,
  keySelector: (item: T) => K
): T | null {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    const midVal = keySelector(sortedArray[mid]);

    if (midVal === target) {
      return sortedArray[mid];
    }
    if (midVal < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return null;
}
