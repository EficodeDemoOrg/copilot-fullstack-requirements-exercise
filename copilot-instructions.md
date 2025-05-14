# GitHub Copilot Workshop Guide

## 1. Introduction (Approx. 5 minutes)

This guide outlines how to use GitHub Copilot effectively for the "Gene Weaver - Dazzling DNA Destiny!" project (or a similar model-based educational application project). The aim is to use Copilot for planning, documentation-driven development, and implementation within a timed workshop (e.g., 2 hours). The focus is on structured collaboration with AI.

## 2. Phase 1: Ideation & Planning with Copilot (Approx. 30-40 minutes)

This phase is crucial for setting a clear direction. Effective planning and documentation here will significantly streamline the implementation phase with Copilot.

### 2.1. Review Project Requirements
Refer to the main project description document (e.g., `README.md`) for the "Gene Weaver - Dazzling DNA Destiny!" to understand the project's goals and business requirements. Ensure every team member has a clear grasp of the MVP.

### 2.2. Planning Approach with Copilot
Use Copilot Chat for this phase to brainstorm and refine your project's direction.
* **Option A (AI-Led Brainstorming):** If your team is unsure where to start.
    * **Example Prompt (Copilot Chat):**
        ```
        Review the main project description document (e.g., `README.md`) for the 'Gene Weaver - Dazzling DNA Destiny!' project. This project involves implementing a genetic inheritance model and visualizing results for an educational app.
        1. Propose 2 distinct application architectures (e.g., a frontend-only web application, a web application with a simple backend, a standalone desktop application).
        2. For each architecture, suggest suitable primary programming languages and relevant key frameworks/libraries, focusing on UI development, logic implementation, and engaging visualizations.
        3. Outline main components for each (e.g., UI for parent input, genetics calculation engine, offspring visualization display).
        Focus on an MVP achievable in 2 hours that prioritizes the core genetic model and visualization.
        ```
* **Option B (Participant-Led, AI-Refined):** If your team has initial ideas.
    * **Example Prompt (Copilot Chat):**
        ```
        For the 'Gene Weaver - Dazzling DNA Destiny!' project (described in the main project `README.md`), we plan a [describe your architecture, e.g., 'React frontend application with internal logic to calculate genetic crosses and display results using SVG or a simple graphics library'].
        1. Is this MVP feasible in 2 hours?
        2. Suggest key libraries/modules for our chosen stack that would be good for UI (parent trait selection), implementing the Punnett Square logic, and creating clear, child-friendly visualizations of offspring?
        3. Outline the main functional React components or JavaScript modules we'd need to create.
        ```

### 2.3. Define Architecture & Tech Stack
Based on the brainstorming, your team should decide on:
* The high-level architecture (e.g., Web App: React/Vue/Svelte, Desktop App: Python with Tkinter/PyQt/CustomTkinter).
* The primary programming language(s) and key frameworks/libraries for UI and visualization.
Documenting these choices is the next step.

### 2.4. Create Project Specification Documentation
Clear specifications are vital for guiding both your team and Copilot. These documents should be created collaboratively and iteratively.

**Workflow for Creating Specification Documents:**
It's recommended to create these specification files (`ARCHITECTURE.md`, `BACKLOG.md`, `PROJECT_SPEC.md`) individually.
1.  Discuss the content for each section/file as a team.
2.  Use Copilot Chat, particularly with **Copilot Edits** (e.g., using `#file` or `#selection` in Copilot Chat to target specific files/parts of files), to help draft, update, and refine each document.
3.  Manually create the `docs/specifications/` folder and the empty markdown files first. This makes it easier for Copilot Edits to target them.

**Key Specification Files:**

* **1. Architecture Diagram (`docs/specifications/ARCHITECTURE.md`):**
    * **Purpose:** Visually represent your chosen application architecture.
    * **Content:** Use text-based diagramming tools like Mermaid JS, PlantUML, or even a clear textual outline of components and their interactions.
    * **Example Prompt (Copilot Chat with Edits for `ARCHITECTURE.md`):**
        ```
        #file docs/specifications/ARCHITECTURE.md
        Based on our decision to build a [e.g., 'frontend-only web application using JavaScript for the Gene Weaver project'], help me draft a Mermaid JS component diagram illustrating the main components (e.g., ParentInputUI, GeneticsEngine, OffspringDisplay) and how they interact.
        ```

