---
name: popover-patterns
description: Native Popover API + @starting-style + anchor positioning templates for tooltip, dropdown, menu, modal, toast. Replaces custom backdrop/z-index boilerplate. On-demand load when spec mentions overlay UI.
---

# Popover Patterns — JS-Free Native Overlays

Browser now provides light-dismiss, ESC-to-close, focus trap, top-layer stacking, and scroll-behavior for free via the **Popover API** (`popover` attribute). Combined with `@starting-style` for entrance animation and `anchor-name` / `position-anchor` for positioning, you can drop most custom modal/dropdown boilerplate.

**Baseline:** Chrome/Edge 114+, Safari 17+, Firefox 125+. Anchor positioning: Chrome 125+ (Firefox/Safari still shipping — include fallback).

## When to use (and when NOT to)

| Use Popover API | Use custom implementation |
|---|---|
| Tooltip | Persistent side drawer / sheet |
| Dropdown menu | Multi-step wizard / form modal with validation state |
| Select / combobox | Full-screen overlay with complex scroll orchestration |
| Context menu | Stacked dialogs (nested modals) |
| Toast / snackbar | Animation that requires FLIP / shared element |
| Confirm dialog | Anything needing `AnimatePresence` sibling coordination |

Rule of thumb: if it opens from a trigger, closes on outside click, and doesn't need shared layout animation, Popover API wins.

---

## 1. Tooltip (manual popover, hover-triggered)

```tsx
<button
  popovertarget="price-tip"
  popovertargetaction="show"
  onMouseEnter={(e) => e.currentTarget.nextElementSibling?.showPopover()}
  onMouseLeave={(e) => e.currentTarget.nextElementSibling?.hidePopover()}
  style={{ anchorName: "--price-btn" } as any}
>
  $1,247.83
</button>
<div popover="manual" id="price-tip" className="tooltip">
  Includes tax and shipping.
</div>
```

```css
.tooltip {
  position-anchor: --price-btn;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;

  margin: 0;
  padding: 8px 12px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  border-radius: 6px;
  font-size: 12px;

  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 150ms ease-out, transform 150ms ease-out, overlay 150ms ease-out allow-discrete, display 150ms ease-out allow-discrete;
}
.tooltip:popover-open { opacity: 1; transform: translateY(0); }
@starting-style { .tooltip:popover-open { opacity: 0; transform: translateY(-4px); } }
```

`allow-discrete` is required to animate `display` and `overlay` (top-layer).

---

## 2. Dropdown Menu (auto popover)

```tsx
<button popovertarget="user-menu" style={{ anchorName: "--user-btn" } as any}>
  Sarah Chen
</button>
<div popover id="user-menu" className="menu">
  <button role="menuitem">Profile</button>
  <button role="menuitem">Settings</button>
  <button role="menuitem">Sign out</button>
</div>
```

`popover` (no value) = `popover="auto"` — light dismiss + ESC + exclusive (opening another auto popover closes this one). For menus inside a menubar, use `popover="auto"` so only one opens at a time. Browser handles focus return to trigger on close.

```css
.menu {
  position-anchor: --user-btn;
  top: anchor(bottom);
  right: anchor(right);
  translate: 0 6px;

  min-width: 180px;
  padding: 4px;
  margin: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;

  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  transition: opacity 160ms ease-out, transform 160ms ease-out, overlay 160ms ease-out allow-discrete, display 160ms ease-out allow-discrete;
}
.menu:popover-open { opacity: 1; transform: none; }
@starting-style { .menu:popover-open { opacity: 0; transform: translateY(-6px) scale(0.98); } }
```

---

## 3. Confirm Modal (native `<dialog>` or popover)

Prefer `<dialog>` for modal semantics (inert background, focus trap). For non-blocking confirm, use popover.

```tsx
<button onClick={() => dialogRef.current?.showModal()}>Delete</button>
<dialog ref={dialogRef} className="dialog">
  <h2>Delete 3 items?</h2>
  <p>This cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm" className="danger">Delete</button>
  </form>
</dialog>
```

