# Adtraction API Documentation
This is the documentation for the Adtraction API. It is based on the official documentation from Adtraction, and will therefore use general terms and concepts.

1.  Overview
# Adtraction API v2

## Introduction
This is the full documentation for the Adtraction API, **version 2**.

In order to access the API, you need an account with Adtraction. You can pick up your unique API token by logging in to your Adtraction account and navigating to Account > Settings.

The documentation is interactive; calls can be made to all documented endpoints within the browser without the need to write any code.

Certain endpoints have been deprecated. In such cases, please use **API version 3** instead.

If you have any questions regarding the API, feel free to contact support@adtraction.com.

2. Authentication
## API URL
The base url for all API endpoints is https://api.adtraction.net/v2/

## Useful Links
* API status
* Adtraction.com

## General Notes

### Encoding
Every string passed to and from the Adtraction API needs to be UTF-8 encoded.

### SSL
We require that all requests are done over SSL.

### Date Format
The Adtraction tracking server is running on Stockholm time. All dates are in ISO 8601 format expressed as UTC (Coordinated Universal Time). Time zones are represented as an offset from UTC. Example: `2019-07-16T14:45:15+0200`

## Header Parameters

### X-Token
Defines the request API token. This will be used to determine privileges and visibility for the request.

### content-type
Defines the format of data sent to Adtraction. Adtraction accepts JSON.  
Example: `content-type: application/json`

### accept
Defines the format of data received from Adtraction. Adtraction supports JSON.  
Example: `accept: application/json`

## Pagination
Certain endpoints will generate large result sets. To save bandwidth and long processing times, these endpoints will paginate the results to reduce the strain on both client and server.

Any endpoint that supports pagination will return 3 attributes to support this:
* `count` - the total number of results available
* `pageSize` - the number of results per page to return
* `page` - the number of the page to return. The first page in the response is number 0.. |

3. API Endpoints
3.1. Programs Endpoints
3.1.1. Partner/Markets/List Markets
Adtraction offers partner programs on several geographical markets.
This endpoint lists the markets on which Adtraction offers partner programs.
## GET https://api.adtraction.com/v2/partner/markets/

### Parameters

* **token** (String)  
  Your Adtraction API token  
  Example: `E0E6BF3556DB0D83C8B401EBACBD6F1B0670633E`

### Request Example (Node.js)

```javascript
var request = require('request');

request({
  method: 'GET',
  url: 'https://api.adtraction.com/v2/partner/markets/?token=',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
```

### Response Attributes

Each object in the response array contains:

* **market** (string)  
  ISO 3166-1 Alpha-2 country code  
  Example: `"SE"`

* **marketName** (string)  
  Market name  
  Example: `"Sweden"`

* **marketId** (number)  
  Numerical Adtraction ID of the market  
  Example: `12`

### Response Headers
* `X-RateLimit-Limit: 30`
* `X-RateLimit-Remaining: 29`
* `X-RateLimit-Reset: 1565602012124`
* `Content-Type: application/json;charset=UTF-8`
* `Transfer-Encoding: chunked`
* `Date: Mon, 12 Aug 2019 09:25:52 GMT`
* `Connection: close`

### Example Response Body

```json
[
  {
    "market": "SE",
    "marketName": "Sweden", 
    "marketId": 12
  }
]
```
3.1.2. Partner/Program Directory/Retrieve Program Directory
This endpoint lists all programs with their associated category.
## GET https://api.adtraction.com/v2/partner/programs/directory/marketId/categoryId

### Parameters

* **marketId** (Number)  
  Numerical ID of a geographical market  
  Example: `12`

* **categoryId** (Number)  
  Numerical ID of the category  
  Example: `1`

* **token** (String)  
  Your Adtraction API token  
  Example: `E0E6BF3556DB0D83C8B401EBACBD6F1B0670633E`

### Request Example (Node.js)

```javascript
var request = require('request');

request({
  method: 'GET',
  url: 'https://api.adtraction.com/v2/partner/programs/directory/{marketId}/{categoryId}?token=',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
```

### Response Attributes

* **categoryId** (number)  
  Numerical ID of the category  
  Example: `1`

* **categoryName** (string)  
  Name of the category  
  Example: `"Banking & Finance"`

* **logoUrl** (string)  
  URL of the advertiser logo image file  
  Example: `"https://adtraction.com/image.htm?imgId=56807831"`

* **market** (string)  
  Geographical market on which a partner program is available, defined by an ISO 3166-1 Alpha-2 country code  
  Example: `"SE"`

* **programId** (number)  
  Numerical ID of the partner program  
  Example: `23959067`

* **programName** (string)  
  Name of a partner program  
  Example: `"Ferratum SE"`

* **programUrl** (string)  
  Main URL for a partner program  
  Example: `"https://www.ferratum.se"`