* **2. Feature Backlog (`docs/specifications/BACKLOG.md`):**
    * **Purpose:** List the features required for the MVP, broken down into manageable tasks.
    * **Content:** A list of features/user stories. Prioritize for the MVP.
    * **Example Prompt (Copilot Chat with Edits for `BACKLOG.md`):**
        ```
        #file docs/specifications/BACKLOG.md
        Based on the 'Gene Weaver - Dazzling DNA Destiny!' MVP requirements, help me create a feature backlog. Key MVP tasks include:
        - UI component for selecting Parent 1 genotype (BB, Bb, bb).
        - UI component for selecting Parent 2 genotype (BB, Bb, bb).
        - Core logic module to calculate offspring genotype probabilities (Punnett Square).
        - Logic to map offspring genotypes to phenotypes based on simple dominance (B=Black, b=white).
        - UI component to display offspring genotype probabilities (e.g., 25% BB, 50% Bb, 25% bb).
        - UI component to visually display offspring phenotype probabilities (e.g., 75% Black, 25% White, using colors/icons).
        - Ensure results update interactively when parent inputs change.
        Break these down into clear backlog items.
        ```

* **3. Main Project Specification (`docs/specifications/PROJECT_SPEC.md`):**
    * **Purpose:** A central document summarizing key decisions and linking to other detailed specifications.
    * **Location:** `docs/specifications/PROJECT_SPEC.md`
    * **Content Outline:**
        * Project Goal (briefly, from the main `README.md` for Gene Weaver)
        * Reference to Architecture Diagram: "See `docs/specifications/ARCHITECTURE.md`"
        * Reference to Feature Backlog: "See `docs/specifications/BACKLOG.md`"
        * Chosen Technology Stack (specific languages, libraries, frameworks, e.g., JavaScript, React, CSS for styling)
        * Key Modules/Components & Their Primary Responsibilities (high-level textual description, e.g., `ParentSelector.js`, `GeneticsEngine.js`, `ResultsDisplay.js`)
    * **Example Prompt (Copilot Chat with Edits for `PROJECT_SPEC.md`, after drafting ARCHITECTURE and BACKLOG):**
        ```
        #file docs/specifications/PROJECT_SPEC.md
        Help me create the main project specification for 'Gene Weaver'.
        It should include:
        - Project Goal (summary for Gene Weaver, emphasizing educational visualization).
        - A reference to `docs/specifications/ARCHITECTURE.md` for the architecture diagram.
        - A reference to `docs/specifications/BACKLOG.md` for the feature backlog.
        - Our chosen Technology Stack: [e.g., JavaScript with React for UI, basic CSS for styling, all logic client-side].
        - A brief outline of Key Modules/Components: [e.g., ParentInputForm, GeneticsCalculator, OffspringVisualizer].
        ```

---

## 3. Phase 2: Setup for Copilot-Driven Implementation (Approx. 15 minutes)

With a plan in place, configure your environment to maximize Copilot's effectiveness.

### 3.1. Version Control with Git
Initialize Git and commit frequently: `git init`, `git add .`, `git commit -m "Initial planning and specification documents created"`. Regular commits are your safety net.

