-- =========================================
-- APRENDTK BACKUP TEMPLATE
-- =========================================

-- USERS BACKUP

COPY users TO '/backups/users_backup.csv'
DELIMITER ','
CSV HEADER;

-- COURSES BACKUP

COPY courses TO '/backups/courses_backup.csv'
DELIMITER ','
CSV HEADER;

-- AI PREDICTIONS BACKUP

COPY ai_predictions TO '/backups/ai_predictions_backup.csv'
DELIMITER ','
CSV HEADER;

-- NOTIFICATIONS BACKUP

COPY notifications TO '/backups/notifications_backup.csv'
DELIMITER ','
CSV HEADER;
