
## Remove Inner Circle Offer

I've found the Inner Circle offer in multiple places:

| Location | What it is |
|----------|------------|
| `OfferStackSection.tsx` | The $5,000/yr card shown in "Choose Your Path" section on homepage |
| `InnerCircle.tsx` | The standalone `/inner-circle` application page |
| `App.tsx` | Route definition linking `/inner-circle` to the page |

**Plan Options:**

**Option A - Remove offer display only:**
- Delete the Inner Circle card from `extras` array in OfferStackSection
- Keep the `/inner-circle` page and route active (for existing applicants)

**Option B - Full removal:**
- Delete the card from OfferStackSection
- Remove the `/inner-circle` route from App.tsx
- Delete the `src/pages/InnerCircle.tsx` page file entirely

**Recommendation:** Option B if the program is discontinued, Option A if you just want to stop promoting it but honor existing interest.

Which approach do you prefer?
