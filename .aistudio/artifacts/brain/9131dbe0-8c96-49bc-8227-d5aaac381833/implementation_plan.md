# AcadeX · Classic Academic Ivy Aesthetic Revamp

Comprehensive design and visual architecture plan to transform **AcadeX** into a distinguished **Classic Academic Ivy** digital campus hub, featuring collegiate navy, warm parchment neutrals, burnished bronze accents, flat panels with solid indicator borders, and balanced typographic hierarchy.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following visual direction has been confirmed based on your design preferences:
> - **Visual Theme**: **Classic Academic Ivy** — Collegiate Navy (`#172554` / `#1E293B`), warm parchment off-white canvas (`#FAF8F5` / `#0F172A`), burnished bronze/amber accents (`#B45309` / `#D97706`), and rich heritage accents (oxblood crimson, forest evergreen, Oxford blue).
> - **Card & Surface Treatment**: **Flat clean panels with solid color-coded indicator borders** (`border-l-4`), crisp hairline boundaries, and zero-pill typographic metadata (clean inline separators `·`).
> - **Timetable & Dashboard Layout**: **Balanced layout** with measured spacing, functional affordance icons, and clear metadata hierarchy without visual overcrowding.

- **Confirmed Decision 1**: Adopt the **Classic Academic Ivy** color system across all 5 app views (Timetable, Dashboard, Academic Vault, Canteen, Campus Events).
- **Confirmed Decision 2**: Replace frosted translucent cards with flat, solid-bordered structural panels and warm neutral backgrounds.
- **Confirmed Decision 3**: Retain the exact 6-period bell schedule (09:05 AM to 04:00 PM with 10m morning break, 50m lunch, and 10m afternoon break) while enhancing period cards with classic academic badges and solid borders.
- **Confirmed Decision 4**: Keep full interactive capability for students to mark assignments and homework as completed with polished ivy-toned checkboxes and strikethrough states.

---

## 1. Overview & Core Concept

- **What It Does**: AcadeX is an academic and campus life organization platform designed for higher education students and faculty. It unites 6-period daily schedules, course materials, assignment completion tracking, campus dining pre-orders, and academic calendar milestones into a unified workspace.
- **Target Audience / Persona**: University students, teaching faculty, and campus staff who value timeless academic prestige, calm focus, and effortless daily organization over trendy glassmorphic noise.
- **Key Value**: Provides an elevated, focused learning environment that feels scholarly, structured, and deliberate, blending traditional university aesthetics with modern responsive utility.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Aesthetic Direction**: **Classic Academic Ivy** — evoking prestigious university libraries, leather-bound syllabi, architectural stone lecture halls, and brass navigational accents.
- **60-30-10 Color System**:
  - **60% Canvas & Neutral Ground**: Light mode uses warm parchment off-white (`#FBF9F6` / `bg-stone-50/70`), Dark mode uses deep midnight navy slate (`#0B1329` / `#0F172A`).
  - **30% Structural Panels & Dividers**: Flat white (`#FFFFFF`) or rich dark navy (`#16203A`) cards with subtle hairline stone borders (`border-stone-200 dark:border-stone-800`), anchored by solid color-coded left borders (`border-l-4`).
  - **10% Heritage Accent Budget**:
    - **Burnished Bronze / Gold** (`#B45309` / `#D97706`): Primary call-to-actions, active navigation highlights, and academic milestones.
    - **Collegiate Navy** (`#1E3A8A` / `#172554`): Brand wordmark, primary headlines, and institutional badges.
    - **Heritage Forest Green** (`#15803D` / `#166534`): Completed homework tasks, attendance presence, and healthy dining.
    - **Oxblood Crimson** (`#991B1B` / `#B91C1C`): Urgent exam countdowns and absence markers.

### Typography & Hierarchy
- **Title & Headlines**: `Alto Display` paired with classical serif titles (`Cinzel` / `Playfair Display`) for editorial authority and elegance.
- **Body & Controls**: `Plus Jakarta Sans` for clean, high-contrast, effortless readability at 14px–16px.
- **Numerical Data & Timings**: `JetBrains Mono` with `tabular-nums` for precise period clocks, room numbers, and grading points.
- **Anti-Slop Zero-Pill Discipline**:
  - Metadata (e.g. `Euler Bldg 108 · Prof. Marcus Chen · Lecture`) rendered as unboxed typography separated by quiet mid-dots (`·`).
  - Strict ban on pill-capsule badge sandwiches on cards.
  - Interactive filter controls styled as crisp segmented stone buttons rather than candy pills.

