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

After installing `yarn`, you have to install all devDependencies present in `package.json`.

```
yarn install
```

Then launch

```
yarn dev
```

to have the development environment (watcher, livereload, ...)

To build the source then delete `dist` and launch

```
yarn build
```

## Theme mode

By default, the application is in a theme corresponding to your OS preferences.

In order to preview the different themes of the application, you have to write in the console of the browser :

```
Yadoms.lightOn() // to get the light mode
```

or

```
Yadoms.lightOff() // to get the dark mode
```
