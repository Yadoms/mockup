# Yadoms mockup 2k20

The `dest` directory contains the generated previews.

If you want to modify them, you need to rebuild them with the gulp tasks.

## Development environment

First you need `nodejs`

To generate the previews, I recommend the `yarn` tool, instead of `npm`.

```
npm install -g yarn
```

Then you have to set yarn to last version for the current project (mockup)

```
cd mockup
yarn policies set-version berry # below v1.22
yarn set version berry          # on v1.22+
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

If you want just to preview the mockup run :

```
yarn run gulp preview
```


## Theme mode

By default, the application is in a theme corresponding to your OS preferences.

In order to preview the different themes of the application, you have to write in the console of the browser :

```
yadoms.lightOn() // to get the light mode
```

or

```
yadoms.lightOff() // to get the dark mode
```