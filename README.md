<!-- markdownlint-disable -->

<div align="center">
<img src="./packages/client/public/favicon.png" alt="logo"/>

# MoeHub

⚡ A open source personal favorite character collection website system ⚡

⚡ 壹個開源的個人向喜愛角色收藏網站系統 ⚡

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

![](https://pic.imgdb.cn/item/66bd8160d9c307b7e9eb0016.png)

- `help [...command]` Get command help information
- `pwd` Reset password in force when you forget your password
- `data` Get statistics data
- `character [name]` Get all or some characters's information

### Characters birthdays reminder

![](https://pic.imgdb.cn/item/66bd8160d9c307b7e9eaff64.png)

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
