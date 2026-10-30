"use client";

import React from "react";
import { Field } from "@/components/ui/field";
import type { Service } from "@/shared/api/firebase/types";

interface ProjectServiceSelectProps {
  value: string;
  onChange: (serviceId: string) => void;
  servicesList: Service[];
}

export const ProjectServiceSelect: React.FC<ProjectServiceSelectProps> = ({ value, onChange, servicesList }) => (
  <Field label="Servicio Principal" required>
    <select
      style={{
        width: "100%",
        height: "40px",
        paddingLeft: "12px",
        paddingRight: "12px",
        borderRadius: "6px",
        border: "1px solid var(--chakra-colors-border-default, var(--chakra-colors-border-slate))",
        backgroundColor: "var(--chakra-colors-surface-card, transparent)",
        color: "inherit",
        fontSize: "14px",
      }}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      required
    >
      {servicesList.length > 0 ? (
        servicesList.map((s) => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))
      ) : (
        <>
          <option value="ventanas">Ventanas de Aluminio</option>
          <option value="mamparas">Mamparas</option>
          <option value="duchas">Boxes de Ducha</option>
          <option value="parapeto">Parapetos de Vidrio</option>
          <option value="general">Carpintería General</option>
        </>
      )}
    </select>
  </Field>
);
