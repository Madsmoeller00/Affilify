# Affiliate Program Aggregator Project Documentation

## 1. Project Overview

You are building a website that consolidates affiliate program data from multiple networks (e.g., Adtraction, Daisycon, Partner-Ads, SmartResponse, Impact, etc.). The site will fetch each network's program details—advertiser names, commission rates, category names, EPC, etc.—and display them in a unified interface that allows users to easily browse and compare different affiliate opportunities.

Bear in mind that the data is not always available in the same format or structure, and you will need to handle this.

### 1.1 Key Objectives

**Aggregated Directory**  
Provide a single directory of affiliate programs from various networks.

**Search & Filtering**  
Enable searching, filtering, and sorting of programs (by category, commission rate, etc.).

**Automated Data Fetching**  
Automate data refresh and updates to ensure accuracy and reduce manual effort.

**Scalable Integration**  
Allow easy addition of new affiliate networks without major refactoring.

**User-Friendly Front End**  
Use Next.js (with React) for a modern, fast, and responsive UI; style with Tailwind CSS; write TypeScript for safety and maintainability.

## 2. High-Level Requirements

Below are the core functionalities that must be implemented:

### API & Data Feed Integration

- Network APIs: Connect to affiliate networks (Adtraction, Daisycon, Partner-Ads, SmartResponse, Impact, etc.) via their respective APIs or feeds.
- Data Extraction: Parse JSON or XML (using libraries like xml2js in Node.js) to extract relevant details (program name, advertiser, commission rate, EPC, etc.).
- Scalability: Provide a simple mechanism to add new affiliate networks.

### Data Normalization & Storage

- Consistent Schema: Convert incoming data to a standardized format (e.g., programName, commissionRate, networkName, category, etc.).
- Database: Use a preferred database (SQL or NoSQL).
- Upsert Logic: Use create-or-update (upsert) to prevent duplicating entries when affiliate programs change.

### Data Refresh & Scheduling

- Automated Updates: Use cron jobs, scheduled Node scripts, or hosted solutions (e.g., serverless cron) to refresh data (daily, hourly, etc.).
- Error Handling: Log errors and handle third-party API failures gracefully.

### Backend & API Layer

- Next.js API Routes: Expose endpoints (e.g., /api/programs) to provide consolidated data.
- Search & Filters: Support queries like GET /api/programs?category=travel&sort=commissionRate.
- Pagination: Enable pagination parameters (page, limit) to handle large data sets.

### Front-End Display (Next.js Pages)

- Responsive UI: Implement with Tailwind CSS for a mobile-first approach.
- Performance: Use Next.js optimizations (SSR, SSG) and caching to keep load times fast.
- Design: Provide a clear and intuitive layout so users can quickly locate relevant programs.

### Security & Compliance

- API Key Management: Keep affiliate network keys secure in environment variables (@env.local) or secret vaults.
- HTTPS: Serve the site over SSL.
- Respect Terms: Comply with affiliate networks' usage restrictions.

### Deployment & Maintenance

- Infrastructure: Deploy to a hosting provider (e.g., Vercel, AWS, etc.) that supports Node.js and Next.js.
- Monitoring: Track uptime and performance (logging, error tracking tools).
- Ongoing Updates: Adapt to API changes and maintain security patches.

## 3. Detailed Requirements

### 3.1 Data Fetching & Integration

**Obtain API Keys**

- Sign up for each affiliate network.
- Retrieve your API credentials or data feed URLs (e.g., ADTRACTION_API_KEY=123abc, DAISYCON_API_KEY=456xyz, etc.).

**Configure Credentials**

- Store Keys Securely (e.g., .env file or environment variables in the hosting platform).
- Never commit .env files or credentials to public version control.

**Fetch Data from Various Sources**

- Adtraction & Daisycon: Typically JSON via REST endpoints.
- Partner-Ads: Offers an XML data feed, requiring an XML parser (e.g., xml2js).
- SmartResponse/Impact: Often require OAuth 2.0 or Bearer tokens.
- Error Handling: Use retry strategies or logs when encountering rate limits (429) or server errors (5xx).

#### 3.1.1 Example API Request (Adtraction)

**Request:**
```bash
GET https://api.adtraction.com/programs?apiKey=123abc
Headers: 
  Accept: application/json
```

**Response (pseudo JSON):**
```json
[
  {
    "programName": "Shop A",
    "commissionRate": 10.0,
    "category": "Fashion",
    "epc": 2.5
  }
]
```

#### 3.1.2 Example XML Data (Partner-Ads)

Feed URL: https://partner-ads.com/feed.xml?key=999

**Response (pseudo XML):**
```xml
<programs>
  <program>
    <programName>Shop B</programName>
    <commissionRate>8.5</commissionRate>
    <epc>1.2</epc>
    <category>Travel</category>
  </program>
</programs>
```

### 3.2 Data Normalization & Storage

**Consistent Field Names**

Standardize fields (e.g., programName, advertiserName, commissionRate, networkName, category, epc, lastUpdated).

**Upsert Logic**

