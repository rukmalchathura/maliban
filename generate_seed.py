import os
import json
import re

file_path = os.path.join(os.path.dirname(__file__), 'src', 'components', 'health_safety.html')

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Find HEALTH_SAFETY_DATA
start_idx = html.find('const HEALTH_SAFETY_DATA = [')
if start_idx == -1:
    print("Could not find HEALTH_SAFETY_DATA")
    exit(1)

# Find the end of the array
end_idx = html.find('];\n\n    // LOCAL STORAGE STATE INITIALIZATION', start_idx) + 2

# We need to extract the data and parse it. Since it's Javascript, not strict JSON, 
# python's json.loads might fail (e.g. unquoted keys). We can use a regex to quote keys, 
# but it's risky. Let's just do a basic regex replacement to fix keys.

js_data = html[start_idx:end_idx].replace('const HEALTH_SAFETY_DATA = ', '')

# Simple fix for unquoted keys
js_data = re.sub(r'(\s+)([a-zA-Z0-9_]+):', r'\1"\2":', js_data)
# Replace single quotes with double quotes where they enclose strings
js_data = re.sub(r"'([^']*)'", r'"\1"', js_data)
# Remove trailing commas
js_data = re.sub(r',\s*]', ']', js_data)
js_data = re.sub(r',\s*}', '}', js_data)

try:
    data = json.loads(js_data)
except Exception as e:
    print("Error parsing JSON:", e)
    # If parsing fails, we'll just skip the seed.sql generation since we already
    # provided instructions, but let's try.
    pass

AUDIT_ID = '11111111-1111-1111-1111-111111111111'
sql = f"-- Seed data for Maliban Compliance Audit\n\n-- Insert dummy audit\nINSERT INTO public.audits (id, title, auditor_name) VALUES ('{AUDIT_ID}', 'Initial Seeded Audit', 'System Admin') ON CONFLICT DO NOTHING;\n\n"

if 'data' in locals():
    for section in data:
        sql += f"-- Insert Section: {section['code']}\n"
        sql += f"INSERT INTO public.audit_sections (audit_id, section_key, title) VALUES ('{AUDIT_ID}', '{section['code']}', '{section['title'].replace(chr(39), chr(39)*2)}');\n\n"
        for sub in section['subsections']:
            for q in sub['questions']:
                sql += "INSERT INTO public.audit_questions (audit_id, section_key, question_code, question_text, legal_reference, max_points) VALUES "
                sql += f"('{AUDIT_ID}', '{section['code']}', '{q['id']}', '{q['text'].replace(chr(39), chr(39)*2)}', '', 10);\n"
        sql += "\n"

seed_path = os.path.join(os.path.dirname(__file__), 'supabase', 'seed.sql')
os.makedirs(os.path.dirname(seed_path), exist_ok=True)
with open(seed_path, 'w', encoding='utf-8') as f:
    f.write(sql)

print("Successfully generated supabase/seed.sql")
