<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Home Appliance Care India</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #14221F;
            background: #F4F7F6;
            margin: 0;
            padding: 30px 16px;
            line-height: 1.5;
          }
          .container {
            max-width: 1140px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 18px;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
            border: 1px solid #E2E8E5;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0A3D33 0%, #146C5B 50%, #0F5749 100%);
            color: #FFFFFF;
            padding: 32px 36px;
            position: relative;
          }
          .brand-row {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 12px;
          }
          .logo-badge {
            width: 44px;
            height: 44px;
            background: #FFFFFF;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          .header p {
            margin: 4px 0 0 0;
            font-size: 13.5px;
            color: #D1FAE5;
            line-height: 1.5;
            max-width: 820px;
          }
          .stats-bar {
            background: #F0FDF4;
            border-bottom: 1px solid #BBF7D0;
            padding: 14px 36px;
            font-size: 13px;
            font-weight: 700;
            color: #166534;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
          }
          .table-wrapper {
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background: #F8FAFC;
            color: #475569;
            font-size: 11.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 14px 24px;
            border-bottom: 2px solid #E2E8F0;
          }
          td {
            padding: 13px 24px;
            font-size: 13px;
            border-bottom: 1px solid #F1F5F9;
            vertical-align: middle;
          }
          tr:nth-child(even) td {
            background: #FAFCFB;
          }
          tr:hover td {
            background: #F0FDF4;
          }
          a.loc-link {
            color: #146C5B;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
            display: inline-block;
          }
          a.loc-link:hover {
            text-decoration: underline;
            color: #0A3D33;
          }
          .badge {
            display: inline-block;
            padding: 4px 9px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.02em;
          }
          .priority-high {
            background: #DCFCE7;
            color: #15803D;
            border: 1px solid #BBF7D0;
          }
          .priority-med {
            background: #FEF3C7;
            color: #B45309;
            border: 1px solid #FDE68A;
          }
          .freq-badge {
            background: #EEF2F6;
            color: #334155;
            font-weight: 600;
            border: 1px solid #E2E8F0;
          }
          .lang-pill {
            display: inline-block;
            font-size: 10px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 4px;
            margin-right: 6px;
            text-transform: uppercase;
          }
          .lang-bn {
            background: #FEF3C7;
            color: #92400E;
          }
          .lang-en {
            background: #E0E7FF;
            color: #3730A3;
          }
          .footer {
            padding: 20px 36px;
            font-size: 12px;
            color: #64748B;
            text-align: center;
            background: #F8FAFC;
            border-top: 1px solid #E2E8F0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
          }
          .footer a {
            color: #146C5B;
            text-decoration: none;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Banner -->
          <div class="header">
            <div class="brand-row">
              <div class="logo-badge">
                <img src="/logo-icon.svg" alt="Home Appliance Care India" width="32" height="32" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>
              <div>
                <h1>Home Appliance Care India • XML Sitemap</h1>
              </div>
            </div>
            <p>
              This is a structured, search-engine-ready XML Sitemap compliant with Google Search Console, Bing, and AI crawlers.
              It lists all live pages, bilingual alternates (English &amp; Bengali), category hubs, brand centres, and blogs.
            </p>
          </div>

          <!-- Stats Bar -->
          <div class="stats-bar">
            <span>
              ✓ Total URLs Indexed: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url) + count(sitemap:sitemapindex/sitemap:sitemap)"/></strong>
            </span>
            <span>Domain: <strong>https://www.applianceseva.com</strong></span>
            <span>W3C Standard: <strong>Sitemaps Protocol 0.9</strong></span>
          </div>

          <!-- Table Container -->
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%;">Page Location (URL)</th>
                  <th style="width: 15%;">Change Frequency</th>
                  <th style="width: 15%;">Search Priority</th>
                  <th style="width: 20%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <!-- If standard urlset -->
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:choose>
                        <xsl:when test="contains(sitemap:loc, '/bn')">
                          <span class="lang-pill lang-bn">BN</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="lang-pill lang-en">EN</span>
                        </xsl:otherwise>
                      </xsl:choose>
                      <a class="loc-link" href="{sitemap:loc}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="badge freq-badge">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <xsl:variable name="p" select="sitemap:priority"/>
                      <span class="badge">
                        <xsl:attribute name="class">
                          <xsl:choose>
                            <xsl:when test="$p &gt;= 0.8">badge priority-high</xsl:when>
                            <xsl:otherwise>badge priority-med</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        ★ <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td style="color: #64748B; font-weight: 600;">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>

                <!-- If sitemapindex -->
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a class="loc-link" href="{sitemap:loc}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="badge freq-badge">daily</span>
                    </td>
                    <td>
                      <span class="badge priority-high">Index</span>
                    </td>
                    <td style="color: #64748B; font-weight: 600;">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="footer">
            <span>© 2026 Home Appliance Care India • Doorstep Multi-Brand Appliance Repair in Kolkata &amp; West Bengal</span>
            <a href="/" target="_blank">Return to Homepage →</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
