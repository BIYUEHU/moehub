<!-- markdownlint-disable -->

<div align="center">
<img src="https://github.com/BIYUEHU/moehub/raw/master/packages/client/public/favicon.png" alt="logo"/>

# MoeHub

[![wakatime](https://wakatime.com/badge/user/018dc603-712a-4205-a226-d4c9ccd0d02b/project/ff5d1027-c718-48ed-af29-678da4bdce35.svg)](https://wakatime.com/badge/user/018dc603-712a-4205-a226-d4c9ccd0d02b/project/ff5d1027-c718-48ed-af29-678da4bdce35)
[![Build](https://github.com/BIYUEHU/moehub/actions/workflows/build.yml/badge.svg)](https://github.com/BIYUEHU/moehub/actions/workflows/build.yml)

⚡ A open source personal favorite character collection website system ⚡

⚡ 壹個開源的個人向喜愛角色收藏網站系統 ⚡

![](https://github.com/BIYUEHU/moehub/raw/master/packages/data/screenboot-0.png)

</div>

## Details

### Supports types

- [x] Anime characters
- [x] Manga/Comic characters
- [x] Game characters
- [x] Galgame/Visual Novel characters
- [x] Light novel characters
- [x] Other characters

Only supports **Japanese** characters, moehub doesn't support and welcome characters of other languages,especially
Z(C)hinese characters.

### International

- [x] Japan - Japanese (Default language)
- [x] American - English
- [x] Taiwan/Hongkong - Traditional Chinese
- [x] Zhina - Simplified Chinese (Will be deleted in the future)

### Cli commands

![](https://github.com/BIYUEHU/moehub/raw/master/packages/data/screenboot-1.png)

- `help [...command]` Get command help information
- `pwd` Reset password in force when you forget your password
- `data` Get statistics data
- `character [name]` Get all or some characters's information

### Characters birthdays reminder

![](https://github.com/BIYUEHU/moehub/raw/master/packages/data/screenboot-2.png)

Supports custom email template, receiver and any email accounts.

> Need you to set configurations (refer to the next content)

## Example

> [👉 There](https://m.hotaru.icu)

## Usage

1. Download release version from [Github Release](https://github.com/biyuehu/moehub/releases)

2. Extract the downloaded file

3. Install dependencies (Choose one)

```bash
npm install
yarn
pnpm install
```

4. Set your `.env` config and database


```ini
DATABASE_URL="mysql://username:password@host:port/database"

# MoeHub server port

PORT=5000

# MoeHub logger level

LOG_LEVEL=30
```

5. Import `data.sql` into your database

6. Start the server (Choose one)

```bash
npm run serve
yarn serve
pnpm serve
```

7. Login and set your website at `http://your-domain:5000/#/admin/settings` (Such as website title, name, address,
email key and more...)

## Stacks

- Frontend: React, tailwind-css, @kotori-bot/i18n
- Backend: Node.js, Koa.js, Prisma, @kotori-bot/core
- Database: Mysql
- CI/CD: Github Actions
- Code Style: BiomeJs
- Version Control: Git, GitHub
- Project Management: pnpm workspace
