

# Inner Circle Application — Database + ActiveCampaign Integration

## Overview
Wire up the Inner Circle application form to save submissions to the database for tracking/review and simultaneously send the contact to ActiveCampaign for CRM automation.

## What will happen

1. When someone submits the application form, their data is saved to a new `inner_circle_applications` table in the database with a `pending` status.
2. The same submission is sent to ActiveCampaign as a contact with custom fields (business type, revenue, team size, etc.) so you can manage outreach and follow-up from your CRM.
3. Admins can later review applications by querying the database or building an admin view.

## Technical Details

### 1. New Database Table: `inner_circle_applications`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| full_name | text | Required |
| email | text | Required |
| business_name | text | Required |
| business_type | text | Dropdown value |
| team_size | text | Dropdown value |
| annual_revenue | text | Dropdown value |
| years_in_business | text | Free text |
| help_with | text | Open text |
| referral_source | text | Free text |
| anything_else | text | Optional |
| status | text | Default: `pending` (pending / accepted / rejected) |
| created_at | timestamptz | Auto |

- RLS: INSERT allowed for anyone (no auth required — this is a public application form). SELECT/UPDATE/DELETE restricted to admins only.

### 2. New Edge Function: `submit-inner-circle`

- Accepts the form data via POST
- Validates input fields
- Inserts a row into `inner_circle_applications`
- Sends the contact to ActiveCampaign (using existing `ACTIVECAMPAIGN_API_KEY` and `ACTIVECAMPAIGN_API_URL` secrets) with custom field values for business type, revenue, team size, and a tag like `inner-circle-applicant`
- Returns success/error response

### 3. Update `InnerCircle.tsx`

- Replace the simulated `setTimeout` submission with a real call to the `submit-inner-circle` edge function
- Show appropriate success/error toasts based on the response

### 4. No Authentication Required

Since this is a public-facing application page for prospective members, no login is needed. The edge function handles validation and insertion server-side.

