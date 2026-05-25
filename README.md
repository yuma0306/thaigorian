# Learn Thai

まずは自分の学習に使えるのが目標、フレーズの管理は一旦Jsonで管理

## ページ構成

### ホームページ

- シチュエーション別のカード一覧が並ぶ

### シチュエーション詳細

- フレーズ一カード一覧が並ぶ
- カード内容：タイ語フレーズ、日本語訳、単語解説、音声マーククリックで読み上げ
- スタートボタン

### レッスンページ

- フレーズの文だけカウント表示（1/20など）
- 日本語訳を表示して、フレーズを打たせる
- タイ文字でフレーズを打って一致したら自動で進む
- 最後まで進んだら結果画面

### 結果画面

- カード一覧に正解・不正解の印をつけて一覧表示
- 戻るボタンでシチュエーション詳細ページに戻る

## 開発

```sh
cp .env.example .env
# MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY を設定

npm install
npm run dev
```

---

# sv (旧 SvelteKit テンプレート・参考)

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --add prettier eslint --install npm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
