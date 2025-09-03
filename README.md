FormGuard – Interactive Form Validator 

📘 Project Roadmap

Phase 1 – Base Form Structure (Day 1)

Tasks:
Create a signup form with the following fields:

Full Name

Email

Password

Confirm Password

Use semantic HTML5 form elements (<form>, <input>, <label>, etc.).

Apply responsive CSS (mobile-first design).

Deliverable:
 A clean, well-structured form that looks professional and works on mobile and desktop.

Phase 2 – Frontend Validation (Client-Side) (Days 2–3)
Requirements:
Validate fields in real-time with JavaScript/TypeScript:

Name: Not empty, min 3 chars.

Email: Must match regex pattern.

Password: At least 8 chars, with uppercase, lowercase, number.

Confirm Password: Must match Password.

Prevent submission until all fields are valid.

Show inline feedback:

✅ Green check for valid inputs.

❌ Red error text for invalid inputs.

Add password strength meter (Weak → Strong).

Deliverable:
 A form where invalid inputs are blocked instantly, guiding the user with visual feedback.

Phase 3 – Advanced UX Enhancements (Day 4)
Features:
Floating labels (labels shrink above when typing).

Password toggle button (👁️ Show/Hide password).

Inline icons (checkmark or error icon beside inputs).

Animated error messages (smooth fade-in/out).

Auto-focus on the first invalid input when trying to submit.

Deliverable:
 A polished, professional-looking form that feels smooth and user-friendly.

Phase 4 – Backend Validation (Server-Side) (Days 5–6)
Setup:
Use Next.js API Routes (/api/validate) for backend checks.

On submit, send form data via fetch() (POST).

API re-validates all inputs (to prevent bypass).

Validation Rules:
Check if email already exists (simulate with in-memory array or JSON file).

Enforce strong password rules.

Sanitize all inputs (remove harmful characters).

Deliverable:
 A secure form system where invalid/malicious inputs are caught even if frontend validation is bypassed.

Phase 5 – Database Integration (Days 7–8)
Tools:
Prisma ORM + SQLite (or PostgreSQL if you want advanced setup).

Implementation:
Store the following fields in DB:

Full Name

Email (unique)

Password (hashed with bcrypt)

CreatedAt timestamp

Reject duplicate emails with proper error handling.

Deliverable:
 A real signup system where user data persists securely.

Phase 6 – Security & Polishing (Days 9–10)
Advanced Features:
Rate limiting API (to prevent spam signups).

Email validation with regex + DNS MX record check.

Dark mode toggle for form UI.

Unit tests for validation functions (using Jest).

Accessibility: ARIA labels, keyboard navigation, color contrast checks.

Deliverable:
 A production-grade form system with strong security, good UX, and accessibility support.