### Response Headers
* `X-RateLimit-Limit: 30`
* `X-RateLimit-Remaining: 29`
* `X-RateLimit-Reset: 1565602012124`
* `Content-Type: application/json;charset=UTF-8`
* `Transfer-Encoding: chunked`
* `Date: Mon, 12 Aug 2019 09:25:52 GMT`
* `Connection: close`

### Example Response Body

```json
{
  "categoryId": 1,
  "categoryName": "Banking & Finance",
  "logoUrl": "https://adtraction.com/image.htm?imgId=56807831",
  "market": "SE",
  "programId": 23959067,
  "programName": "Ferratum SE",
  "programUrl": "https://www.ferratum.se"
}
```
3.2. Request Format

3.3. Response Format
## Response Codes and Statuses

| Code | Status | Description |
|------|---------|-------------|
| 200 | OK | The request has succeeded. |
| 201 | Created | The request has been fulfilled and resulted in a new resource being created. |
| 204 | No content | The server successfully processed the request, but is not returning any content. |
| 400 | Bad request | The request could not be understood by the server due to malformed syntax. |
| 401 | Unauthorized | The request requires user authentication. |
| 403 | Forbidden | The server understood the request, but user is not authorized to perform the operation. |
| 404 | Not found | The server has not found anything matching the Request-URI. |
| 409 | Conflict | The request could not be completed due to a conflict with the current state of the resource. |
| 415 | Unsupported media type | The request entity has a media type which the server or resource does not support. |
| 429 | Too many requests | Your are making too many requests and are being rate limited. |
| 500 | Internal server error | The server encountered an unexpected condition which prevented it from fulfilling the request. |
3.4. Market IDs
[List available market IDs and their meanings]

4. Rate Limits
The API endpoints are rate limited by a quota per minute.
On each request the remaining quota is decreased. If the remaining quota is less than zero, the status code 429 will be returned with a message containing the time remaining until reset.
Each endpoint response includes header parameters with information about its limit, remaining requests and reset time. Example:
```
Status: 200 OK
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 29
X-RateLimit-Reset: 1561967218095
```
| Header name | Description |
|-------------|-------------|
| X-RateLimit-Limit | The maximum number of requests you're permitted to make per minute. |
| X-RateLimit-Remaining | The number of requests remaining in the current rate limit window. |
| X-RateLimit-Reset | The time at which the current rate limit window resets in UTC epoch seconds

5. Examples
# Partner/Program Directory/Retrieve Program Directory

## GET https://api.adtraction.com/v2/partner/programs/directory/12/4

### Example Request
```
GET https://api.adtraction.com/v2/partner/programs/directory/12/4?token=E4DD25FE7319740C62A212487CEF7B37DF9DF9F7
```

### Notes
* Console calls are routed via Apiary
* Use browser

### URI Parameters
* marketId
* categoryId
* token

### Response Headers
```
content-type: application/json
x-ratelimit-limit: 30
x-ratelimit-remaining: 28
x-ratelimit-reset: 1736872784074
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
cache-control: no-cache, no-store, max-age=0, must-revalidate
pragma: no-cache
expires: 0
strict-transport-security: max-age=31536000 ; includesubdomains
x-frame-options: deny
access-control-allow-origin: *
access-control-allow-methods: options,get,head,post,put,delete,trace,connect
access-control-expose-headers:
access-control-max-age: 10
date: tue, 14 jan 2025 16:38:58 gmt
content-length: 11117
connection: keep-alive
akamai-grn: 0.6cc83017.1736872737.1a8296b6
transfer-encoding: chunked
```

### Example Production Request
```
GET https://private-anon-dcba6d6b35-adtractionapi.apiary-proxy.com/v2/partner/programs/directory/12/4?token=E4DD25FE7319740C62A212487CEF7B37DF9DF9F7
```

### Response Status
- 200 OK

6. Additional Information
```

## Authentication
The Adtraction API requires authentication using an API token. The token should be included in the request headers as:
```
X-Token: YOUR_API_KEY
```

Additional required headers:
```
Content-Type: application/json
Accept: application/json
```

## Base URL
The base URL for all API requests is:
```
https://api.adtraction.com/v2
```

## Key Endpoints

### Get Markets
```
GET /affiliate/markets
```
Returns a list of all available markets with their IDs.

### Get Programs
```
GET /affiliate/programs?market=DK
```
Returns a list of all programs for a specific market. The response includes:
- Program details
- Commission rates
- Program URLs
- Logo URLs
- Categories
- Market information

### Response Format
Programs response includes the following fields:
```typescript
{
  programId: number;
  programName: string;
  programURL?: string;
  market: string;
  currency?: string;
  feed?: boolean;
  pendingActive?: boolean;
  cookieDuration?: number;
  logoURL?: string;
  categoryName: string;
  commissions?: Array<{
    value: number;
    id: number;
    name: string;
    transactionType: number;
    type: string;
  }>;
}
```

## Rate Limits
The API includes rate limiting headers in responses:
- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time until rate limit resets

## Market IDs
Known market IDs:
- Denmark (DK): 12