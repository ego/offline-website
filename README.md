<p align="center">
  <a href="https://github.com/ego/offline-website"><img src="assets/logo.png" height="444" alt="offline-website logo"></a>
</p>

# Offline website

Save offline website as an single archive (ZIP, JSON, HTML, TXT, PDF, PNG, MHTML).
Website title will be the folder/archive name.
Nothing special, it just works, just does its job right.
Enjoy!

## To install dependencies:

```bash
bun install --production
```

To run:

```bash
bun dev https://aws.amazon.com
bun dev --verbose https://aws.amazon.com
bun dev --help
```

## Develop amd contributing

This project was created using `bun init` in bun v1.1.34.
[Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

```bash
bun install
```

`Lint`, `format` and `test` code

```bash
bun lint
bun fmt
bun test
```

### Dev tools

- [commander](https://www.npmjs.com/package/commander)
- [commander examples](https://github.com/tj/commander.js/blob/master/examples/alias.js)
- [picocolors](https://github.com/alexeyraspopov/picocolors)
- [prettier plugins](https://github.com/IanVS/prettier-plugin-sort-imports?tab=readme-ov-file)
- [bun executable](https://bun.sh/docs/bundler/executables)
- [playwright ci](https://playwright.dev/docs/ci-intro#setting-up-github-actions)
- [github action-gh-release](https://github.com/softprops/action-gh-release)
- [github actions cache](https://github.com/actions/cache?tab=readme-ov-file)
