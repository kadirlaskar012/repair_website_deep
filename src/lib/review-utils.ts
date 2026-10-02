import { Review } from './types';

/**
 * Sorts customer reviews so that newest/latest reviews appear first.
 * Criteria:
 * 1. Date descending (e.g. 2026-10-02 before 2025-10-14)
 * 2. Numeric timestamp in id (e.g. rev-1772439123000 before rev-1)
 * 3. Fallback to sortOrder
 */
export function sortReviewsNewestFirst(reviews: Review[]): Review[] {
  if (!Array.isArray(reviews)) return [];
  return [...reviews].sort((a, b) => {
    // 1. Primary: Compare dates descending (newest date first)
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    if (!isNaN(timeA) && !isNaN(timeB) && timeB !== timeA) {
      return timeB - timeA;
    }

    // 2. Secondary: If dates match, check timestamp in review id (e.g. rev-17724... is newest, rev-1 is older)
    const numA = a.id && a.id.startsWith('rev-') ? Number(a.id.replace('rev-', '')) : 0;
    const numB = b.id && b.id.startsWith('rev-') ? Number(b.id.replace('rev-', '')) : 0;
    if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
      return numB - numA;
    }

    // 3. Fallback: sortOrder
    return (a.sortOrder || 0) - (b.sortOrder || 0);
  });
}
