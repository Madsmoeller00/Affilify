# SmartResponse API Documentation

This is the documentation for the SmartResponse API. It is based on the official documentation from SmartResponse and will therefore use general terms and concepts.

1. Overview

### Introduction

The SmartResponse API allows affiliates to interact programmatically with the SmartResponse platform to access campaign data, track performance, and manage settings. This documentation covers the most important aspects of the API.

To use the API, you need an account with SmartResponse. You can find your unique API token in your SmartResponse account under Settings > API Access.

For additional questions or support, contact support at support@smartresponse-media.com.

2. Authentication

### API URL

The base URL for all API endpoints is:

```
https://login.smartresponse-media.com/affiliates/api/
```

### Authentication Token

SmartResponse requires an API token to authenticate requests. Pass your API token in the Authorization header as follows:

```
Authorization: Bearer YOUR_API_TOKEN
```

### Required Headers

* Authorization: Your API token
* Content-Type: Specifies the format of the data sent to SmartResponse (application/json)
* Accept: Specifies the format of the data returned by SmartResponse (application/json)

### Example Header

```
Authorization: Bearer 1234567890abcdef
Content-Type: application/json
Accept: application/json
```

3. General Notes

### Encoding

All strings passed to and from the SmartResponse API must be UTF-8 encoded.

### SSL

All requests to the API must be made over HTTPS.

### Date Format

SmartResponse uses ISO 8601 for all date and time values. Dates are expressed in UTC (Coordinated Universal Time). Example:

```
2025-01-18T12:34:56Z
```

### Rate Limiting

The API imposes rate limits to ensure system stability. Response headers include information about your rate limit:

* X-RateLimit-Limit: Maximum allowed requests per minute
* X-RateLimit-Remaining: Remaining requests in the current window
* X-RateLimit-Reset: Time when the rate limit resets, in UTC epoch seconds

If you exceed the limit, the API will return a 429 Too Many Requests error.

4. API Endpoints

4.1 Campaigns

#### Retrieve Campaign List

Retrieve a list of available campaigns.
`GET /campaigns`

##### Parameters

* page (optional): The page number for paginated results. Default: 1.
* limit (optional): Number of results per page. Default: 50.

##### Example Request (Node.js)

```javascript
const axios = require('axios');

axios.get('https://login.smartresponse-media.com/affiliates/api/campaigns', {
  headers: {
    Authorization: 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
```

##### Response Attributes

* id (integer): Unique identifier for the campaign
* name (string): Campaign name
* status (string): Campaign status (e.g., "active")
* payout (float): Commission payout per action
* currency (string): Payout currency
* url (string): Tracking URL for the campaign

##### Example Response Body

```json
[
  {
    "id": 101,
    "name": "Campaign A",
    "status": "active",
    "payout": 5.0,
    "currency": "USD",
    "url": "https://tracking.smartresponse.com/redirect?id=101"
  },
  {
    "id": 102,
    "name": "Campaign B",
    "status": "inactive",
    "payout": 3.5,
    "currency": "EUR",
    "url": "https://tracking.smartresponse.com/redirect?id=102"
  }
]
```

4.2 Reports

#### Retrieve Performance Data

Retrieve performance data for your campaigns.
`GET /reports/performance`

##### Parameters

* startDate (string): Start date for the report (YYYY-MM-DD)
* endDate (string): End date for the report (YYYY-MM-DD)
* campaignId (optional): Filter by specific campaign ID

##### Example Request (Node.js)

```javascript
const axios = require('axios');

axios.get('https://login.smartresponse-media.com/affiliates/api/reports/performance', {
  params: {
    startDate: '2025-01-01',
    endDate: '2025-01-15'
  },
  headers: {
    Authorization: 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
```

##### Response Attributes

* date (string): Date of the record
* impressions (integer): Number of impressions
* clicks (integer): Number of clicks
* conversions (integer): Number of conversions
* payout (float): Total payout
* currency (string): Payout currency

##### Example Response Body

```json
[
  {
    "date": "2025-01-01",
    "impressions": 1000,
    "clicks": 200,
    "conversions": 15,
    "payout": 75.0,
    "currency": "USD"
  },
  {
    "date": "2025-01-02",
    "impressions": 1200,
    "clicks": 250,
    "conversions": 20,
    "payout": 100.0,
    "currency": "USD"
  }
]
```

5. Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request.

| Status Code | Description |
|------------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

6. Rate Limits

Each API endpoint is subject to rate limits. The rate limit resets every minute. If the limit is exceeded, the API returns a 429 Too Many Requests error.

7. Additional Information

For more detailed documentation, visit the official API documentation at:
SmartResponse API Documentation