- Implement create-or-update logic in your Node.js scripts or ORM (e.g., Prisma, TypeORM, or Mongoose).
- If a program from network X already exists, update it; otherwise, insert a new record.

**Database Schema (Example)**

Collection/Table: Program
- id (primary key)
- programName (string)
- advertiserName (string)
- commissionRate (float)
- networkName (string)
- category (string)
- categoryMapping (string)
- epc (float, optional)
- lastUpdated (date/timestamp, auto-updated)

CategoryMapping is a string that maps the category to a more specific category. For example, "Fashion" could be mapped to "Clothing" or "Shoes". See below for a list of mappings.
# Home, Garden & DIY
- **Covers**:
  - Home, Garden & Interior
  - Construction & Garden
  - Home & Interior
  - Living, House & Garden
  - Home & Utility

# Automotive & Transportation
- **Covers**:
  - Car, Motorcycle, Cycling & Boat
  - Car & Motor
  - Cars & Motorbikes 
  - Automotive

# Sports and Outdoor
- **Covers**:
  - Sport & Fitness 
  - Outdoor, Nature & Animals
  - Sport & Outdoor

# Clothing, Fashion & Accessories
- **Covers**:
  - Clothing & Accessories
  - Fashion & Lifestyle
  - Fashion

# Baby, Kids & Parenting
- **Covers**:
  - Baby, Children & Teenagers
  - Children & Family
  - Parenting

# Electronics & Technology
- **Covers**:
  - Computer & Electronics
  - Electronics & Technology
  - Consumer Electronics
  - Telephony & Internet
  - Streaming, Apps & Mobile
  - Telecom

# Entertainment, Media & Gaming
- **Covers**:
  - Music & Film
  - Home Entertainment
  - Games & Esports
  - Media & Telecom

# Food, Drinks & Hospitality
- **Covers**:
  - Food, Drinks & Party
  - Food & Drinks

# Sport, Health & Beauty
- **Covers**:
  - Health & Personal Care
  - Health & Beauty
  - Sports, Beauty & Health

# Dating & Adult
- **Covers**:
  - Dating
  - Games & Dating
  - Erotic & Sex
  - Adult

# Travel & Experiences
- **Covers**:
  - Vacation & Experiences
  - Travel & Accommodation
  - Travel & Leisure

# Work & Education
- **Covers**:
  - Job, Education & Development
  - Work & Education

# Books, Literature & Art
- **Covers**:
  - Books & Art
  - Books, Magazines & Newspapers
  - Books, Literature & Media

# Finance & Insurance
- **Covers**:
  - Money & Insurance
  - Banking & Finance
  - Insurance & Unemployment Fund
  - Insurance & Pension
  - Loans
  - Microloans
  - Crypto
  - Finance

# Business-to-Business
- **Covers**:
  - Business-to-Business

# Shopping & Gifts
- **Covers**:
  - Shopping & Gifts
  - Gifts & Flowers
  - Daily Deals & Auctions
  - Retail & Shopping

# Surveys & Market Research
- **Covers**:
  - Surveys
  - Research panels & Surveys

# Non-Profit & Charity
- **Covers**:
  - Non Profit & Charity

# Energy & Utilities
- **Covers**:
  - Energy

# Sustainability & Environment
- **Covers**:
  - Sustainable

# Raffles and Competitions
- **Covers**:
  - LEADshare / LEADreward
  - OrderFeed
  - Competitions
  - Lotteries & Gambling
  - Gambling

# Others
- If not in the list, use the category "Others"

### 3.3 Data Refresh & Scheduling

**Cron Job Frequency**

- Schedule a Node script using cron in your hosting environment or a serverless scheduler.
- Example: Daily at midnight to fetch from all networks.

**Error Handling**

- Log all fetch attempts and outcomes.
- If a fetch fails, either retry or queue for manual review.

### 3.4 Backend & API Layer (Next.js)

**Next.js API Routes**

- Define endpoints under pages/api/ (e.g., pages/api/programs.ts) to return consolidated data.
- These routes can handle filters, sorting, and pagination.

**Query Parameters**

Examples:
- GET /api/programs?networkName=Adtraction
- GET /api/programs?category=Travel
- GET /api/programs?commissionRateMin=5
- GET /api/programs?sort=-commissionRate

**Pagination**

- Use query parameters: ?page=1&limit=20
- Return metadata (total count, total pages, etc.) in the response.

**Search & Filter**

- By programName, advertiserName, category, networkName, etc.
- Sorting by commissionRate, programName, advertiserName, category.

**Authentication (Optional)**

- If certain endpoints need protection, integrate NextAuth or another JWT-based approach.
- Keep read endpoints public, if that's acceptable for your use case.

### 3.5 Front-End Requirements (Next.js + Tailwind CSS)

**Responsive Layout**

- Use Tailwind CSS to quickly develop a mobile-friendly, scalable design.
- Emphasize clarity and quick scanning of key info (commission rate, advertiser, etc.).

**Filtering & Sorting UI**

- Provide dropdowns or toggles for category, network, etc.
- Provide sort controls for commission rate or alphabetical ordering.

