// Command Data Structure
const servicesData = [
    {
        id: 'drive',
        name: 'Drive',
        icon: '📁',
        description: 'Manage files, folders, uploads, downloads, and permissions in Google Drive',
        commands: [
            {
                label: 'List files',
                code: 'gws drive list --max-results 20',
                output: 'ID: 1abc...  Name: Report.pdf  Size: 2.3 MB  Modified: 2026-03-15'
            },
            {
                label: 'Upload file',
                code: 'gws drive upload document.pdf --parent "Work Documents"',
                output: 'Uploaded successfully: document.pdf → ID: 1xyz...'
            },
            {
                label: 'Download file by ID',
                code: 'gws drive download 1abc123def456 --dest ./downloads/',
                output: 'Downloading Report.pdf... Done.'
            },
            {
                label: 'Share file publicly',
                code: 'gws drive share 1abc123def456 --role reader --type anyone',
                output: 'Share link: https://drive.google.com/file/d/1abc.../view'
            },
            {
                label: 'Search files',
                code: 'gws drive search "type:pdf name contains \'report\'"',
                output: 'Found 5 files matching query'
            }
        ],
        tips: [
            'Use --format json to pipe output to jq or other tools',
            'Batch uploads: gws drive upload *.pdf --parent "Folder Name"',
            'Export Google Docs: gws drive export 1abc123 --mime-type application/pdf'
        ]
    },
    {
        id: 'gmail',
        name: 'Gmail',
        icon: '📧',
        description: 'Send emails, search inbox, manage labels, and read messages',
        commands: [
            {
                label: 'Send email',
                code: 'gws gmail send --to user@example.com --subject "Hello" --body "Message text"',
                output: 'Email sent successfully. Message ID: 18f2a3b...'
            },
            {
                label: 'Send with attachment',
                code: 'gws gmail send --to team@co.com --subject "Report" --body "See attached" --attach report.pdf',
                output: 'Email sent with 1 attachment'
            },
            {
                label: 'Search inbox',
                code: 'gws gmail search "from:boss@company.com is:unread"',
                output: 'Found 3 messages'
            },
            {
                label: 'Read message',
                code: 'gws gmail read 18f2a3b4c5d6e7f8',
                output: 'From: alice@example.com\nSubject: Meeting\nBody: Let\'s meet at 3pm'
            },
            {
                label: 'Create label',
                code: 'gws gmail labels create "Important Projects"',
                output: 'Label created: Important Projects (ID: Label_123)'
            }
        ],
        tips: [
            'Use --body-stdin to pipe content: echo "text" | gws gmail send --to ...',
            'Draft emails: gws gmail draft create --to ... (saves without sending)',
            'Batch operations: Use --format json with jq to process multiple emails'
        ]
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: '📅',
        description: 'Create events, list upcoming meetings, and manage calendars',
        commands: [
            {
                label: 'List upcoming events',
                code: 'gws calendar list --days 7',
                output: 'Today 2pm: Team Standup\nTomorrow 10am: Client Call\n...'
            },
            {
                label: 'Create event',
                code: 'gws calendar create --title "Team Meeting" --start "2026-03-20T14:00" --duration 1h',
                output: 'Event created: Team Meeting (ID: evt_abc123)'
            },
            {
                label: 'Create event with attendees',
                code: 'gws calendar create --title "Review" --start "2026-03-21T15:00" --attendees "alice@co.com,bob@co.com"',
                output: 'Event created and invitations sent to 2 attendees'
            },
            {
                label: 'Delete event',
                code: 'gws calendar delete evt_abc123',
                output: 'Event deleted successfully'
            },
            {
                label: 'List all calendars',
                code: 'gws calendar calendars list',
                output: 'Primary Calendar (primary)\nWork Calendar (ID: cal_xyz...)'
            }
        ],
        tips: [
            'Use ISO 8601 format for dates: 2026-03-20T14:00:00-07:00',
            'Quick event: gws calendar quick "Lunch with team tomorrow at noon"',
            'Export to iCal: gws cal export evt_123 > meeting.ics'
        ]
    },
    {
        id: 'sheets',
        name: 'Sheets',
        icon: '📊',
        description: 'Read/write cells, create spreadsheets, and export data',
        commands: [
            {
                label: 'Read range',
                code: 'gws sheets read "Sales Report" A1:D10',
                output: 'Name, Q1, Q2, Q3\nAlice, 100, 150, 200\n...'
            },
            {
                label: 'Write to cells',
                code: 'gws sheets write "Budget 2026" A1 --value "Total Revenue" --bold',
                output: 'Cell A1 updated'
            },
            {
                label: 'Create spreadsheet',
                code: 'gws sheets create "New Report" --sheet "Data" --sheet "Charts"',
                output: 'Spreadsheet created: ID 1abc...'
            },
            {
                label: 'Append row',
                code: 'gws sheets append "Sales Log" --values "2026-03-18,Product A,500"',
                output: 'Row appended to Sales Log'
            },
            {
                label: 'Export as CSV',
                code: 'gws sheets export 1abc123 --format csv > data.csv',
                output: 'Exported 250 rows'
            }
        ],
        tips: [
            'Batch updates: Use --values-file to import CSV data',
            'Formulas: gws sheets write "Budget" B2 --formula "=SUM(B3:B10)"',
            'Clear range: gws sheets clear "Sheet1" A1:Z100'
        ]
    },
    {
        id: 'docs',
        name: 'Docs',
        icon: '📝',
        description: 'Create documents, export to various formats, and search content',
        commands: [
            {
                label: 'Create document',
                code: 'gws docs create "Project Proposal" --content "# Introduction\n\nThis is a new doc."',
                output: 'Document created: ID 1abc...'
            },
            {
                label: 'Read document',
                code: 'gws docs read 1abc123def456',
                output: 'Title: Project Proposal\nContent: # Introduction...'
            },
            {
                label: 'Append text',
                code: 'gws docs append 1abc123 --text "\n\n## New Section\n\nAdditional content."',
                output: 'Content appended to document'
            },
            {
                label: 'Export as PDF',
                code: 'gws docs export 1abc123 --format pdf > proposal.pdf',
                output: 'Document exported as PDF'
            },
            {
                label: 'Export as Markdown',
                code: 'gws docs export 1abc123 --format markdown',
                output: '# Introduction\n\nThis is a new doc.'
            }
        ],
        tips: [
            'Support for Markdown: Use --markdown flag to format content',
            'Insert images: gws docs insert-image 1abc123 --url https://...',
            'Batch export: for id in $(cat ids.txt); do gws docs export $id; done'
        ]
    },
    {
        id: 'slides',
        name: 'Slides',
        icon: '🎨',
        description: 'Create presentations, add slides, and export formats',
        commands: [
            {
                label: 'Create presentation',
                code: 'gws slides create "Q1 Review" --template "Simple"',
                output: 'Presentation created: ID 1abc...'
            },
            {
                label: 'Add slide with title',
                code: 'gws slides add-slide 1abc123 --layout title --title "Agenda" --subtitle "Q1 2026"',
                output: 'Slide added at position 1'
            },
            {
                label: 'Add text to slide',
                code: 'gws slides add-text 1abc123 --slide 2 --text "Key metrics improved by 25%"',
                output: 'Text added to slide 2'
            },
            {
                label: 'Export as PDF',
                code: 'gws slides export 1abc123 --format pdf > presentation.pdf',
                output: 'Presentation exported as PDF'
            },
            {
                label: 'List slides',
                code: 'gws slides list 1abc123',
                output: 'Slide 1: Title Slide\nSlide 2: Agenda\nSlide 3: Metrics'
            }
        ],
        tips: [
            'Templates: Use --template to start with predefined layouts',
            'Insert images: gws slides add-image 1abc123 --slide 2 --url https://...',
            'Export PPTX: gws slides export 1abc123 --format pptx'
        ]
    },
    {
        id: 'admin',
        name: 'Admin',
        icon: '⚙️',
        description: 'User management, organizational units, groups (requires admin privileges)',
        commands: [
            {
                label: 'List users',
                code: 'gws admin users list --domain company.com',
                output: 'alice@company.com (Admin)\nbob@company.com (User)\n...'
            },
            {
                label: 'Create user',
                code: 'gws admin users create --email newuser@company.com --first-name John --last-name Doe --password temp123',
                output: 'User created: newuser@company.com'
            },
            {
                label: 'List groups',
                code: 'gws admin groups list',
                output: 'engineering@company.com (50 members)\nsales@company.com (20 members)'
            },
            {
                label: 'Add user to group',
                code: 'gws admin groups add-member engineering@company.com --member alice@company.com',
                output: 'alice@company.com added to engineering@company.com'
            },
            {
                label: 'Create org unit',
                code: 'gws admin orgs create --name "Engineering" --parent "/"',
                output: 'Organizational unit created: /Engineering'
            }
        ],
        tips: [
            'Requires Google Workspace admin privileges',
            'Bulk user creation: Use --csv-file users.csv',
            'Audit logs: gws admin reports activities --application login'
        ]
    },
    {
        id: 'meet',
        name: 'Meet',
        icon: '🎥',
        description: 'Schedule meetings, generate join links, and manage recordings',
        commands: [
            {
                label: 'Create meeting',
                code: 'gws meet create --title "Team Sync" --start "2026-03-20T10:00" --duration 30m',
                output: 'Meeting created\nJoin: https://meet.google.com/abc-defg-hij'
            },
            {
                label: 'Generate instant meeting',
                code: 'gws meet instant',
                output: 'Instant meeting: https://meet.google.com/xyz-abcd-efg'
            },
            {
                label: 'List scheduled meetings',
                code: 'gws meet list --days 7',
                output: 'Today 10am: Team Sync (meet.google.com/abc...)\nTomorrow 2pm: Client Call'
            },
            {
                label: 'List recordings',
                code: 'gws meet recordings --days 30',
                output: 'Team Sync (2026-03-15) - 45m - ID: rec_abc...'
            },
            {
                label: 'Download recording',
                code: 'gws meet download-recording rec_abc123 --dest ./recordings/',
                output: 'Downloaded: team-sync-2026-03-15.mp4'
            }
        ],
        tips: [
            'Auto-record: Add --record flag when creating meetings',
            'Integration: Create Meet links from Calendar events automatically',
            'Transcripts: gws meet transcript rec_abc123 (if enabled)'
        ]
    }
];

