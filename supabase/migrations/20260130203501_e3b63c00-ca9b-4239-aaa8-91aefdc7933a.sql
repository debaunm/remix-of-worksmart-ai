-- 1. Delete Career Navigation prompts and pack
DELETE FROM prompts WHERE pack_id = '62f87a79-03cf-43c7-8dec-cf93f267ce90';
DELETE FROM prompt_packs WHERE id = '62f87a79-03cf-43c7-8dec-cf93f267ce90';

-- 2. Move Team Leadership prompts to Executive Communication pack
UPDATE prompts 
SET pack_id = '9a8922ee-2847-4c16-8742-c4625e1499b0'
WHERE pack_id = '3939dd93-6fdb-4366-8897-5e6cee3dea74';

-- 3. Delete Team Leadership pack (now empty)
DELETE FROM prompt_packs WHERE id = '3939dd93-6fdb-4366-8897-5e6cee3dea74';

-- 4. Update Executive Communication pack name to reflect combined content
UPDATE prompt_packs 
SET name = 'Executive & Team Leadership',
    description = 'Master high-stakes communication, coaching, delegation, and leadership messaging for teams and stakeholders.',
    price = 9.99
WHERE id = '9a8922ee-2847-4c16-8742-c4625e1499b0';

-- 5. Update all remaining packs to $9.99
UPDATE prompt_packs SET price = 9.99 WHERE price IS NOT NULL;

-- 6. Update display orders to close gaps
UPDATE prompt_packs SET display_order = 1 WHERE id = '9a8922ee-2847-4c16-8742-c4625e1499b0'; -- Exec & Team Leadership
UPDATE prompt_packs SET display_order = 2 WHERE id = 'a28fbb85-af9a-4305-83de-7a54d944e1ed'; -- Business Growth  
UPDATE prompt_packs SET display_order = 3 WHERE id = '241e9807-121b-4b0a-9fd3-9b6b2baf1774'; -- Content Creation
UPDATE prompt_packs SET display_order = 4 WHERE id = 'c6632fe9-3cef-4476-9e89-1bef005e786e'; -- Personal Productivity