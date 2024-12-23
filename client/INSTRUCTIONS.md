# Instructions

### What you **shouldn't** touch
1. `node modules` - where packages are installed.
2. `index.html` - It's a boilterplate. In react we target the virtual DOM
3. `package.json` and `package-lock.json` - *unless* you want to add your own personal scripts or nagkaroon ng git conflict.
4. `eslint.config.js`
5. `vite.config.js`

### What are inside these folders?
1. `public` - where media files are stored, they are not compiled by react itself and just directly inserts it into the site.
2. `src` - all coding shenanigans
  - `src/api` - source code to fetch data from the server
  - `src/assets` - all media files that are compiled by react like graphical designs and more.
  - `src/components` - all react components.
  - `src/pages` - where all webpages are routed.

