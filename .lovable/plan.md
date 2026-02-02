
# Remove Decision Helper and ShopMy Tutorial from Dashboard

## Summary
Remove two items from the Dashboard: the "Decision Helper" tool link (which points to a non-existent page) and the "Shopmy Tutorial" placeholder link.

---

## Changes

### File: `src/pages/Dashboard.tsx`

**1. Remove "Shopmy Tutorial" from Money Tools (line 194)**
- Remove the entry: `{ name: "Shopmy Tutorial", href: "#", external: true, icon: Video }`
- This is a placeholder link with no actual content

**2. Remove "Decision Helper" from Work Tools (line 199)**  
- Remove the entry: `{ name: "Decision Helper", href: "/tools/decision-helper", icon: Wrench }`
- This tool was previously removed from the application but the link remained

---

## Result
After these changes:
- **Money Tools** will have 5 items (was 6)
- **Work Tools** will have 3 items (was 4)

Both arrays will only contain working links to actual content.
