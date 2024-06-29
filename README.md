# Telegram bot in Cloudflare worker

Run your telegram bot free on cloudflare workers by using the power of [Hono](https://hono.dev/) and
[grammY](https://grammy.dev/)

--- [Telegram bot in Cloudflare worker](#telegram-bot-in-cloudflare-worker)

- [Telegram bot in Cloudflare worker](#telegram-bot-in-cloudflare-worker)
  - [Run your bot](#run-your-bot)
    - [Create an account in cloudflare](#create-an-account-in-cloudflare)
    - [Clone the project](#clone-the-project)
    - [Configuration `wrangler.toml` file:](#configuration-wranglertoml-file)
    - [Deploy your bot](#deploy-your-bot)
    - [Set the webhook](#set-the-webhook)
    - [Done](#done)
  - [Attention](#attention)
    - [Please do not change the below files if you do not have any idea of what they are](#please-do-not-change-the-below-files-if-you-do-not-have-any-idea-of-what-they-are)
    - [You access the `process.env` just in the:](#you-access-the-processenv-just-in-the)
  - [Add new bot instructions](#add-new-bot-instructions)
  - [Default routes](#default-routes)
  - [Adding new routes](#adding-new-routes)
  - [Contact me?](#contact-me)

## Run your bot

### Create an account in cloudflare

You can create your free account in cloudflare > [Register an account](https://www.cloudflare.com/products/registrar)

### Clone the project

first you need to clone the this project:

```bash
git clone https://github.com/dinno7/telegram-bot-cloudflare.git
```

```bash
cd telegram-bot-cloudflare
```

### Configuration `wrangler.toml` file:

> Open the `wrangler.toml` file and:

1. Set your personal project name instead of `YOUR_APP_NAME_IN_CLOUDFLARE`
2. Create a bot from [BotFather](https://t.me/BotFather) and get the bot token, put it instead of
   `YOU_TELEGRAM_BOT_TOKEN`
3. Generate hex random bytes(32-bit is enough) and put it instead of `TELEGRAM_SECRET_TOKEN_BYTES`

   This is for detecting telegram requests and it must be unique and secure, you can use nodejs to generate bytes by
   this piece of code:

   ```javascript
   require('crypto').randomBytes(32).toString('hex');
   ```

   Or do it with Python:

   ```python
   import os;os.urandom(32).hex()
   ```

4. You can also add another env variables and use them in your app.

### Deploy your bot

After configuration your app, you must deploy it by below command:

```bash
npm run deploy
```

### Set the webhook

After deploying your app, you must set the webhook, so:

1. Go to your cloudflare account and `Workers & Pages > Overview` section of your dashboard
2. Select the worker whose name we set in the previous step
3. Click on the `View` button on the top right to open the deployed worker address
4. Click on `WebHook management` link in the opened page
5. Paste your bot token inside the input and click on Set webhook button
6. You should see success message in new open page

### Done

Your bot is ready, just go to your bot and send `/start` command

## Attention

### Please do not change the below files if you do not have any idea of what they are

- /src/index.ts
- /src/bot/index.ts
- /src/bot/handle-errors.ts

---

### You access the `process.env` just in the:

- Hono controllers
- `injectBotInstructions` function inside the `/src/bot/instructions.ts`
- Add your envirement variables inside the `wrangle.toml` and also in the `Env` interface inside the
  `/src/types/index.ts` to get autocompletion

## Add new bot instructions

For adding new instructions you just need add your instructions in the injectBotInstructions function inside the
`/src/bot/instructions.ts` file.

> For more detail, read [grammY](https://grammy.dev) document

## Default routes

You have the below routes as default for managing your telegram webhook:

- Home page: \<WORKER_ORIGIN\>
- Webhook management page: \<WORKER_ORIGIN\>/webhook
- Setting webhook route: \<WORKER_ORIGIN\>/webhook/set/\<YOUR_BOT_TOKEN\>
- Deleting webhook route: \<WORKER_ORIGIN\>/webhook/del/\<YOUR_BOT_TOKEN\>

## Adding new routes

According to the existing example(the webhook stuff) you can add your new routes easy inside the `/src/api` directory:

- Add your controller functions in `/src/api/controllers`
- Add your routes in `/src/api/routes`
- Finally add declared route in `/src/api/index.ts`

## Contact me?

If you have any question, you can send me DM in Telegram:

[![Telegram](https://img.shields.io/badge/Telegram-26A5E4.svg?logo=telegram&logoColor=white)](https://t.me/tahadlrb7)
