## Lexical Playground With Pokemon!!

This application is an pokemon extension of Facebook's Lexical Editor. Specifically, this project is forked from [Lexical Playground Demo](https://github.com/facebook/lexical/tree/a4f064bee63b7f6257a89ffc519551d081da44d1/packages/lexical-playground).

## Installation and Setup Instructions

#### Example:

Download the provided zip file. You will need `node` and `npm` installed globally on your machine.

Installation:

```
npm install
```

To Start Server:

```
npm run dev
```

To Visit App:

```
http://localhost:5173/
```

To Access Pokemon Images:

```
Type in `//pokemon` into the text editor
```

## Functionality

Satisfies following project requirements:

1. Show a rich text editor
2. Fetch first 151 Pokemon on page load
3. Add Lexical Decorator Node to insert Pokemon image alongside their name
4. Add Lexical Plugin to give users ability to insert new node

## New Code Written

The following code has been developed to extend Facebook's Lexical Playground to support Pokemon extensions:

1. PokemonNode.tsx
2. PokemonDropdown.tsx
3. fetchPokemonData.tsx
4. usePokemon.tsx

## Trade Offs

In general, this project optimizes for functionality
over user experience and performance. For example, I intentionally chose to prioritize functionality over improving the CSS styling or make performance improvements such as infinite scrolling given the limited time frame of this project.

If I had more time, I would have fixed the known issues and implemented the quick technical improvements discussed below. I also discuss follow up steps necessary to productionize this application below.

## Known Issues

1. Current line is replaced with a Pokemon image + name rather than a Pokemon image + name being appended to the current line.
2. Text cursor is not in focus after Pokemon image shown on screen
3. Pokemon image not styled in line with pokemon name
4. Console warnings regarding `importJSON` and `exportJSON` should be resolved


## Quick Technical Improvements

1. Improved User Experience: Listing available pokemons could be an option on the dropdown rendered from `/` instead of a separate dropdown
2. Testing: Each component should have individual unit tests
   1. `fetchPokemonData` and `usePokemon` should have unit tests using `react-testing-library` and `jest`
   1. `pokemonDropdown` should have Storybooking in addition to unit tests
3. Graceful Error Handling: Implement an `ErrorBoundary` that renders a fallback component rather than throwing frontend errors.
4. Styling :
   1. Mobile-first resopnse design: Taking into consideration different media formats such as phone & tablet users rather than just desktop users in our css files.
   2. Migrating from `css` to `styled components` because `styled components` better ecapsulates styling logic and improves styling readability.

## Productionize Steps

1. Frontend Performance Optimizations
   1. Infinite Scrolling: Load paginated data lazily in batches once users scroll to the bottom of the dropdown. This could optimize for frontend metrics such as `First Meaningful Paint`.
   1. Code Splitting & Lazy Loading: Uncommonly used rich-text features such as GIF and Image uploaders that are expensive to run could be lazily loaded into our application. 
   1. Caching: Utilizing CDNs deployed globally to cache frontend assets closer to customers. CDNs are valuable to cache pokemon images to serve these quicker to customers.
2. Observability
   1. Metrics: Implement analytics to keep track how often users are utilizing the Pokemon dropdown and what Pokemon are being chosen the most often. This enables performance optimizations such as fetching the common pokemon users first. Tools such as `Amplitude` and `Pendo` may solve this use case.
   2. Error Handling: All frontend errors should be piped into error handling software. This enables alerting automation to notify teams when errors are spiking and be proactively fixing incidents. Tools such as `Sentry` may solve this use case.
3. Accessibility: Pokemon dropdown should satisfy WCAG 2.0 accessibility guidelines.
   1. The placeholer text in the `Select` does not satisfy color contrast guidelines
4. Internationalization
   1. Supporting internationalization is important to scale this feature to a global audience. Libraries such as `i18next` may solve thise use case
