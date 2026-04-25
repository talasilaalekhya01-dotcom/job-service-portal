# Design Brief

## Direction

Professional Clean — refined, trust-inspiring job portal interface that prioritizes clarity and information hierarchy over decoration.

## Tone

Clean editorial with restrained warmth: serious but approachable, minimal decoration, professional corporate feel inspired by LinkedIn and Indeed.

## Differentiation

Intentional card-based layout with alternating section backgrounds (card / muted backgrounds) creates visual rhythm without clutter; teal accent for job matches and highlights adds warmth to otherwise cool palette.

## Color Palette

| Token      | OKLCH        | Role                               |
| ---------- | ------------ | ---------------------------------- |
| background | 0.99 0.003 240 | Light off-white with cool undertone |
| foreground | 0.15 0.01 240  | Deep navy, high contrast text      |
| card       | 1.0 0.0 240    | Pure white for job listings        |
| primary    | 0.42 0.14 240  | Deep blue — trust, professionalism |
| accent     | 0.65 0.16 170  | Teal — highlights, matches, CTAs   |
| muted      | 0.93 0.01 240  | Subtle section backgrounds         |
| destructive| 0.55 0.22 25   | Red for negative actions           |

## Typography

- Display: Space Grotesk — modern sans-serif for headings, hero section labels
- Body: DM Sans — clean, readable body text and UI labels
- Scale: Hero `text-5xl md:text-7xl font-bold tracking-tight`, H2 `text-3xl font-bold`, Body `text-base`

## Elevation & Depth

Subtle card shadows (0.2–1.6px blur) create depth without drama; primary content on white cards elevates against muted section backgrounds; layered approach: background < muted sections < cards < popovers.

## Structural Zones

| Zone    | Background     | Border                      | Notes                                    |
| ------- | -------------- | --------------------------- | ---------------------------------------- |
| Header  | bg-card        | border-b border-border      | Sticky navigation, primary logo/brand    |
| Hero    | bg-background  | —                           | Search bar, featured/recent section       |
| Content | bg-background  | —                           | Alternates: bg-card (job listings) / bg-muted (filter sections) |
| Footer  | bg-muted/30    | border-t border-border      | Links, support, copyright                |

## Spacing & Rhythm

Spacious vertical rhythm: 6rem gaps between major sections, 3rem for subsections, 1.5rem for card groups; compact horizontal density in tables/lists; 1rem padding inside cards creates breathing room.

## Component Patterns

- Buttons: Primary (deep blue bg, white text), Secondary (muted bg, primary text), Ghost (transparent, primary text on hover)
- Cards: White background, subtle shadow, rounded 0.625rem, 1rem padding, bordered with border color
- Badges: Teal accent bg, dark text for job type/category; rounded full for pill-style tags
- Search bar: Bordered input with icon, large font-size on hero, compact on secondary uses

## Motion

Entrance: Fade-in on page load (0.3s ease-out). Hover: All interactive elements (buttons, cards) get 0.3s transition on shadow/scale. No decorative animations — motion is functional only.

## Constraints

- Maximum 3 colors active at once (primary, accent, destructive); use muted for neutral states
- No full-width gradients; OKLCH tokens only, no hex literals
- Cards maintain consistent roundness; no sharp corners on primary content zones
- Dark mode inverts L values, maintains C and H hues for consistent brand colors

## Signature Detail

Alternating card and muted backgrounds in content sections creates visual separation without borders — a subtle but distinctive departure from flat, uniform-background job portals.
