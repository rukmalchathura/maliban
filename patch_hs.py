import re

with open('src/components/health_safety.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update LOCAL_STORAGE_KEY
content = content.replace("const LOCAL_STORAGE_KEY = 'maliban_hs_section_data_v3';", "const LOCAL_STORAGE_KEY = 'maliban_hs_section_data_v4';")

# 2. Add attachments: [] initialization
init_old = """            q.answer = 'YES';
            q.severity = 'NONE';
            q.legalFlag = false;"""
init_new = """            q.answer = 'YES';
            q.severity = 'NONE';
            q.legalFlag = false;
            if (!q.attachments) q.attachments = [];"""
content = content.replace(init_old, init_new)

# 3. Add Section 4 Data
section_4_data = """      },
      {
        id: 'sec-4.0',
        code: '4.0',
        title: 'Fabric Stores Health & Safety Inspection Checklist',
        subsections: [
          {
            code: '4.1',
            title: 'Housekeeping & General Conditions',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.1_1', text: 'Floor is clean, dry, and free from dust and fabric waste.' },
              { id: 'hs_4.1_2', text: 'Walkways are clear and properly marked.' },
              { id: 'hs_4.1_3', text: 'Emergency exits are unobstructed.' },
              { id: 'hs_4.1_4', text: 'Fabric rolls are stored neatly.' },
              { id: 'hs_4.1_5', text: 'No loose materials creating trip hazards.' },
              { id: 'hs_4.1_6', text: 'Adequate lighting throughout the store.' },
              { id: 'hs_4.1_7', text: 'Ventilation is adequate.' }
            ]
          },
          {
            code: '4.2',
            title: 'Fabric Storage',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.2_1', text: 'Fabric rolls are stacked safely.' },
              { id: 'hs_4.2_2', text: 'Storage height is within the approved limit.' },
              { id: 'hs_4.2_3', text: 'Heavy fabric stored on lower racks.' },
              { id: 'hs_4.2_4', text: 'Damaged racks are not in use.' },
              { id: 'hs_4.2_5', text: 'Rack load capacity labels are displayed.' },
              { id: 'hs_4.2_6', text: 'Fabric is protected from moisture.' }
            ]
          },
          {
            code: '4.3',
            title: 'Fire Safety',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.3_1', text: 'Fire extinguishers are accessible.' },
              { id: 'hs_4.3_2', text: 'Fire extinguishers inspected monthly.' },
              { id: 'hs_4.3_3', text: 'Fire points are unobstructed.' },
              { id: 'hs_4.3_4', text: 'Fire alarm call points accessible.' },
              { id: 'hs_4.3_5', text: 'Emergency evacuation map displayed.' },
              { id: 'hs_4.3_6', text: 'Emergency lighting operational.' },
              { id: 'hs_4.3_7', text: 'No combustible waste accumulated.' }
            ]
          },
          {
            code: '4.4',
            title: 'Electrical Safety',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.4_1', text: 'Electrical panels are accessible.' },
              { id: 'hs_4.4_2', text: 'Distribution boards are labeled.' },
              { id: 'hs_4.4_3', text: 'No exposed electrical wiring.' },
              { id: 'hs_4.4_4', text: 'Extension cords are used safely.' },
              { id: 'hs_4.4_5', text: 'Electrical equipment appears in good condition.' }
            ]
          },
          {
            code: '4.5',
            title: 'Manual Handling & Ergonomics',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.5_1', text: 'Workers use correct lifting techniques.' },
              { id: 'hs_4.5_2', text: 'Trolleys available and in good condition.' },
              { id: 'hs_4.5_3', text: 'Workers do not manually lift excessive loads.' },
              { id: 'hs_4.5_4', text: 'Aisles are wide enough for trolley movement.' }
            ]
          },
          {
            code: '4.6',
            title: 'PPE',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.6_1', text: 'Safety shoes are worn.' },
              { id: 'hs_4.6_2', text: 'High-visibility vests worn where required.' },
              { id: 'hs_4.6_3', text: 'Gloves available for handling materials if required.' },
              { id: 'hs_4.6_4', text: 'PPE is in good condition.' }
            ]
          },
          {
            code: '4.7',
            title: 'Equipment & Machinery',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.7_1', text: 'Fabric inspection machines are safe to operate.' },
              { id: 'hs_4.7_2', text: 'Emergency stop buttons function correctly.' },
              { id: 'hs_4.7_3', text: 'Machine guards are in place.' },
              { id: 'hs_4.7_4', text: 'Equipment maintenance records are current.' }
            ]
          },
          {
            code: '4.8',
            title: 'Chemical & Hazardous Materials',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.8_1', text: 'Cleaning chemicals are labeled.' },
              { id: 'hs_4.8_2', text: 'Chemicals stored separately from fabrics.' },
              { id: 'hs_4.8_3', text: 'SDS available for chemicals used.' }
            ]
          },
          {
            code: '4.9',
            title: 'Emergency Preparedness',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.9_1', text: 'Emergency exits are clearly marked with illuminated EXIT signs.' },
              { id: 'hs_4.9_2', text: 'Emergency exit routes are free from obstructions.' },
              { id: 'hs_4.9_3', text: 'No fabric rolls, cartons, pallets, or other goods are stored on staircases, stair landings, or under stairways.' },
              { id: 'hs_4.9_4', text: 'Emergency lighting units are installed at exit routes, stairways, and emergency exits.' },
              { id: 'hs_4.9_5', text: 'Emergency lights are operational during a power failure (function test completed).' },
              { id: 'hs_4.9_6', text: 'Emergency light batteries are in good condition and periodically tested.' },
              { id: 'hs_4.9_7', text: 'Fire extinguishers are available, accessible, and properly mounted.' },
              { id: 'hs_4.9_8', text: 'Fire extinguishers have valid inspection tags and are within the inspection period.' },
              { id: 'hs_4.9_9', text: 'Fire alarm call points are accessible and unobstructed.' },
              { id: 'hs_4.9_10', text: 'Manual fire alarm call points are clearly identified.' },
              { id: 'hs_4.9_11', text: 'Fire alarm sounders are functional and audible throughout the fabric store.' },
              { id: 'hs_4.9_12', text: 'Fire hose reels (if applicable) are accessible and in good condition.' },
              { id: 'hs_4.9_13', text: 'Evacuation maps are displayed at prominent locations.' },
              { id: 'hs_4.9_14', text: 'Assembly point signage is displayed and visible.' },
              { id: 'hs_4.9_15', text: 'Fire doors are kept closed and are not wedged open.' },
              { id: 'hs_4.9_16', text: 'No combustible materials are stored in front of electrical panels, fire equipment, or emergency exits.' },
              { id: 'hs_4.9_17', text: 'Emergency contact numbers are displayed.' },
              { id: 'hs_4.9_18', text: 'First aid box is complete and readily accessible.' },
              { id: 'hs_4.9_19', text: 'Employees are aware of emergency evacuation procedures.' },
              { id: 'hs_4.9_20', text: 'First aid box is available, fully stocked, and easily accessible.' }
            ]
          },
          {
            code: '4.10',
            title: 'Security & Good Practices',
            comment: '',
            attachments: [],
            questions: [
              { id: 'hs_4.10_1', text: 'Unauthorized persons restricted from the store.' },
              { id: 'hs_4.10_2', text: 'CCTV operating (if installed).' },
              { id: 'hs_4.10_3', text: 'Storage areas properly identified.' },
              { id: 'hs_4.10_4', text: 'Fabric lots clearly labeled for traceability.' },
              { id: 'hs_4.10_5', text: 'Pest control evidence available.' },
              { id: 'hs_4.10_6', text: 'No signs of water leakage or dampness.' },
              { id: 'hs_4.10_7', text: 'Overall health & safety conditions are satisfactory.' }
            ]
          }
        ]
      }"""
content = content.replace("        ]\n      }\n    ];", section_4_data + "\n    ];")

# 4. Modify renderSubsections
q_att_html = """
                    <!-- Question-Level Attachments -->
                    <div class="mt-3 pt-3 border-t border-slate-800/50">
                      <div class="flex items-center justify-between mb-2">
                        <label class="text-[10px] uppercase font-bold text-sky-400 flex items-center gap-1.5">
                          <i data-lucide="paperclip" class="w-3 h-3"></i> Evidence
                        </label>
                        <button onclick="document.getElementById('file-input-${q.id}').click()" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-sky-300 px-2 py-1 rounded transition flex items-center gap-1 border border-slate-700">
                          <i data-lucide="upload" class="w-3 h-3"></i> Upload
                        </button>
                        <input type="file" id="file-input-${q.id}" class="hidden" multiple accept="image/*,.pdf" onchange="handleQuestionFileUpload('${sub.code}', '${q.id}', this.files)">
                      </div>
                      
                      <!-- Attachment List -->
                      <div id="q-attachments-${q.id}" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        ${(q.attachments || []).map((att, attIdx) => `
                          <div class="relative group rounded border border-slate-700 overflow-hidden bg-slate-950 aspect-square flex items-center justify-center text-center">
                            ${att.previewUrl && att.type && att.type.includes('image') ? `
                              <img src="${att.previewUrl}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                              <a href="${att.previewUrl}" target="_blank" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition z-10">
                                <i data-lucide="external-link" class="w-4 h-4 text-white"></i>
                              </a>
                            ` : `
                              <div class="w-full h-full flex flex-col items-center justify-center text-[10px] text-slate-400 p-2 break-all bg-slate-800">
                                <i data-lucide="file-text" class="w-4 h-4 mb-1"></i>
                                ${att.name}
                              </div>
                            `}
                            <button onclick="removeQuestionAttachment('${sub.code}', '${q.id}', ${attIdx})" class="absolute top-1 right-1 bg-red-500/90 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition z-20">
                              <i data-lucide="x" class="w-3 h-3"></i>
                            </button>
                          </div>
                        `).join('')}
                      </div>
                    </div>
"""
find_html = """                      </div>
                    </div>
                  </div>
                `;"""
replace_html = f"""                      </div>
{q_att_html}
                    </div>
                  </div>
                `;"""
content = content.replace(find_html, replace_html)

# 5. Add JS functions for question attachments
js_functions = """
    function handleQuestionFileUpload(subCode, qId, files) {
      if (!files || files.length === 0) return;
      
      for (const section of hsDataStore) {
        const sub = section.subsections.find(s => s.code === subCode);
        if (sub) {
          const q = sub.questions.find(q => q.id === qId);
          if (q) {
            if (!q.attachments) q.attachments = [];
            const promises = Array.from(files).map(f => {
              return new Promise(resolve => {
                const entry = {
                  name: f.name,
                  size: (f.size / 1024).toFixed(1) + ' KB',
                  type: f.type,
                  previewUrl: null
                };
                if (f.type.startsWith('image/')) {
                  const reader = new FileReader();
                  reader.onload = event => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const MAX_SIZE = 1000;
                      let width = img.width;
                      let height = img.height;
                      if (width > height) {
                        if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
                      } else {
                        if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
                      }
                      canvas.width = width;
                      canvas.height = height;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0, width, height);
                      entry.previewUrl = canvas.toDataURL('image/jpeg', 0.6);
                      resolve(entry);
                    };
                    img.onerror = () => { entry.previewUrl = event.target.result; resolve(entry); };
                  };
                  reader.onerror = () => resolve(entry);
                  reader.readAsDataURL(f);
                } else {
                  resolve(entry);
                }
              });
            });

            Promise.all(promises).then(entries => {
              entries.forEach(e => q.attachments.push(e));
              saveHealthSafetyData();
              renderSubsections();
            });
            break;
          }
        }
      }
    }

    function removeQuestionAttachment(subCode, qId, index) {
      for (const section of hsDataStore) {
        const sub = section.subsections.find(s => s.code === subCode);
        if (sub) {
          const q = sub.questions.find(q => q.id === qId);
          if (q && q.attachments) {
            q.attachments.splice(index, 1);
            saveHealthSafetyData();
            renderSubsections();
            break;
          }
        }
      }
    }
"""
content = content.replace("function removeAttachment(subCode, index) {", js_functions + "\n    function removeAttachment(subCode, index) {")

with open('src/components/health_safety.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("PATCHED")