// State Management
let currentTheme = localStorage.getItem('theme') || 'light';
let expandedServices = new Set();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderServices();
    initEventListeners();
    initKeyboardShortcuts();
    initIntersectionObserver();
});

// Theme Management
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// Render Services
function renderServices(filter = '') {
    const container = document.getElementById('servicesGrid');
    const filterLower = filter.toLowerCase();

    const filteredServices = filter
        ? servicesData.filter(service => {
            const nameMatch = service.name.toLowerCase().includes(filterLower);
            const descMatch = service.description.toLowerCase().includes(filterLower);
            const commandMatch = service.commands.some(cmd =>
                cmd.code.toLowerCase().includes(filterLower) ||
                cmd.label.toLowerCase().includes(filterLower)
            );
            return nameMatch || descMatch || commandMatch;
        })
        : servicesData;

    if (filteredServices.length === 0) {
        container.innerHTML = '<div class="search-no-results">No commands found matching your search.</div>';
        return;
    }

    container.innerHTML = filteredServices.map(service => `
        <div class="service-card ${expandedServices.has(service.id) ? 'expanded' : ''}" data-service="${service.id}">
            <div class="service-header" data-service-header="${service.id}">
                <div class="service-title-wrapper">
                    <span class="service-icon">${service.icon}</span>
                    <h3 class="service-title">${highlightText(service.name, filter)}</h3>
                </div>
                <span class="expand-icon">▼</span>
            </div>
            <p class="service-description">${highlightText(service.description, filter)}</p>
            <div class="service-content">
                <div class="command-section">
                    <h4>Common Commands</h4>
                    ${service.commands.map(cmd => `
                        <div class="command-item">
                            <p class="command-label">${highlightText(cmd.label, filter)}</p>
                            <div class="code-block-wrapper">
                                <pre class="code-block"><code>${highlightCommand(cmd.code, filter)}</code></pre>
                                <button class="copy-btn" data-copy="${escapeHtml(cmd.code)}">
                                    <span class="copy-icon">📋</span>
                                    <span class="copy-text">Copy</span>
                                </button>
                            </div>
                            ${cmd.output ? `<div class="example-output">${escapeHtml(cmd.output)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
                ${service.tips && service.tips.length > 0 ? `
                    <div class="tips-section">
                        <h5>💡 Tips & Tricks</h5>
                        <ul>
                            ${service.tips.map(tip => `<li>${highlightText(tip, filter)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Reattach event listeners
    attachServiceListeners();
    attachCopyListeners();
}

// Event Listeners
function initEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const searchInput = document.getElementById('searchInput');

    themeToggle.addEventListener('click', toggleTheme);
    searchInput.addEventListener('input', (e) => {
        renderServices(e.target.value);
    });

    attachServiceListeners();
    attachCopyListeners();
}

function attachServiceListeners() {
    document.querySelectorAll('[data-service-header]').forEach(header => {
        header.addEventListener('click', () => {
            const serviceId = header.dataset.serviceHeader;
            const card = document.querySelector(`[data-service="${serviceId}"]`);

            if (expandedServices.has(serviceId)) {
                expandedServices.delete(serviceId);
                card.classList.remove('expanded');
            } else {
                expandedServices.add(serviceId);
                card.classList.add('expanded');
            }
        });
    });
}

function attachCopyListeners() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.dataset.copy;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Visual feedback
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Focus search with '/'
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }

        // Clear search with Escape
        if (e.key === 'Escape' && document.activeElement.id === 'searchInput') {
            document.getElementById('searchInput').value = '';
            renderServices('');
            document.getElementById('searchInput').blur();
        }
    });
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

// Utility Functions
function highlightText(text, filter) {
    if (!filter) return escapeHtml(text);

    const regex = new RegExp(`(${escapeRegex(filter)})`, 'gi');
    return escapeHtml(text).replace(regex, '<span class="search-highlight">$1</span>');
}

function highlightCommand(code, filter) {
    let highlighted = escapeHtml(code);

    // Apply syntax highlighting
    highlighted = highlighted
        .replace(/^(gws|npm|df|tar|git|jq|echo|date)/gm, '<span class="token-command">$1</span>')
        .replace(/(--[\w-]+)/g, '<span class="token-keyword">$1</span>')
        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="token-string">$1</span>')
        .replace(/(#[^\n]*)/g, '<span class="token-comment">$1</span>')
        .replace(/^(\w+):/gm, '<span class="token-key">$1</span>:')
        .replace(/\$\(([^)]+)\)/g, '<span class="token-command">$(</span>$1<span class="token-command">)</span>');

    // Apply search highlighting on top
    if (filter) {
        const regex = new RegExp(`(${escapeRegex(filter)})`, 'gi');
        highlighted = highlighted.replace(regex, '<span class="search-highlight">$1</span>');
    }

    return highlighted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