**Program Detail View (Optional)**

- If needed, create a dynamic route (e.g., pages/programs/[id].tsx) to show details about a single program.

**Performance**

- Leverage Next.js optimizations: static generation (SSG), server-side rendering (SSR), or client-side fetch as appropriate.
- Use pagination to limit how much data is shown at once.

### 3.6 Security & Compliance

**API Key Management**

- Store affiliate network keys in .env or environment variables.
- Never expose them to client-side code.

**HTTPS**

- Enforce secure connections in production (e.g., Vercel automatically provides HTTPS).

**Respect Affiliate Terms**

- Follow each network's guidelines on how data is displayed or used.
- Some might require disclaimers or restrict certain usage.

### 3.7 Deployment & Maintenance

**Infrastructure**

- Deploy on Vercel (recommended for Next.js) or other Node-friendly host.
- Configure environment variables through hosting dashboards.

**Monitoring & Error Tracking**

- Use logging/monitoring solutions (Sentry, Datadog, or equivalent) to capture runtime errors.

**Ongoing Updates**

- Update the fetch logic if a network changes its API endpoints or data structure.
- Maintain security patches (Node.js, npm packages).

## 5. Example Documentation Snippets

### 5.1 Data Fetching Example (Partner-Ads) – Pseudo Code

```javascript
// fetchPartnerAds.ts
import axios from 'axios';
import xml2js from 'xml2js';
import { upsertProgram } from './upsertProgram';

export async function fetchPartnerAds() {
  const url = "https://partner-ads.com/feed.xml?key=999";
  const response = await axios.get(url);
  const parsedXml = await xml2js.parseStringPromise(response.data);

  // Navigate XML structure (pseudo)
  const programs = parsedXml.programs.program;
  for (const item of programs) {
    const programName = item.programName[0];
    const commissionRate = parseFloat(item.commissionRate[0]);
    const epc = parseFloat(item.epc[0]);
    const category = item.category[0];

    upsertProgram({
      programName,
      advertiserName: 'N/A', // If not in feed
      commissionRate,
      networkName: 'Partner-Ads',
      category,
      epc
    });
  }
}
```

### 5.2 Upsert Logic Example (Pseudo Code)

```javascript
// upsertProgram.ts
import { prismaClient } from '../prisma'; // or any DB client

export async function upsertProgram({
  programName,
  advertiserName,
  commissionRate,
  networkName,
  category,
  epc
}) {
  // Insert or update in the DB
  return await prismaClient.program.upsert({
    where: {
      programName_networkName: {
        programName,
        networkName
      }
    },
    update: {
      advertiserName,
      commissionRate,
      category,
      epc,
      lastUpdated: new Date()
    },
    create: {
      programName,
      advertiserName,
      commissionRate,
      networkName,
      category,
      epc
    }
  });
}
```

### 5.3 API Example for Listing Programs (Next.js API Route)

```javascript
// pages/api/programs.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category, sort, page = 1, limit = 20 } = req.query;
    // Construct your DB query, apply filters, sorting, etc.
    // ...
    // Return the result as JSON
    res.status(200).json(programs);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

## 6. Roadmap & Milestones

### Phase 1: Prototype

- Implement minimal Next.js site.
- Integrate one network's data (e.g., Partner-Ads).
- Basic UI to display fetched programs.

### Phase 2: Multi-Network Integration

- Add additional APIs (Adtraction, Daisycon, Impact, etc.).
- Refine data normalization and error handling.

### Phase 3: Front-End Enhancements

- Add advanced filters and sorting.
- Improve Tailwind-based styling and ensure mobile responsiveness.

### Phase 4: Automation & Deployment

- Set up scheduled tasks (cron or serverless schedule) to fetch data regularly.
- Deploy to production (Vercel or other Node.js environment) with logs and monitoring.

### Phase 5: Optimization & Next Steps

- Implement caching (in-memory, Redis, etc.) for popular queries.
- Possibly add user accounts for favoriting/saving programs.
- Introduce analytics or reporting tools.

## 7. Future Features

### Quick wins (High impact, low effort)
- Add a filter to the top of the page that allows users to filter programs by category and network.
- The programs on the front page should be sorted by most popular first.
- Every program should have a link to the advertiser's website. (linkbuilding)
- Every program should have their own page with more information

### Big projects (High impact, high effort)
- Add a login page that allows users to mark the categories or programs they are interested in and get a notification when a new program is added that matches their interests.
- Consider adding landingpages for programs that are not yet available in an affiliate network (leadgeneration)
- Add a browser extension that pops up when visited a website that has an affiliate program and allows users to save programs to their account. Should have the option to add the site to a wishlist.
- A possibility for an affiliate to add their website to the site and get a notification when a new program is added that matches their website.
- a feature that allows users to search for a keyword and get a list of programs that match the keyword. Use an embedding model to find the most relevant programs. https://platform.openai.com/docs/guides/embeddings/

### Fill in jobs (low impact, low effort)
- Add a page that allows users to compare programs side by side.

### Thankless tasks (Low impact, high effort) 