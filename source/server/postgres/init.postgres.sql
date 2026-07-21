-- =========================================
-- APRENDTK ENTERPRISE DATABASE INITIALIZER
-- =========================================

-- AUTH DATABASE
CREATE DATABASE authdb;

-- COURSE DATABASE
CREATE DATABASE coursedb;

-- AI DATABASE
CREATE DATABASE aidb;

-- NOTIFICATION DATABASE
CREATE DATABASE notificationdb;

-- =========================================
-- USERS TABLE
-- =========================================

\c authdb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    full_name VARCHAR(255) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(50) DEFAULT 'student',

    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_users_email ON users(email);

-- =========================================
-- COURSES TABLE
-- =========================================

\c coursedb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE courses (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    title VARCHAR(255) NOT NULL,

    description TEXT,

    level VARCHAR(100),

    technology VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_courses_title ON courses(title);

-- =========================================
-- AI ANALYTICS TABLE
-- =========================================

\c aidb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ai_predictions (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    student_id UUID,

    prediction TEXT,

    score NUMERIC,

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- NOTIFICATIONS TABLE
-- =========================================

\c notificationdb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE notifications (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID,

    message TEXT,

    status VARCHAR(50) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_notifications_status
ON notifications(status);