```css
.dialog {
  padding: 32px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  border-radius: 12px;
  max-width: 420px;

  opacity: 0;
  transform: scale(0.96);
  transition: opacity 200ms ease-out, transform 200ms ease-out, overlay 200ms ease-out allow-discrete, display 200ms ease-out allow-discrete;
}
.dialog[open] { opacity: 1; transform: none; }
@starting-style { .dialog[open] { opacity: 0; transform: scale(0.96); } }
.dialog::backdrop {
  background: rgb(0 0 0 / 0);
  transition: background 200ms ease-out, overlay 200ms ease-out allow-discrete, display 200ms ease-out allow-discrete;
}
.dialog[open]::backdrop { background: rgb(0 0 0 / 0.6); }
@starting-style { .dialog[open]::backdrop { background: rgb(0 0 0 / 0); } }
```

`form[method="dialog"]` closes the dialog and returns `button.value` via `dialog.returnValue` — no onClick handlers needed for Cancel/Confirm.

---

## 4. Toast / Snackbar (manual popover, programmatic)

```tsx
function showToast(msg: string) {
  const el = document.getElementById("toast") as HTMLDivElement;
  el.textContent = msg;
  el.showPopover();
  setTimeout(() => el.hidePopover(), 4000);
}
```

```css
#toast {
  position: fixed;
  inset: auto 24px 24px auto;
  margin: 0;
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 220ms ease-out, transform 220ms ease-out, overlay 220ms ease-out allow-discrete, display 220ms ease-out allow-discrete;
}
#toast:popover-open { opacity: 1; transform: none; }
@starting-style { #toast:popover-open { opacity: 0; transform: translateY(16px); } }
```

`popover="manual"` = no light-dismiss, no ESC, no auto-close stacking. Full programmatic control.

---

## 5. Anchor Positioning Fallback (Firefox/Safari)

Anchor positioning is Chrome 125+ only. Wrap in `@supports` and provide absolute-positioning fallback:

```css
.menu {
  /* Fallback: parent must be position: relative */
  position: absolute; top: 100%; right: 0; margin-top: 6px;
}
@supports (anchor-name: --x) {
  .menu {
    position-anchor: --user-btn;
    top: anchor(bottom);
    right: anchor(right);
    translate: 0 6px;
    /* unset absolute fallback */
    position: fixed; /* popover defaults to top layer, so fixed is fine */
  }
}
```

---

## 6. Motion library interop

- Do NOT wrap a popover in `<AnimatePresence>`. The popover attribute manages display/overlay via CSS transition + `allow-discrete`, and `AnimatePresence` will fight the browser's top-layer handling.
- For enter/exit only: CSS `@starting-style` is sufficient and correct.
- If you need FLIP / shared-element animation, that's a case where custom implementation with Motion wins — use the decision table at the top.

---

## 7. Accessibility

The Popover API and `<dialog>` give you these for free:

- ESC to close (auto popover + dialog)
- Light dismiss on outside click (auto popover)
- Focus trap inside dialog (`showModal()`, not `show()`)
- Focus return to invoker on close
- Top layer (no z-index war)
- `inert` background during modal dialog

You still need to add:

- `aria-label` or `aria-labelledby` on the popover/dialog element
- `role="menu"` + `role="menuitem"` on menu children (popover alone doesn't imply role)
- Trigger `aria-haspopup="menu|dialog|listbox"` where relevant

---

## 8. Rules (enforce during implementation)

1. Default to Popover API / `<dialog>` for overlays unless the decision table § routes to custom.
2. Never stack a custom backdrop div with `z-50` — top layer handles stacking automatically.
3. Entrance animation via `@starting-style` + `transition-behavior: allow-discrete` (shorthand via individual `allow-discrete` on `display`/`overlay`).
4. Always include `@supports` fallback when using anchor positioning.
5. Do not combine `AnimatePresence` with `popover` on the same element.
6. Modal confirm/prompt forms use `<form method="dialog">` — no manual close handlers.
