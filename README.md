# takemymoney

## Local Development

- `npm install netlify-cli -g`
- `netlify link`
- `npm run netlify`
- Open <http://localhost:8888/>

### Creating your Beeminder test client

- Go to your [account settings](https://www.beeminder.com/settings/account)
- At the bottom of the page, click "Register a new app"
- Name it something like `bm_tmm_dev`
- Use `http://localhost:8888` as the redirect and post-deauthorize callback urls
- Copy the client ID into your `.env.local` file
