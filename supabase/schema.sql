-- Supabase DDL Schema for Maliban Wovens (Pvt) Ltd Compliance Audit Application

-- Clean up old tables to allow fresh schema application (WARNING: DELETES TEST DATA)
DROP TABLE IF EXISTS public.question_attachments CASCADE;
DROP TABLE IF EXISTS public.audit_questions CASCADE;
DROP TABLE IF EXISTS public.audit_responses CASCADE;
DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.audit_sections CASCADE;
DROP TABLE IF EXISTS public.email_audit_logs CASCADE;
DROP TABLE IF EXISTS public.audits CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Audits
CREATE TABLE IF NOT EXISTS public.audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL DEFAULT 'Maliban Wovens (Pvt) Ltd - Monthly Compliance Audit',
    facility_name VARCHAR(255) NOT NULL DEFAULT 'Maliban Wovens (Pvt) Ltd',
    facility_location VARCHAR(255) NOT NULL DEFAULT 'Balangoda, Sri Lanka',
    auditor_name VARCHAR(255) NOT NULL,
    audit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_score NUMERIC(5, 2) DEFAULT 0.00,
    earned_points INTEGER DEFAULT 0,
    max_applicable_points INTEGER DEFAULT 0,
    critical_findings_count INTEGER DEFAULT 0,
    major_findings_count INTEGER DEFAULT 0,
    overall_rating VARCHAR(20) CHECK (overall_rating IN ('GREEN', 'YELLOW', 'RED', 'PENDING')) DEFAULT 'PENDING',
    status VARCHAR(50) CHECK (status IN ('DRAFT', 'IN_PROGRESS', 'SUBMITTED', 'ARCHIVED')) DEFAULT 'IN_PROGRESS',
    site_photos TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table: Audit Sections
CREATE TABLE IF NOT EXISTS public.audit_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES public.audits(id) ON DELETE CASCADE,
    section_key VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    completion_percentage NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table: Questions (Static Definitions)
CREATE TABLE IF NOT EXISTS public.questions (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'hs_1.1_1'
    section_key VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    legal_reference VARCHAR(255) NOT NULL,
    max_points INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table: Audit Responses
CREATE TABLE IF NOT EXISTS public.audit_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES public.audits(id) ON DELETE CASCADE,
    question_id VARCHAR(50) REFERENCES public.questions(id) ON DELETE CASCADE,
    nc_category VARCHAR(50) CHECK (nc_category IN ('CRITICAL', 'MAJOR', 'MINOR', 'OBSERVATION', 'STATUTORY')),
    earned_points INTEGER DEFAULT 0,
    deducted_points INTEGER DEFAULT 0,
    answer VARCHAR(20) CHECK (answer IN ('YES', 'NO', 'PARTIAL', 'NA', 'UNANSWERED')) DEFAULT 'UNANSWERED',
    auditor_notes TEXT DEFAULT '',
    capa_text TEXT DEFAULT '',
    capa_deadline DATE,
    responsible_person VARCHAR(255) DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(audit_id, question_id)
);

-- Table: Question Attachments
CREATE TABLE IF NOT EXISTS public.question_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    response_id UUID REFERENCES public.audit_responses(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table: Email Audit Logs
CREATE TABLE IF NOT EXISTS public.email_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES public.audits(id) ON DELETE CASCADE,
    recipients TEXT[] NOT NULL,
    subject VARCHAR(255) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status VARCHAR(50) DEFAULT 'SENT'
);

-- Indexes for optimal querying
CREATE INDEX IF NOT EXISTS idx_responses_audit_id ON public.audit_responses(audit_id);
CREATE INDEX IF NOT EXISTS idx_responses_question_id ON public.audit_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_attachments_response ON public.question_attachments(response_id);

-- Enable RLS (Row Level Security)
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access for demo/audit app
CREATE POLICY "Public Audits Select" ON public.audits FOR SELECT USING (true);
CREATE POLICY "Public Audits Insert" ON public.audits FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Audits Update" ON public.audits FOR UPDATE USING (true);

CREATE POLICY "Public Questions Static Select" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public Questions Static Insert" ON public.questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Questions Static Update" ON public.questions FOR UPDATE USING (true);

CREATE POLICY "Public Responses Select" ON public.audit_responses FOR SELECT USING (true);
CREATE POLICY "Public Responses Insert" ON public.audit_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Responses Update" ON public.audit_responses FOR UPDATE USING (true);

CREATE POLICY "Public Attachments Select" ON public.question_attachments FOR SELECT USING (true);
CREATE POLICY "Public Attachments Insert" ON public.question_attachments FOR INSERT WITH CHECK (true);
