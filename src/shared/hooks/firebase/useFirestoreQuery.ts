/**
 * @file useFirestoreQuery.ts
 * @description Hook genérico Type-Safe para Firestore con validación Zod y tiempo real.
 * @module shared/hooks/firebase
 */

import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  QueryConstraint,
  DocumentData,
  Firestore,
  FirestoreError,
} from "firebase/firestore";
import { z } from "zod";

interface UseFirestoreQueryOptions<T> {
  db: Firestore;
  collectionName: string;
  constraints?: QueryConstraint[];
  schema?: z.ZodSchema<T>;
}

interface UseFirestoreQueryResult<T> {
  data: T[];
  loading: boolean;
  error: FirestoreError | Error | null;
}

/**
 * Custom Hook type-safe para Firestore con suscripción en tiempo real y validación runtime opcional via Zod.
 */
export function useFirestoreQuery<T = DocumentData>({
  db,
  collectionName,
  constraints = [],
  schema,
}: UseFirestoreQueryOptions<T>): UseFirestoreQueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  const constraintString = JSON.stringify(constraints);

  useEffect(() => {
    setLoading(true);
    const ref = collection(db, collectionName);
    const q = query(ref, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const parsedData = snapshot.docs.map((doc) => {
            const rawData = { id: doc.id, ...doc.data() };
            if (schema) {
              return schema.parse(rawData);
            }
            return rawData as T;
          });
          setData(parsedData);
          setError(null);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, db, schema, constraintString]);

  return { data, loading, error };
}

export default useFirestoreQuery;