### 3.2. Global Copilot Instructions (`.github/copilot-instructions.md`)
This file provides project-wide, persistent context to Copilot in VS Code, guiding its behavior across all interactions.
* **Location:** `.github/copilot-instructions.md`
* **Example Content:**
    ```markdown
    ## Project: Gene Weaver - Dazzling DNA Destiny!

    **Overall Goal:** Build an interactive educational application to visualize basic genetic inheritance (Mendelian genetics) for schoolchildren, focusing on clear and engaging visuals.
    **Core Requirements Document:** Refer to the main project description `README.md` for "Gene Weaver".
    **MVP Technical Specification:** Detailed in `docs/specifications/PROJECT_SPEC.md`.

    **Key Genetic Model Context (for quick reference by inline chat/edit modes):**
    * **Focus:** MVP implements single-gene inheritance with two alleles and simple dominance.
    * **Example Alleles:** 'B' (dominant, e.g., Black fur) and 'b' (recessive, e.g., white fur).
    * **Parental Input:** Users will provide genotypes for two parents (e.g., Parent 1: 'Bb', Parent 2: 'bb').
    * **Core Logic:** Calculate offspring genotype probabilities (e.g., BB, Bb, bb percentages) using Punnett Square principles.
    * **Output:** Display both offspring genotype probabilities and the resulting phenotype probabilities (e.g., Black fur, white fur percentages). Visualization is key.
    * **Phenotype Mapping Example:** BB -> Black, Bb -> Black, bb -> white.

    ## Role: AI Pair Programmer

    You are assisting developers in a 2-hour workshop to build an MVP (Minimum Viable Product) for the "Gene Weaver" project, based *only* on the provided project documents and explicit instructions.

    ## General Instructions for All Interactions:

    1.  **Scope Adherence:** Implement *only* features or code explicitly requested in the current prompt OR detailed in referenced specification documents (`README.md`, `docs/specifications/PROJECT_SPEC.md`, or specific task files in `docs/tasks/`). Do NOT add extra features or deviate without instruction.
    2.  **Clarify Ambiguity:** If a request is unclear, or if you believe a significantly better MVP-aligned alternative exists, briefly state your reasoning and ask for confirmation before proceeding.
    3.  **Clarity & Simplicity First:** Generate code that is readable, well-commented (for complex logic), and suitable for a timed workshop. Focus on core functionality and clear visualization.
    4.  **Documentation is Truth:** Prioritize instructions and specifications from `README.md` and files in the `docs/` directory.
    5.  **Tech Stack Adherence:** The team's chosen technology stack is defined in `docs/specifications/PROJECT_SPEC.md`. Adhere to these choices.
    6.  **Error Handling (Basic):** For user inputs (like genotype strings), include simple validation if specified in a task. For internal logic, ensure calculations are robust for valid inputs.
    7.  **No External Data/APIs for MVP:** This project's core logic is model-based. No external data fetching is required for the MVP.
    ```

### 3.3. Guiding Documents for Copilot Agent Mode & Complex Tasks

For effective use of Copilot Agent mode or for guiding complex implementations in Chat, you'll use two types of documents:

1.  **A Generic Agent Workflow (`docs/instructions/agent_workflow.md`):**
    This file defines the *standard operational procedure* for Copilot Agent when it's asked to implement any task. You'll create this once. It tells Copilot *how* to approach its work generally. (The content for this file can be the same as in the "Finnish Happiness" project guide, just ensure project name references inside it are generic or updated if needed).

    *(For brevity, the content of `agent_workflow.md` is not repeated here but should be identical to the example provided in the Finnish Happiness Factor Finder guide, with any project-specific mentions made generic, e.g., the simulated Git commit message).*

2.  **Specific Task Documents (e.g., `docs/tasks/TASK_NAME.md`):**
    For each significant feature from your `BACKLOG.md`, create a small markdown file. This file details the *specific requirements* for that task (what to build, which modules, specific functions, etc.) and will instruct Copilot to follow the generic workflow. The "Assigned Role" in the example below is illustrative and should be adapted per task.

**Example 1: Generic Agent Workflow File**
* **Location:** `docs/instructions/agent_workflow.md`
* **Content:** (Assume the generic content as previously defined, ensuring project name in simulated commit is generic like "feat: Implement [task description]")
    ```markdown
    ## Agent Mode - General Implementation Workflow

    This document outlines the standard operational procedure for GitHub Copilot Agent when tasked with implementing features or modules for this project.

    1.  **Understand Task & Context:**
        * Review the specific task requirements provided in the prompt or referenced task document (e.g., from `docs/tasks/`).
        * Refer to `docs/specifications/PROJECT_SPEC.md` for overall project architecture, technology stack, and MVP goals.
        * Refer to `.github/copilot-instructions.md` for global project conventions.
    2.  **Assessment & Planning:**
        * Before writing new code, briefly assess if any existing code in the target module(s) can be reused, needs refactoring to accommodate the new task, or might conflict.
        * Note any dependencies on other modules or unfulfilled prerequisites for the current task.
    3.  **Adherence to Specifications:**
        * Implement *only* the features, functions, and logic described in the specific task document and `docs/specifications/PROJECT_SPEC.md`.
    4.  **Deviation Protocol:**
        * If you believe a deviation from the specified requirements, outlined steps, or chosen technologies (as per `PROJECT_SPEC.md`) is strongly necessary or highly beneficial for achieving the task's goal:
            * Clearly state your proposed deviation.
            * Provide a concise justification (e.g., improves performance, simplifies code significantly, necessary for compatibility).
            * **Explicitly ask for permission/confirmation before implementing the deviation.** Await a "Proceed with deviation" or similar response. If no permission is given, adhere to the original specification.
    5.  **Code Implementation:**
        * Write clear, concise, and well-commented code (especially for non-obvious logic) according to the specific task requirements.
        * Follow language-specific best practices and any style guides mentioned in `PROJECT_SPEC.md` or `.github/copilot-instructions.md`.
    6.  **Post-Implementation Quality Checks (Simulated for Workshop):**
        * **(Linting):** Assume generated code is checked with a standard linter/formatter for the language. Aim to produce code that would pass.
        * **(Testing):** Assume relevant unit tests (if pre-defined or generated as part of the task) are executed. Aim to produce code that would pass these tests.
        * **(Fixes):** If (simulated) linting errors or test failures are implied or identified, attempt to fix the generated code.
    7.  **Output:**
        * Provide the complete code for the specified module(s) or the functions/classes implemented as per the task.
        * If changes were made to existing files (beyond adding new code), clearly indicate these changes.
    8.  **Git Commit (Simulated for Workshop):**
        * After successful implementation and (simulated) checks, a Git commit would typically be made.
        * The commit message should be concise, imperative, and accurately describe the change (e.g., "feat: Implement genetic calculation logic"). Maximum 160 characters. Indicate this simulated commit message in your response.
    ```

