'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Wrench, AlertCircle } from 'lucide-react';
import { Category, Problem, SearchKeywordItem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  problems: Problem[];
  keywords: SearchKeywordItem[];
  lang: Language;
  onSelectProblem?: (problem: Problem) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  categories,
  problems,
  keywords,
  lang,
  onSelectProblem
}: SearchModalProps) {
  const router = useRouter();
  const t = getDictionary(lang);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      lockScroll();
    } else {
      unlockScroll();
      setQuery('');
    }
    return () => {
      if (isOpen) unlockScroll();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search logic: Categories
  const matchedCategories = normalizedQuery
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(normalizedQuery) ||
        c.nameBn.toLowerCase().includes(normalizedQuery) ||
        c.shortDesc.toLowerCase().includes(normalizedQuery)
      )
    : [];

  // Search logic: Problems & Symptoms
  const matchedProblems = normalizedQuery
    ? problems.filter((p) =>
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.titleBn.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.symptoms.some((s) => s.toLowerCase().includes(normalizedQuery)) ||
        p.symptomsBn.some((s) => s.toLowerCase().includes(normalizedQuery))
      )
    : [];

  // Search logic: Keywords
  const matchedKeywords = normalizedQuery
    ? keywords.filter((k) =>
        k.keyword.toLowerCase().includes(normalizedQuery) ||
        k.keywordBn.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const hasResults = matchedCategories.length > 0 || matchedProblems.length > 0 || matchedKeywords.length > 0;

  const handleNavigateCategory = (slug: string) => {
    onClose();
    router.push(lang === 'bn' ? `/bn/${slug}` : `/${slug}`);
  };

  const handleProblemClick = (problem: Problem) => {
    onClose();
    if (onSelectProblem) {
      onSelectProblem(problem);
    } else {
      const cat = categories.find((c) => c.id === problem.categoryId);
      if (cat) {
        router.push(lang === 'bn' ? `/bn/${cat.slug}` : `/${cat.slug}`);
      }
    }
  };

  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-dialog"
        style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--color-border)', gap: '12px', background: 'var(--color-bg-card)' }}>
          <Search size={20} style={{ color: 'var(--color-primary)' }} />
          <input
            ref={inputRef}
            id="modal-service-search"
            name="searchQuery"
            aria-label={t.searchPlaceholder}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--color-text-main)',
              background: 'transparent'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: 'var(--color-bg-alt)',
              borderRadius: '6px',
              color: 'var(--color-text-muted)'
            }}
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}>
          {!normalizedQuery && (
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.04em' }}>
                {t.popularSearches}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {keywords.slice(0, 8).map((kw) => (
                  <button
                    key={kw.id}
                    onClick={() => {
                      setQuery(lang === 'bn' ? kw.keywordBn : kw.keyword);
                    }}
                    style={{
                      background: 'var(--color-bg-alt)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-main)',
                      border: '1px solid var(--color-border-light)',
                      transition: 'all 0.15s'
                    }}
                  >
                    {lang === 'bn' ? kw.keywordBn : kw.keyword}
                  </button>
                ))}
              </div>
            </div>
          )}

          {normalizedQuery && !hasResults && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <AlertCircle size={36} style={{ color: 'var(--color-accent)', margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{t.noResultsFound}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{t.tryAnotherSearch}</p>
            </div>
          )}

          {normalizedQuery && hasResults && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Category Matches */}
              {matchedCategories.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {lang === 'bn' ? 'সার্ভিস বিভাগ' : 'Service Categories'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleNavigateCategory(c.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          background: 'var(--color-bg-alt)',
                          borderRadius: '8px',
                          textAlign: 'left',
                          transition: 'background 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Wrench size={16} style={{ color: 'var(--color-primary)' }} />
                          <span style={{ fontWeight: 600 }}>{lang === 'bn' ? c.nameBn : c.name}</span>
                        </div>
                        <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Problems / Symptoms Matches */}
              {matchedProblems.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {lang === 'bn' ? 'সাধারণ সমস্যা ও লক্ষণ' : 'Identified Problems & Symptoms'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {matchedProblems.map((prob) => {
                      const cat = categories.find((c) => c.id === prob.categoryId);
                      return (
                        <button
                          key={prob.id}
                          onClick={() => handleProblemClick(prob)}
                          style={{
                            padding: '12px 14px',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '12px'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                              {lang === 'bn' ? prob.titleBn : prob.title}
                            </div>
                            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                                {cat ? (lang === 'bn' ? cat.nameBn : cat.name) : 'Appliance'}
                              </span>
                              <span>&bull;</span>
                              <span>₹299 Diagnosis</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, padding: '4px 8px', background: 'var(--color-primary-light)', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                            {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Diagnose'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
