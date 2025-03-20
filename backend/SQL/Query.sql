ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255) NULL;

ALTER TABLE users MODIFY COLUMN roles SET('jobseeker', 'employer', 'admin') NOT NULL DEFAULT 'jobseeker';