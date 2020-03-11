# Yadoms mockup 2k20

The `dest` directory contains the generated previews.

If you want to modify them, you need to rebuild them with the gulp tasks.

## Development environment

First you need `nodejs`

To generate the previews, I recommend the `yarn` tool, instead of `npm`.

```
npm install -g yarn@berry
```

After installing `yarn`, you have to install all devDependencies present in `package.json`.

```
yarn install
```

Then you can run `gulp` to launch the Dev environment :

* watcher
* livereload

with this command

```
yarn run gulp
```

It will open your browser with the `dest/index.html`.