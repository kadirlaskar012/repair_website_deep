'use client';

import React from 'react';
import { ArrowRight, ChevronRight, AlertCircle, Wrench } from 'lucide-react';
import { Problem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface ProblemsListProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  lang: Language;
}

export default function ProblemsList({
  problems,
  onSelectProblem,
  lang
}: ProblemsListProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  return (
    <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'clamp(20px, 4vw, 32px)', marginBottom: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {t.commonProblems}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {t.clickToDiagnose}
            </p>
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-dark)', background: 'var(--color-primary-light)', padding: '4px 10px', borderRadius: '4px' }}>
            {isBn ? 'স্থির ₹২৯৯ ডায়াগনোসিস' : 'Flat ₹299 Diagnosis'}
          </span>
        </div>
      </div>

      {/* Clean Problems List (NO complicated cards) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {problems.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => onSelectProblem(p)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: 'var(--color-bg-warm)',
              border: '1px solid var(--color-border-light)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              transition: 'all 0.15s',
              cursor: 'pointer',
              gap: '16px'
            }}
            className="card-hover"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                {idx + 1}
              </div>

              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {isBn ? p.titleBn : p.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {isBn ? p.descriptionBn : p.description}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span>{isBn ? 'বিস্তারিত ও বুকিং' : 'Diagnose'}</span>
              <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