**Example 2: Specific Task Document for Gene Weaver**
* **Location (example):** `docs/tasks/IMPLEMENT_GENETICS_ENGINE.md`
* **Content:**
    ```markdown
    ## Task: Implement Core Genetics Engine

    **Workflow Reference:** When implementing this task, adhere to the general procedure outlined in `docs/instructions/agent_workflow.md`.

    **Project Specification Reference:** `docs/specifications/PROJECT_SPEC.md`
    **Target Module(s):** `src/genetics_engine.js` (or `.py`, etc., depending on chosen stack - create if absent)
    **Assigned Role:** Developer specializing in application logic and algorithms.
    **Goal:** Create a module that takes two parent genotypes and calculates the probabilities of their offspring's genotypes and corresponding phenotypes based on a single-gene, two-allele, simple dominance model.

    ---
    **Specific Requirements & Acceptance Criteria for this Task:**

    1.  Ensure the target module (e.g., `src/genetics_engine.js`) is created if it doesn't exist.
    2.  **Input Validation (Optional but Recommended):** Consider a helper function to validate parent genotype inputs (e.g., ensuring they are valid strings like "BB", "Bb", "bb").
    3.  **Function `calculateOffspringGenotypes(parent1Genotype, parent2Genotype)`:**
        * **Action:** Takes two strings representing parent genotypes (e.g., "Bb", "bb").
        * Implements Punnett Square logic for a single gene with two alleles. Assume 'B' is dominant and 'b' is recessive for the MVP model.
        * **Return:** An object or dictionary with offspring genotype probabilities. Example: `{ "BB": 0.25, "Bb": 0.50, "bb": 0.25 }`.
    4.  **Function `getPhenotypes(offspringGenotypeProbabilities)`:**
        * **Action:** Takes the object/dictionary of offspring genotype probabilities.
        * Maps these to phenotype probabilities based on the simple dominance model (BB -> Black, Bb -> Black, bb -> white, as defined in the main project `README.md`).
        * **Return:** An object or dictionary with offspring phenotype probabilities. Example: `{ "Black Fur": 0.75, "White Fur": 0.25 }`.
    5.  **Allele Configuration (Consider):** The alleles (e.g., 'B', 'b') and their dominance/phenotype mapping should be clearly defined, perhaps as constants or a configuration within the module, making them easy to find and understand (as per `README.md`).
    6.  **Scope:** This module contains *only* the core genetic calculation logic. It should not handle UI input or direct visualization rendering.
    ```

## 4. Phase 3: Iterative Implementation with Copilot (Approx. 45-55 minutes)

Now, translate your plans and specifications into code with Copilot's assistance.

### 4.1. Implement Bare Bones
Use Copilot Chat to kick off implementation, referencing your documentation. For more automated execution, especially if using Copilot Agent mode (e.g., commands like `/new` in Copilot Chat if they invoke agent-like behaviors, or other dedicated Agent features), clearly separating the task specification from the general workflow is key.

