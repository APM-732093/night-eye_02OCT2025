# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Night Eye is a browser-based interactive visual game featuring a demon cat character. The project is built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks.

## Project Structure

- `index.html` - Main HTML file containing all screen structures (start, selection, game, demon cat animation)
- `script.js` - Game state management and transition logic
- `style.css` - Complete styling including complex CSS animations for the demon cat character and village scene

## Architecture

### Game State Management (`script.js`)

The application uses a single `GameStateManager` class that handles:
- State transitions between screens: `start` → `selection` → `game` → `demonCatScreen`
- Character selection (4 profiles)
- Loading animations with cycling text messages
- Fade transitions between screens (800ms duration)
- Animation sequencing with precise timing

Key methods:
- `showScreen(screenId)` - Displays target screen by toggling 'active' class
- `fadeTransition(fromScreenId, toScreenId)` - Smooth opacity transitions
- `startDemonCatAnimation()` - Orchestrates village cat reactions and scene timing
- `triggerVillageCatReactions()` - Staggered animations for village cats fleeing (2s, 4s, 6s, 8s intervals)
- `displayGameWorld()` - Dynamically generates final game screen with inline styles

### Screen Flow Timing

1. Start screen → Selection (user click)
2. Selection → Game loading (user selects profile) → 1000ms delay → loading animation (3200ms)
3. Loading → Demon cat scene (1000ms delay)
4. Village cat reactions triggered at: 2s, 4s, 6s, 8s
5. Demon cat scene → Game world (13000ms total)

### Animation Architecture (`style.css`)

The CSS contains a highly detailed demon cat character built entirely with CSS:

**Character Components:**
- Head system: base, horn (3 segments with glowing runes), ears with tufts, face with glowing eyes
- Torso: chest plate with segments, chest crystal, armor markings
- Arms: shoulder guards, upper arm, forearm, wrist joints, hands with claws
- Legs: thighs with armor, knee joints with spikes, shins with guards, feet with toe claws
- Tail: 4 segments with energy orbs and spikes at tip

**Animation Systems:**
- Walking cycle: synchronized arm and leg swings (1.2-1.4s cycles)
- Breathing: subtle torso expansion (2.5s cycle)
- Glow effects: horn, eyes, crystals, runes (various pulse timings)
- Tail movement: multi-segment swishing (2s cycle)
- Demon cat walk: 12s full screen traversal

**Village Scene:**
- Parallax background layers (3 depths: far 20s, mid 15s, near 10s)
- 3 houses with animated windows and cat silhouettes
- 4 village cats with flee animations
- Atmospheric effects: mist flow, shadows

### Dynamic Content Generation

The `displayGameWorld()` method in `script.js` injects both HTML and CSS dynamically:
- Generates game world HTML structure
- Creates a `<style>` element with animations (`@keyframes`)
- Appends styles to document head at runtime

## Development

### Running the Project

Simply open `index.html` in a web browser. No build process, npm, or server required.

### Testing

Test each screen transition:
1. Start screen → Click "PLAY" button
2. Selection screen → Click any profile (1-4) or "BACK"
3. Loading animation → Verify text cycles and progress bar
4. Demon cat scene → Verify village cats flee in sequence
5. Final game world → Verify "Return to Start" button restarts

### Modifying Animations

CSS animations are located in `style.css` with clear section comments. Each animation has:
- Named keyframe definition (e.g., `@keyframes leftArmSwing`)
- Applied to specific class/element with duration and timing function
- Many use `infinite alternate` or `infinite` for continuous loops

Timing-critical sequences in `script.js` use `setTimeout()` chains - be careful when modifying delays to maintain proper synchronization.

### Character Customization

The demon cat character is composed of many nested div elements defined in `index.html` (lines 105-154). Each body part has corresponding CSS classes for styling and animation. To modify the character:
1. Locate the element structure in HTML
2. Find corresponding CSS classes in `style.css`
3. Adjust gradients, sizes, positions, or animations as needed

### Adding New Profiles

Currently 4 character profiles are defined but all lead to the same demon cat. To add distinct characters:
1. Capture `selectedCharacter` value from `selectCharacter(characterNumber)` in `script.js`
2. Modify `displayGameWorld()` or create separate character rendering logic
3. Consider creating additional character HTML structures or dynamic generation

## Important Notes

- All transitions use CSS opacity and `pointer-events` to prevent interaction during animations
- The loading animation uses a single progress bar with 3s animation duration
- Village cat flee animations remove cats via opacity (reaching 0 at animation end)
- The game currently restarts by fading back to start screen - no save/load functionality exists
- No external dependencies, libraries, or frameworks
