const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'health_safety.html');
let html = fs.readFileSync(filePath, 'utf-8');

// 1. Remove HEALTH_SAFETY_DATA
const startIdx = html.indexOf('const HEALTH_SAFETY_DATA = [');
const endIdx = html.indexOf('];', startIdx) + 2;

if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + '/* HEALTH_SAFETY_DATA removed - now using Supabase */\n' + html.substring(endIdx);
}

// 2. Add Supabase script to head
if (!html.includes('@supabase/supabase-js')) {
    html = html.replace('</head>', '  <!-- Supabase -->\n  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>\n</head>');
}

// 3. Replace initialization logic
const initLogic = `
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);
    const AUDIT_ID = '11111111-1111-1111-1111-111111111111'; // Must match the ID in seed.sql

    let hsDataStore = [];

    async function loadDataFromSupabase() {
      try {
        console.log("Fetching data from Supabase...");
        
        // Fetch Sections
        const { data: sectionsData, error: secError } = await supabase
          .from('audit_sections')
          .select('*')
          .eq('audit_id', AUDIT_ID)
          .order('section_key', { ascending: true });
        
        if (secError) throw secError;

        // Fetch Questions
        const { data: questionsData, error: qError } = await supabase
          .from('audit_questions')
          .select('*')
          .eq('audit_id', AUDIT_ID)
          .order('question_code', { ascending: true });

        if (qError) throw qError;
        
        // Fetch Attachments
        const { data: attachmentsData, error: attError } = await supabase
          .from('question_attachments')
          .select('*');
        if (attError) throw attError;

        // Reconstruct hsDataStore
        hsDataStore = sectionsData.map(sec => {
          const mainPrefix = sec.section_key.split('.')[0] + '.0';
          return {
            code: mainPrefix,
            title: sec.title,
            subsections: [
              {
                code: sec.section_key,
                title: sec.title,
                comment: '',
                attachments: [],
                questions: questionsData
                  .filter(q => q.section_key === sec.section_key)
                  .map(q => ({
                    id: q.question_code,
                    text: q.question_text,
                    answer: q.answer || 'UNANSWERED',
                    severity: q.nc_category || 'NONE',
                    legalFlag: false,
                    comment: q.auditor_notes || '',
                    attachments: attachmentsData
                      .filter(a => a.question_id === q.id)
                      .map(a => ({
                         name: a.file_name,
                         previewUrl: a.file_url,
                         type: a.file_type
                      }))
                  }))
              }
            ]
          };
        });
        
        // Group subsections by main prefix
        const finalStore = [];
        hsDataStore.forEach(item => {
           let existing = finalStore.find(x => x.code === item.code);
           if(existing) {
             existing.subsections.push(item.subsections[0]);
           } else {
             finalStore.push(item);
           }
        });
        hsDataStore = finalStore;

        renderSidebarNav();
        renderSubsections();
        recalculateHsScore();
        lucide.createIcons();
      } catch (err) {
        console.error("Error loading data from Supabase:", err);
        alert("Failed to load data from Supabase. Ensure you have seeded the database and added credentials.");
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      loadDataFromSupabase();
    });
`;

// Replace from LOCAL STORAGE STATE INITIALIZATION up to DOMContentLoaded closing
const initStart = html.indexOf('// LOCAL STORAGE STATE INITIALIZATION');
const domLoadedStr = "document.addEventListener('DOMContentLoaded', () => {\n      renderSidebarNav();\n      renderSubsections();\n      recalculateHsScore();\n      lucide.createIcons();\n    });";
const initEnd = html.indexOf(domLoadedStr) + domLoadedStr.length;

if (initStart !== -1 && html.indexOf(domLoadedStr) !== -1) {
    html = html.substring(0, initStart) + initLogic + html.substring(initEnd);
}

// 4. Update saveHealthSafetyData to use Supabase
const saveLogic = `
    async function saveHealthSafetyData() {
      try {
        console.log('Saving to Supabase...');
        // In a full implementation, you would iterate over hsDataStore 
        // and perform supabase.from('audit_questions').upsert(...) for each changed question.
        // For demonstration, we'll just log it. Real-time saves are handled in updateQuestionAnswer.
        
        // Example: update the overall audit status
        const { error } = await supabase
          .from('audits')
          .update({ status: 'IN_PROGRESS' })
          .eq('id', AUDIT_ID);
          
        if (error) throw error;
        alert('Audit progress saved to Supabase!');
      } catch (err) {
        console.error("Error saving:", err);
      }
    }
`;

html = html.replace('function saveHealthSafetyData() {', saveLogic + '\n    function old_saveHealthSafetyData() {');

// 5. Update updateQuestionAnswer to save directly to Supabase
const newUpdateAnswer = `
    async function updateQuestionAnswer(subCode, questionId, value) {
      for (const section of hsDataStore) {
        const sub = section.subsections.find(s => s.code === subCode);
        if (sub) {
          const q = sub.questions.find(q => q.id === questionId);
          if (q) {
            q.answer = value;
            if (value === 'NA' || value === 'NO APPLICABLE LEGAL REQUIREMENT') {
              q.severity = 'NONE';
              q.legalFlag = false;
            }
            
            // Save directly to Supabase
            supabase.from('audit_questions')
              .update({ answer: value, nc_category: q.severity })
              .eq('audit_id', AUDIT_ID)
              .eq('question_code', questionId)
              .then(({ error }) => {
                 if (error) console.error("Error saving answer:", error);
              });
              
            recalculateHsScore();
            renderSubsections(); 
            renderSidebarNav();
            break;
          }
        }
      }
    }
`;

html = html.replace(/function updateQuestionAnswer[\s\S]*?break;\n          }\n        }\n      }\n    }/, newUpdateAnswer);

fs.writeFileSync(filePath, html);
console.log('Successfully patched health_safety.html for Supabase integration.');