Your prompt should clearly state which document contains the *task details* and which contains the *general implementation process*.

* **Example Prompt (Copilot Chat, guiding Copilot Agent mode or a comprehensive chat interaction):**
    ```
    @workspace
    I need you to implement the core genetics engine for our 'Gene Weaver' project.

    The detailed requirements for what to build (module, functions, specific logic) are located in:
    #file:docs/tasks/IMPLEMENT_GENETICS_ENGINE.md

    The general instructions on how you should approach the implementation (assessment, deviation protocol, quality checks, commit simulation, etc.) are defined in:
    #docs/instructions/agent_workflow.md

    Please proceed with implementing the full task as described in #file:docs/tasks/IMPLEMENT_GENETICS_ENGINE.md, ensuring you strictly follow the general workflow outlined in #filedocs/instructions/agent_workflow.md.
    Start by ensuring the target module file exists or is created, then implement the functions as specified.
    ```
   **Note for step-by-step in Chat:** If you prefer a more conversational, step-by-step approach within Copilot Chat (rather than asking for the whole task at once), you can still refer to both documents. For example:
    ```
    @workspace
    Let's start implementing the `calculateOffspringGenotypes` function from #file:docs/tasks/IMPLEMENT_GENETICS_ENGINE.md. Remember to follow the general process defined in #file:docs/instructions/agent_workflow.md.
    ```

### 4.2. Work Through Backlog
Address items from your `docs/specifications/BACKLOG.md`. For each significant item:
1.  Create a new specific task document in `docs/tasks/` (e.g., `IMPLEMENT_PARENT_INPUT_UI.md`).
2.  In this task document, reference the `docs/instructions/agent_workflow.md`.
3.  Detail the specific requirements, inputs, outputs, and acceptance criteria for that task.
4.  Use Copilot Chat (with `@workspace` and by referencing your task document) or Copilot Agent mode to implement the task.

### 4.3. Code Testing
Verify Copilot's output and your own code.
* **TDD (Test-Driven Development) Approach:** Consider writing a basic test outline *before* asking Copilot to generate the function code.
* **Tests After Implementation:** At minimum, write tests after code generation to confirm functionality.
* **Example Prompt (Copilot Chat for writing tests):**
    ```
    @workspace
    For the function `calculateOffspringGenotypes(parent1Genotype, parent2Genotype)` in our genetics engine module (e.g., `src/genetics_engine.js`), help me write unit tests (e.g., using Jest or a similar testing framework suitable for our stack). The tests should check for various parent combinations like:
    1. Parent1="BB", Parent2="bb" (Expected: 100% Bb genotypes)
    2. Parent1="Bb", Parent2="Bb" (Expected: 25% BB, 50% Bb, 25% bb genotypes)
    3. Parent1="bb", Parent2="bb" (Expected: 100% bb genotypes)
    Ensure tests cover the structure of the returned probability object.
    ```

### 4.4. Review, Refactor, Commit Loop
* **Review:** Always critically review code generated by Copilot. Does it meet requirements? Is it efficient? Is it secure?
* **Refactor:** Don't hesitate to refactor the code for clarity, performance, or better organization. You can ask Copilot for refactoring suggestions.
* **Commit:** Commit working changes to Git frequently with clear messages.

## 5. Phase 4: Wrap-up & Presentation Prep (Approx. 15 minutes)

* Finalize the MVP features as per your `BACKLOG.md`.
* Ensure the application runs and is interactive.
* Prepare a brief demonstration of your application and your development process with Copilot, focusing on the visualization.

## 6. Key Takeaways: AI Collaboration Workflow (Approx. 5 minutes)

* **Clarity is King:** Effective AI collaboration relies on clear, unambiguous, and well-structured documented specifications and workflows.
* **Documentation as a Tool:** Use documents like `PROJECT_SPEC.md`, `agent_workflow.md`, and specific task files not just for human understanding, but as direct input and guidance for AI.
* **Iterative Refinement:** Your first prompt or Copilot's first output might not be perfect. Iterate on your instructions and the code.
* **Developer in Control:** You are the lead developer. Review, understand, test, and own all code, whether written by you or with AI assistance.
* **Strategic Prompting:** Global instructions (`.github/copilot-instructions.md`) and well-crafted task-specific prompts significantly improve Copilot's output quality and relevance.