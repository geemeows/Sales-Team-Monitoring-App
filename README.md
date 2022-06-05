# Sales Team Performance Monitoring
Check out the deployed app [here](https://d1psv0tw8n43sz.cloudfront.net/)
## Completed Tasks

- [x] Sales team table filter => `req/filter-component`
- [x] Performance page date filter => `req/date-filter`
- [x] Chart edits => `req/chart-edits`
- [x] 404 Not Found page with `ui-router` => `req/not-found-view`
- [x] Cypress installation, and automating scenarios => `bonus/e2e-testing`
- [x] Load More Button => `bonus/load-more-records`
- [x] Creating `build` command => `config/project-infrastructure`

## Project Infrastructure
I have implemented a CI/CD using GitHub Actions, and this pipeline consists of two main jobs: 
 - Build
 - Deploy (Deployed on AWS S3 Bucket, and served via Cloudfront CDN)

### Build Stage
This stage contains 3 main steps:
- Installing dependancies.
- Running tests.
- Building app, and sharing artifacts to next pipeline job. 

### Deploy Stage
This stage contains 3 main steps:
- Getting artifacts from build step
- Sync artifacts to S3 bucket.
- Invalidate previous version of `index.html`, and use the newer version of our bundle.

_\*Using Cloudfront invalidation helps to keep previous versions of our app\*_
