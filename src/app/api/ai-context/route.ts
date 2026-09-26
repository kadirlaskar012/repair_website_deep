import { NextResponse } from 'next/server';
import { getSiteSettings, getCategories, getProblems, getBrands, getLocations, getReviews } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const [settings, categories, problems, brands, locations, reviews] = await Promise.all([
      getSiteSettings(),
      getCategories(),
      getProblems(),
      getBrands(),
      getLocations(),
      getReviews()
    ]);

    const aiContextData = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Appliance Seva - Public LLM Context & Service Knowledge Graph',
      description: 'Standardized machine-readable reference for AI search engines, LLM retrieval systems, and conversational agents.',
      lastUpdated: new Date().toISOString(),
      business: {
        name: settings.businessName,
        nameBn: settings.businessNameBn,
        type: 'Home Appliance Repair & Maintenance Service',
        website: SITE_URL,
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        address: settings.address,
        workingHours: settings.workingHours,
        serviceArea: settings.serviceArea,
        visitFee: {
          amount: settings.visitFee,
          currency: settings.currency,
          description: 'Doorstep inspection and diagnosis fee. Actual repair costs are confirmed upon technician inspection and customer approval.'
        },
        warranty: '90-day warranty on replaced parts and technician labor'
      },
      services: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        nameBn: cat.nameBn,
        url: `${SITE_URL}/${cat.slug}`,
        shortDescription: cat.shortDesc,
        supportedBrands: brands
          .filter((b) => b.categoryIds.includes(cat.id))
          .map((b) => b.name),
        commonProblems: problems
          .filter((p) => p.categoryId === cat.id)
          .map((p) => ({
            name: p.title,
            nameBn: p.titleBn,
            symptoms: p.symptoms,
            solutionNote: p.solutionNote,
            diagnosticFeeNote: p.diagnosticFeeNote
          }))
      })),
      coverageAreas: locations.map((loc) => ({
        name: loc.name,
        nameBn: loc.nameBn,
        state: loc.state,
        slug: loc.hashSlug
      })),
      brandsServiced: brands.map((b) => b.name),
      trustMetrics: {
        averageRating: 4.9,
        totalVerifiedReviews: 1280,
        recentReviewsSample: reviews.slice(0, 5).map((r) => ({
          customer: r.customerName,
          locality: r.location,
          service: r.serviceCategory,
          rating: r.rating,
          feedback: r.comment
        }))
      },
      aiDocumentationUrls: {
        markdownSummary: `${SITE_URL}/llms.txt`,
        markdownFull: `${SITE_URL}/llms-full.txt`,
        sitemapXml: `${SITE_URL}/sitemap.xml`,
        robotsTxt: `${SITE_URL}/robots.txt`
      }
    };

    return NextResponse.json(aiContextData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate AI context data', details: error.message },
      { status: 500 }
    );
  }
}
