const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'health_safety.html'), 'utf-8');

// Extract the HEALTH_SAFETY_DATA array
const startIndex = htmlContent.indexOf('const HEALTH_SAFETY_DATA = [');
if (startIndex === -1) {
    console.error("Could not find HEALTH_SAFETY_DATA in the HTML file.");
    process.exit(1);
}

const endIndex = htmlContent.indexOf('];', startIndex) + 2;
const dataString = htmlContent.substring(startIndex, endIndex).replace('const HEALTH_SAFETY_DATA = ', '');

// Evaluate the string to get the JS object
let HEALTH_SAFETY_DATA;
try {
    // using eval is safe here since we are parsing local static data
    HEALTH_SAFETY_DATA = eval('(' + dataString + ')');
} catch (e) {
    console.error("Failed to parse data:", e);
    process.exit(1);
}

// Fixed UUID for our demo audit
const AUDIT_ID = '11111111-1111-1111-1111-111111111111';

let sql = `-- Seed data for Maliban Compliance Audit\n\n`;
sql += `-- Insert dummy audit\n`;
sql += `INSERT INTO public.audits (id, title, auditor_name) VALUES ('${AUDIT_ID}', 'Initial Seeded Audit', 'System Admin') ON CONFLICT DO NOTHING;\n\n`;

for (const section of HEALTH_SAFETY_DATA) {
    // Section key can be the section code
    sql += `-- Insert Section: ${section.code}\n`;
    sql += `INSERT INTO public.audit_sections (audit_id, section_key, title) VALUES ('${AUDIT_ID}', '${section.code}', '${section.title.replace(/'/g, "''")}');\n\n`;

    for (const sub of section.subsections) {
        for (const q of sub.questions) {
            sql += `INSERT INTO public.audit_questions (audit_id, section_key, question_code, question_text, legal_reference, max_points) VALUES `;
            sql += `('${AUDIT_ID}', '${section.code}', '${q.id}', '${q.text.replace(/'/g, "''")}', '', 10);\n`;
        }
    }
    sql += `\n`;
}

fs.writeFileSync(path.join(__dirname, 'supabase', 'seed.sql'), sql);
console.log("Successfully generated supabase/seed.sql");
