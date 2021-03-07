# Yadoms mockup 2k21

The `dist` directory contains the generated previews.

If you want to modify them, you need to rebuild them with the gulp tasks.

## Development environment

### Installation : 

First you need `nodejs`

Install all devDependencies present in `package.json`
```
npm install
```

Then launch

```
npm run dev
```

to have the development environment (watcher, livereload, ...)

To build the source then delete `dist` and launch

```
npm run build
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
