# Guía Práctica: Spec-Driven Development (SDD) con Agentes de IA

> *"Tú eres el arquitecto. El agente es el constructor masivo de código."*

Esta guía está pensada para aplicarse en **cualquier proyecto**, con **cualquier agente de IA** (Claude Code, Cursor, Codex, Copilot, etc.). Todo el proceso vive en archivos Markdown universales, por lo que es completamente portable.

## Índice

- [1. La mentalidad: Arquitecto vs Constructor](#1-la-mentalidad-arquitecto-vs-constructor)
- [2. Estructura de carpetas](#2-estructura-de-carpetas)
- [3. Fase 1: Fundamentación del Proyecto (La Constitución)](#3-fase-1-fundamentación-del-proyecto-la-constitución)
- [4. Fase 2: Ciclo por Funcionalidad (Planificar → Aprobar → Implementar → Validar)](#4-fase-2-ciclo-por-funcionalidad-planificar--aprobar--implementar--validar)
- [5. Fase 3: Replanificación y Consolidación](#5-fase-3-replanificación-y-consolidación)
- [6. Prompts listos para copiar y pegar](#6-prompts-listos-para-copiar-y-pegar)
- [7. Checklist práctico día a día](#7-checklist-práctico-día-a-día)
- [8. Reglas de Oro](#8-reglas-de-oro)
- [9. ¿Por qué merece la pena?](#9-por-qué-merece-la-pena)

## 1. La mentalidad: Arquitecto vs Constructor

La gran diferencia entre *vibe coding* y *Spec-Driven Development* es simple:

- **Tú (Arquitecto):** Defines el *QUÉ*, el *POR QUÉ*, las reglas y apruebas el *CÓMO*.
- **El agente (Constructor):** Traduce ese plan a código, lo escribe, lo modifica y lo ejecuta siguiendo estrictamente lo que tú aprobaste.

**El punto de control más importante es la revisión y aprobación del plan ANTES de escribir código.**

## 2. Estructura de carpetas

Todo debe vivir dentro de tu proyecto. Usa esta estructura desde el inicio:

```text
tu-proyecto/
├── specs/
│   ├── mission.md        # Constitución (ÚNICO)
│   ├── tech-stack.md     # Constitución (ÚNICO)
│   ├── roadmap.md        # Constitución (ÚNICO)
│   └── YYYY-MM-DD-nombre-feature/  # Un paquete por feature/fase
│       ├── requirements.md
│       ├── plan.md
│       └── validation.md
├── CHANGELOG.md         # Se genera/actualiza al cerrar features (opcional pero recomendado)
└── (resto de tu código)
```

## 3. Fase 1: Fundamentación del Proyecto (La Constitución)

**Esto se hace UNA SOLA VEZ por proyecto.** No escribas una sola línea de código hasta tener estos 3 archivos completos, revisados y aprobados.

Si es un proyecto **heredado/existente**, pídele al agente que haga ingeniería inversa leyendo `README.md`, `package.json`, estructura de carpetas, etc. y te genere un borrador para corregir.

| Archivo | Propósito | ¿Qué debes escribir? |
| --- | --- | --- |
| **`mission.md`** | Propósito del proyecto | ¿Para qué existe? ¿A quién resuelve un problema? ¿Quiénes son los stakeholders? ¿Qué se considera éxito? |
| **`tech-stack.md`** | Reglas técnicas globales | Lenguaje, framework, librerías permitidas/prohibidas, testing, estilos, convenciones de código, estructura de carpetas, naming, etc. **Sé lo más restrictivo posible.** |
| **`roadmap.md`** | Hoja de ruta ordenada | Lista de features/módulos ordenados por prioridad. Usa `[ ]` para pendientes y `[x]` para completados. **Cada ítem debe ser lo suficientemente pequeño para completarse en un solo ciclo.** |

> **Importante:** La Constitución es global. Aplica a TODO el proyecto. Solo se modifica en casos muy puntuales (replanificación justificada).

## 4. Fase 2: Ciclo por Funcionalidad (Planificar → Aprobar → Implementar → Validar)

Este ciclo se repite **feature por feature**, siempre tomando el primer ítem sin marcar `[ ]` de `roadmap.md`.

### ¿Qué es un "spec por feature"?

Por **cada funcionalidad/módulo/fase** del roadmap se crea **UN ÚNICO PAQUETE** con 3 archivos dentro de `specs/YYYY-MM-DD-nombre-feature/`:

| Archivo | Enfoque | Contenido |
| --- | --- | --- |
| **`requirements.md`** | **QUÉ** | Reglas de negocio, alcance, **fuera de alcance**, criterios de aceptación, datos/campos involucrados. |
| **`plan.md`** | **CÓMO** | Traducción técnica accionable. Lista de archivos a crear/modificar, componentes, rutas, validaciones, orden de ejecución, dependencias. Dividido en **grupos de tareas numerados** e implementables de forma independiente. |
| **`validation.md`** | **CUÁNDO ESTÁ HECHO** | Comprobaciones automatizadas (`typecheck`, tests), validación manual, chequeo de tono/copy (si aplica), casos borde y **Definition of Done**. |

### Pasos del ciclo

| Paso | Acción | Notas |
| --- | --- | --- |
| **1. Elegir feature** | Leer `specs/roadmap.md` y tomar el **primer ítem sin marcar `[ ]`**. | Usa el roadmap como **fuente de verdad**. Mejor indicarle esto explícitamente al agente. |
| **2. Crear rama aislada** | `git checkout -b feature/nombre-kebab-case` o `phase-N-nombre` | Mantén el trabajo aislado del resto. |
| **3. Entrevista obligatoria (ANTES de escribir)** | El agente debe usar `AskUserQuestion` con **exactamente 3 preguntas agrupadas**: **Scope**, **Decisions** y **Context**. | **NO escribir ningún archivo hasta recibir las respuestas.** Esto define `requirements.md`. |
| **4. Generar el paquete de specs** | Con las respuestas + `mission.md` + `tech-stack.md`, crear `requirements.md`, `plan.md` y `validation.md`. | Tras tener `requirements.md` claro, **normalmente NO te volverá a hacer esas 3 preguntas para generar `plan.md`**. El plan lo genera por cuenta propia basándose en los requisitos. |
| **5. REVISIÓN Y APROBACIÓN HUMANA (CRÍTICO)** | **Lee TODO `plan.md` línea por línea.** ¿Respeta `tech-stack.md`? ¿Va acorde a `mission.md`? ¿Se sale del alcance? ¿Hay tareas redundantes o innecesarias? Corrige o pide ajustes. | **NO avances hasta estar 100% conforme.** Aquí te conviertes en arquitecto. |
| **6. Implementación** | Solo tras aprobación explícita: *"Apruebo este plan. Implementa ÚNICAMENTE lo aquí descrito."* | Que ejecute **grupo por grupo**. No dejar que "implente todo de golpe" sin seguir el orden. |
| **7. Validación** | Ejecutar todo lo indicado en `validation.md`. Debe cumplir **TODOS** los criterios de aceptación de `requirements.md`. | Si falla algo, corregirlo **sin desviarse del plan aprobado**. |

> **Truco:** Durante la revisión puedes seguir dialogando con el agente para aclararte dudas. Eso NO es la misma entrevista obligatoria de las 3 preguntas, es simplemente un intercambio entre arquitecto y constructor.

## 5. Fase 3: Replanificación y Consolidación

Una vez todo validado, integrado y listo para pasar a la siguiente feature.

| Paso | Acción | Recomendación |
|---|---|---|
| **1. Marcar como completado** | Editar `specs/roadmap.md` marcando ese ítem como `[x]`. | Sincroniza la hoja de ruta. |
| **2. Actualizar changelog** | Generar/actualizar `CHANGELOG.md` con los commits de esta rama/feature. | Puedes hacerlo con el agente basándose en `git log`. |
| **3. Integrar a main** | `git add .` → `git commit -m "..."` → `git checkout main` → `git merge <rama-feature>` → `git branch -d <rama-feature>` | Mantén `main` siempre en estado funcional. |
| **4. Limpiar contexto** | **Abrir un nuevo chat/sesión con el agente.** | Con todo guardado en `specs/*.md`, no pierdes nada. Esto evita la deriva de contexto y es una de las mejores prácticas de SDD con agentes. |
| **5. Siguiente ciclo** | Volver a **Fase 2** con el siguiente ítem `[ ]` de `roadmap.md`. | Repetir hasta completar el roadmap (o el MVP). |

## 6. Prompts listos para copiar y pegar

Cámbialos por lo que corresponda a tu proyecto/agente. Son agnósticos.

### A) Crear la Constitución (Fase 1 - Una sola vez)

```text
Actúa como arquitecto de software.

Tengo este proyecto: [DESCRIPCIÓN BREVE DEL PROYECTO + OBJETIVO]

Necesito crear la constitución del proyecto en la carpeta specs/ con:
- mission.md
- tech-stack.md
- roadmap.md

Básate en: [README.md / TODO.md / ARCHIVO ADJUNTO / DESCRIPCIÓN]

Entrevístame ÚNICAMENTE con estas 3 preguntas, separadas y claras:
1. MISIÓN Y PÚBLICO OBJETIVO: ¿Cuál es la misión? ¿A quién va dirigido? ¿Qué problema resuelve?
2. STACK TECNOLÓGICO Y RESTRICCIONES: ¿Qué tecnologías DEBEMOS usar obligatoriamente? ¿Qué tecnologías/NUNCA debemos usar? ¿Hay convenciones a seguir?
3. ROADMAP INICIAL: ¿Qué features/módulos son obligatorios? ¿Cuál es la prioridad? ¿Hay algo que NO queramos hacer?

NO escribas NINGÚN archivo hasta haber recibido mis respuestas.
```

### B) Iniciar nueva feature (Fase 2 - Pasos 1-4)

```text
Busca el PRIMER ítem sin marcar [ ] en specs/roadmap.md. Trabaja ÚNICAMENTE sobre esa fase.

Crea una nueva rama git con un nombre kebab-case coherente con esa feature.

Crea el directorio specs/YYYY-MM-DD-[nombre-kebab-case]/ con estos 3 archivos:
- requirements.md
- plan.md
- validation.md

ANTES de crear cualquier archivo, entrevístame con estas 3 preguntas agrupadas usando AskUserQuestion:
1. SCOPE (Alcance): ¿Qué debe hacer esta feature? ¿Qué campos/comportamientos incluye? ¿Qué NO debe hacer?
2. DECISIONS (Decisiones): ¿Hay decisiones técnicas o de UX que deba tomar ya? (almacenamiento, validación, visibilidad, etc.)
3. CONTEXT (Contexto): ¿Tono/copy, integraciones, limitaciones o cualquier detalle a tener en cuenta?

Guíate SIEMPRE por specs/mission.md y specs/tech-stack.md para mantener total coherencia con la constitución.
```

### C) Revisar el plan como revisor senior (Antes de aprobar)

```text
Actúa como un ingeniero/revisor senior estrictamente objetivo.

Revisa el archivo specs/YYYY-MM-DD-[feature]/plan.md sin implementar nada.

Analízalo desde estos puntos:
- ¿Respeta las reglas de specs/tech-stack.md?
- ¿Es coherente con specs/mission.md?
- ¿Se ajusta al alcance definido en requirements.md o se va por las ramas?
- ¿Hay tareas redundantes, innecesarias o poco claras?
- ¿Faltan archivos a crear/modificar?
- ¿Podría simplificarse sin perder funcionalidad?
- ¿Hay riesgos evidentes?

Dame ÚNICAMENTE feedback accionable, claro y conciso. Sin código aún.
```

### D) Aprobar e implementar (Paso 6-7)

```text
Apruebo este plan.md tal como está.
Implementa ÚNICAMENTE lo que se describe en specs/YYYY-MM-DD-[feature]/plan.md.

Sigue los grupos de tareas EN ORDEN.
No añadas features, mejoras ni refactors fuera de lo explícitamente planificado.
Ve grupo por grupo y mantén el código sincronizado con lo acordado.
Al finalizar, procede a validar siguiendo specs/YYYY-MM-DD-[feature]/validation.md.
```

### E) Validar y cerrar feature (Fase 3)

```text
Esta feature ha pasado todas las validaciones indicadas en validation.md.
Cumple con todos los criterios de aceptación de requirements.md.

Realiza lo siguiente en orden:
1. Marca como [x] la fase correspondiente en specs/roadmap.md
2. Genera o actualiza CHANGELOG.md con los commits realizados en esta feature (usa git log --oneline)
3. Haz un commit con mensaje descriptivo y claro
4. Cámbiate a main, mergea esta rama y elimínala
5. NO toques la constitución a menos que sea estrictamente necesario para cerrar esta fase

Todo debe quedar limpio, en main y listo para el siguiente ciclo.
```

### F) Crear skill reutilizable (Opcional, muy recomendado)

Si te das cuenta que repites el prompt **B** constantemente:

```text
Convierte todo el flujo "Iniciar nueva feature" en un skill persistente llamado "feature-spec".

Debe cumplir EXACTAMENTE esto:
- Leer specs/roadmap.md y tomar el primer ítem sin marcar [ ]
- Crear rama git aislada
- Entrevistar con AskUserQuestion usando ÚNICAMENTE: Scope, Decisions, Context (3 preguntas agrupadas)
- NO escribir nada hasta recibir respuestas
- Crear specs/YYYY-MM-DD-nombre-feature/ con requirements.md, plan.md, validation.md
- Guiarse siempre por specs/mission.md y specs/tech-stack.md
- Seguir las convenciones ya existentes en el proyecto

Guárdalo de forma reutilizable para usarlo en este agente/proyecto.
```

## 7. Checklist práctico día a día

Cópialo y úsalo **por cada feature**. Si lo tienes todo marcado, vas por el camino correcto.

### ANTES de codificar (Fase 1-2)
- [ ] **Constitución lista:** `mission.md`, `tech-stack.md` y `roadmap.md` existen, revisados y actualizados
- [ ] **Siguiente feature clara:** He identificado el primer `[ ]` en `roadmap.md`
- [ ] **Rama aislada:** He creado una rama git para esta feature
- [ ] **Entrevista hecha:** El agente me ha hecho las 3 preguntas (Scope/Decisions/Context) y las he respondido
- [ ] **Specs creados:** Tengo `requirements.md`, `plan.md` y `validation.md` en `specs/YYYY-MM-DD-nombre-feature/`
- [ ] **Plan revisado al detalle:** He leído **TODO** el `plan.md` línea por línea
- [ ] **Aprobación explícita:** He dicho *"Apruebo este plan. Implementa ÚNICAMENTE lo aquí descrito."*

### DURANTE la implementación (Fase 2)
- [ ] **Sin desviarme:** El agente solo ejecuta lo aprobado. Nada extra.
- [ ] **Por grupos:** Implementa grupo por grupo, siguiendo el orden del plan
- [ ] **Sin adivinar:** Si hay ambigüedad, **paro y pregunto**. No dejo que adivine
- [ ] **Specs sincronizados:** Mantengo coherencia entre plan, requisitos, constitución y código

### DESPUÉS de validar (Fase 3)
- [ ] **Validación completa:** Todo lo indicado en `validation.md` está cumplido
- [ ] **Criterios de aceptación:** Se cumplen **todos** los de `requirements.md`
- [ ] **Automatizado en verde:** `npm run typecheck` / `npm run test` (o los comandos del proyecto) pasan sin errores
- [ ] **Roadmap actualizado:** Ítem marcado como `[x]` en `roadmap.md`
- [ ] **Changelog actualizado:** `CHANGELOG.md` generado/actualizado
- [ ] **Integrado:** Commit, merge a `main`, rama eliminada
- [ ] **Contexto limpio:** Nuevo chat/sesión para la siguiente feature
- [ ] **Listo para siguiente ciclo:** Vuelvo a Fase 2 con el siguiente `[ ]`

## 8. Reglas de Oro

1. **Independiente del agente** – Todo vive en archivos Markdown universales. Puedes cambiar de Claude Code a Cursor, Codex o cualquier otro agente sin perder tu proceso.
2. **Revisión antes que ejecución** – **Nunca** dejes al agente implementar sin aprobar el `plan.md` al 100%. Ese es tu filtro más poderoso contra el *vibe coding*.
3. **Tú eres el arquitecto** – El agente es el constructor masivo. Tú diseñas, decides, preguntas, revisas y apruebas. Ese equilibrio es la clave.
4. **Pequeño y entregable** – Cada feature debe caber en un solo ciclo. Si te parece grande, divídelo en fases más pequeñas en el `roadmap.md`.
5. **Constitución sagrada** – `mission.md`, `tech-stack.md` y `roadmap.md` son las reglas del juego. Todo lo demás debe respetarlas.
6. **Especificación > Prompt largo** – Mejor tener 3 archivos claros que un prompt de 10 páginas. Los archivos persisten, los hilos de chat se pierden.
7. **Automatiza lo repetitivo** – Si repites el mismo patrón 2-3 veces, conviértelo en un *skill*. Esto te ahorra tiempo y estandariza tu flujo.

## 9. ¿Por qué merece la pena?

Este enfoque funciona porque **invierte el orden**. En lugar de pedirle al agente *"constrúyeme X y a ver qué sale"*, haces esto:

> **Entrevista → Constitución → Requisitos → Plan → Revisión y Aprobación → Implementación → Validación → Integración**

El resultado es predecible: menos sorpresas, menos deuda técnica, menos deriva de contexto y, sobre todo, **tú mantienes el control total del diseño** mientras delegas la escritura masiva de código al agente.

**Mi recomendación personal:** Empieza con un proyecto pequeño. Aplica este checklist tal cual la primera vez. Verás que, tras 2 features, ya te parecerá natural y nunca volverás a hacer *vibe coding* a lo loco.