### Component Styling & Layout
- **Daily 6-Period Timetable Grid**:
  - 6 balanced period cards featuring solid color-coded left borders (Period 1 Navy, Period 2 Forest, Period 3 Bronze, Period 4 Teal, Period 5 Wine, Period 6 Slate).
  - Clear break markers: Morning Break (11:10 AM, warm amber hairline), Lunch Break (12:15 PM, campus dining bronze/forest), Afternoon Break (02:55 PM, calm sky navy).
  - Integrated course homework checklist with 1-click completion boxes.
- **Academic Vault & Notes**:
  - Course curriculum cards with solid indicator borders matching course faculties.
  - Dedicated "All Courses" and "Subject Only" assignment completion switch.
- **Dashboard Hub**:
  - 4 heritage metric tiles (Classes, Homework Due, Canteen Orders, Exam Milestone).
  - Daily schedule split-view with direct task checkboxes.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Color-Coded Solid Left Borders vs. Translucent Glow Borders
- **Chosen Approach**: Flat white/navy cards with a bold `4px` solid left indicator border colored by course/period.
- **Why**: Eliminates muddy translucent glass effects and ensures instant visual scanning across the 6 daily periods.
- **Alternatives Considered**: Full gradient cards (too visually loud) or plain gray borders (insufficient distinction between subjects).

### Decision 2: Warm Parchment Neutrals vs. Pure Cold Blue Grays
- **Chosen Approach**: Warm stone/parchment neutrals (`#FAF8F5` light, `#0B1329` dark) with warm bronze accents.
- **Why**: Creates the authentic "Academic Ivy" library atmosphere while maintaining WCAG AA contrast standards.
- **Alternatives Considered**: Cold modern gray (`#F1F5F9`) which felt too corporate SaaS and lacked academic warmth.

### Decision 3: Unboxed Metadata vs. Colored Pill Tags
- **Chosen Approach**: Clean typography with dot separators (`·`) for room, building, professor, and date.
- **Why**: Adheres strictly to the frontend-design zero-pill constitution, dramatically decluttering period cards and assignment listings.

---

## 4. Technical Architecture & Implementation Blueprint

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AcadeX Application Shell                        │
│   (Classic Academic Ivy Theme: Navy #172554, Parchment #FAF8F5, Bronze)│
├────────────────────────────────┬───────────────────────────────────────┤
│          Sidebar Nav           │               Top Header              │
│  - AX Wordmark in Alto Display │  - Date & Academic Term Breadcrumb    │
│  - Clean Text Links with Dot   │  - User Role Badge (Student / Faculty)│
│  - Active Bronze Indicator     │  - Notification Drawer Toggle         │
├────────────────────────────────┴───────────────────────────────────────┤
│                             Main Viewport                              │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Dashboard / Timetable / Academic / Canteen / Calendar Views      │  │
│  │                                                                  │  │
│  │  - Flat Cards: bg-white dark:bg-slate-900 border border-stone-200│  │
│  │  - Solid Left Border Indicators: border-l-4 border-[color]       │  │
│  │  - Unboxed Inline Metadata: Room · Building · Instructor         │  │
│  │  - Interactive Checkbox: 1-click Task Completion Toggle          │  │
│  │  - Schedule Timing: 09:05 - 16:00 (6 periods + 3 breaks)         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Aesthetic Updates
1. `src/index.css`: Add Classic Academic Ivy CSS custom properties (`--canvas-warm`, `--navy-primary`, `--bronze-accent`, `--ivy-forest`, `--ivy-wine`), update background tones, and refine typography fallbacks.
2. `src/components/Sidebar.tsx` & `src/components/TopHeader.tsx`: Restyle brand mark to Classic Academic Ivy wordmark with bronze accent; replace pill tags with clean typography.
3. `src/components/TimetableView.tsx`: Apply flat panels with solid color-coded left borders, unboxed metadata, and bronze/navy headers.
4. `src/components/DashboardView.tsx`: Refine metric stat cards and daily period list to the Academic Ivy palette.
5. `src/components/AcademicView.tsx`: Style course tabs and assignment cards with heritage borders, clear homework vs project labels, and ivy-green completion states.
6. `src/components/CanteenView.tsx` & `src/components/CalendarView.tsx`: Align badges, event cards, and order buttons with the collegiate palette.

---

## 5. Verification & Quality Gates

- **Visual Contrast**: Verify all text meets WCAG AA $\ge 4.5:1$ contrast against warm parchment and midnight navy backgrounds.
- **Zero-Pill Compliance**: Verify that static metadata labels are unboxed text with `·` separators.
- **Schedule Integrity**: Ensure all 6 periods (09:05 – 16:00) and the 3 breaks (11:10, 12:15, 14:55) render cleanly in both Daily Grid and Weekly Matrix views.
- **Task Completion Verification**: Confirm that clicking assignment/homework completion updates status, strikes through title, shows checkmark, and persists across views.
