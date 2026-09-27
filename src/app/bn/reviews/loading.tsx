import React from 'react';

export default function BengaliReviewsLoading() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-base)' }}>
      {/* Top Banner Skeleton */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-warm)',
          paddingTop: '32px',
          paddingBottom: '36px',
          borderBottom: '1px solid var(--color-border-light)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div
            style={{
              width: '180px',
              height: '28px',
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              borderRadius: '20px',
              marginBottom: '16px'
            }}
          />
          <div
            style={{
              width: '85%',
              maxWidth: '520px',
              height: '36px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          />
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              height: '18px',
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              borderRadius: '4px'
            }}
          />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="container" style={{ padding: '36px 16px' }}>
        {/* Search & Tabs Skeleton */}
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto 28px auto',
            height: '46px',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            borderRadius: '12px'
          }}
        />

        {/* Review Cards Grid Skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    width: '130px',
                    height: '18px',
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '4px'
                  }}
                />
                <div
                  style={{
                    width: '75px',
                    height: '16px',
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div
                style={{
                  width: '160px',
                  height: '14px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '4px',
                  marginBottom: '16px'
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '14px',
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}
              />
              <div
                style={{
                  width: '80%',
                  height: '14px',
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  borderRadius: '4px'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
