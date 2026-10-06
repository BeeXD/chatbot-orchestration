import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  Code2
} from 'lucide-react';

export function DocsPage() {
  const sections = [
    { num: '01', title: 'Introduction & Scope', desc: 'Strictly decoupled React frontend for multi-platform AI chatbot orchestration. Excludes backend database and express code.' },
    { num: '02', title: 'Frontend Role & Personas', desc: 'Supports Admin (full CRUD), Developer (create/view), Support Agent (read-only monitoring), and End-Users.' },
    { num: '03', title: 'Component Classification', desc: 'Separation of Layout (Header/Sidebar), Page, Functional (Filters/Cards), and Feedback components.' },
    { num: '04', title: 'Dashboard Interface', desc: 'Centralized control panel presenting chatbot instances, platform badges, intents summary, and creation timestamps.' },
    { num: '05', title: 'Chatbot Creation Interface', desc: 'Guided form workflow with strict client-side validation for mandatory fields (Name, Platform, Intents).' },
    { num: '06', title: 'Chatbot Listing Layouts', desc: 'Dual display capability: Responsive Grid Cards and dense Scannable Tabular Rows with automatic sync.' },
    { num: '07', title: 'Platform-Based Filtering', desc: 'Case-insensitive instant filtering by platform (WhatsApp, Slack, Web, Discord, Teams) and query search.' },
    { num: '08', title: 'Safeguarded Deletion Flow', desc: 'Critical action protection via warning dialogs, immediate visual updates, and action notifications.' },
    { num: '09', title: 'State Management Architecture', desc: 'Centralized React Context + Reducer managing instance state, active filters, loading flags, and toasts.' },
    { num: '10', title: 'RESTful API Integration', desc: 'Decoupled communication pattern with asynchronous lifecycle simulation and mock endpoint adapters.' },
    { num: '11', title: 'Error Handling & Feedback', desc: 'Actionable, non-technical error alerts and auto-dismissing toast notifications across async events.' },
    { num: '12', title: 'Loading Indicators & Skeletons', desc: 'Visual pulse skeletons and spinners to eliminate layout shift and improve perceived performance.' },
    { num: '13', title: 'Responsive Design Strategy', desc: 'Fluid grid layout and collapsible navigation drawer adapting seamlessly from mobile to wide screens.' },
    { num: '14', title: 'Accessibility (WCAG 2.1 AA)', desc: 'Semantic HTML5 structure, ARIA landmarks, keyboard focus management, and high-contrast color ratios.' },
    { num: '15', title: 'Frontend Performance', desc: 'Zero layout shift, memoized filter pipelines, smooth 60fps transitions, and lightweight bundle.' },
    { num: '16', title: 'Frontend Security', desc: 'Client-side sanitization, strict form validations, and zero storage of confidential API secrets in plain text.' },
    { num: '17', title: 'Extensibility & Modular Design', desc: 'Architected to easily plug in analytics telemetries, AI monitoring panels, and custom platform connectors.' },
    { num: '18', title: 'Architecture Data Flow', desc: 'User Action -> React Components -> State Engine -> REST API Client -> Local Persistence.' },
    { num: '19', title: 'Testing & Quality Assurance', desc: 'Component rendering validation, user flow verifications, and cross-browser responsiveness.' },
    { num: '20', title: 'Platform Conclusion', desc: 'Comprehensive, scalable, and academic-grade React frontend specification fulfillment.' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          SRS Architecture & Requirements Breakdown
        </span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
          Software Requirements Specification Matrix
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Traceability index connecting all 20 specification sections from the source document (<a href="file:///c:/proj/iameneo/proj#1/AI-Chatbot-React-Frontend-SRS.pdf" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '600' }}>AI-Chatbot-React-Frontend-SRS.pdf</a>) directly to this React implementation.
        </p>
      </div>

      {/* 20-Section Traceability Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}
      >
        {sections.map((sec) => (
          <div
            key={sec.num}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--accent-primary)',
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  SEC {sec.num}
                </span>
                <CheckCircle2 size={16} color="var(--status-active)" />
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {sec.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {sec.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
