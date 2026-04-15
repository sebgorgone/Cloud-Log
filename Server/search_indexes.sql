-- Search performance indexes for Cloud-Log.
-- Run these manually against your MySQL DB in a maintenance window.
-- If an index already exists with the same name, skip that line.

CREATE INDEX idx_jumps_user_jumpnum ON jumps (user_id, jump_num);
CREATE INDEX idx_jumps_user_jumpdate ON jumps (user_id, jump_date);
CREATE INDEX idx_jumps_user_dz ON jumps (user_id, dz);
CREATE INDEX idx_jumps_user_equipment ON jumps (user_id, equipment);
CREATE INDEX idx_tags_jump_ref ON tags (jump_ref);
CREATE INDEX idx_tags_jumpref_name ON tags (jump_ref, name);
