<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Appliance Seva</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #1e2926;
            background: #f7f9f8;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
            border: 1px solid #e2e8e5;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #146C5B 0%, #0c4338 100%);
            color: #ffffff;
            padding: 32px 36px;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            color: #d1fae5;
            line-height: 1.5;
          }
          .stats-bar {
            background: #f0fdf4;
            border-bottom: 1px solid #bbf7d0;
            padding: 14px 36px;
            font-size: 13px;
            font-weight: 700;
            color: #166534;
            display: flex;
            align-items: center;
            justifyContent: space-between;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background: #f8fafc;
            color: #475569;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 14px 20px;
            text-align: left;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 20px;
            font-size: 13px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tr:nth-child(even) td {
            background: #fbfdfc;
          }
          tr:hover td {
            background: #f0fdf4;
          }
          a {
            color: #146C5B;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
            color: #0c4338;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            background: #e2e8f0;
            color: #334155;
          }
          .priority-high {
            background: #dcfce7;
            color: #15803d;
          }
          .priority-med {
            background: #fef3c7;
            color: #b45309;
          }
          .footer {
            padding: 20px 36px;
            font-size: 12px;
            color: #64748b;
            text-align: center;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap • Appliance Seva</h1>
            <p>
              This is a standard XML Sitemap indexed for Google Search Console, Bing, and AI search engines.<br/>
              Formatted for human viewing via XSLT stylesheet.
            </p>
          </div>
          <div class="stats-bar">
            <span>Total URLs Indexed: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
            <span>Domain: https://www.applianceseva.com</span>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 55%;">URL Location</th>
                <th style="width: 15%;">Change Frequency</th>
                <th style="width: 15%;">Priority</th>
                <th style="width: 15%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="badge">
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
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td style="color: #64748b; font-size: 12px;">
                    <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer">
            Generated dynamically for Appliance Seva • Doorstep Home Appliance Repair in Kolkata &amp; West Bengal
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
