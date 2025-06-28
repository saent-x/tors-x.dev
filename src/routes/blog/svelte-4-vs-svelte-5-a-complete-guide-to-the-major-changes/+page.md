---
title: 'Svelte 4 vs 5: A Complete Guide to the Major Changes'
description: "Explore the key differences between Svelte 4 and Svelte 5, including runes, new reactivity system, and breaking changes with practical code examples."
date: '2025-05-15'
readingTime: 10
category: 'Svelte'
featured: true
---

# Svelte 4 vs Svelte 5: A Complete Guide to the Major Changes

Svelte 5 represents a significant evolution in the Svelte ecosystem, introducing a fundamentally new reactivity system and several breaking changes that modernize the framework. While Svelte 4 served developers well with its compile-time optimizations and intuitive syntax, Svelte 5 takes reactivity to the next level with runes and improved performance characteristics.

## The Reactivity Revolution: From Variables to Runes

The most significant change in Svelte 5 is the introduction of **runes** - a new way to handle reactivity that replaces the traditional variable-based system.

### Svelte 4: Traditional Reactivity

```javascript
<script>
  let count = 0;
  let doubled = count * 2;
  
  function increment() {
    count += 1;
  }
  
  // Reactive statement
  $: doubled = count * 2;
  $: console.log('Count changed:', count);
</script>

<button on:click={increment}>
  Count: {count}, Doubled: {doubled}
</button>
```

### Svelte 5: Runes-Based Reactivity

```javascript
<script>
  import { $state, $derived } from 'svelte';
  
  let count = $state(0);
  let doubled = $derived(() => count * 2);
  
  function increment() {
    count += 1;
  }
  
  // Effect (replaces reactive statements)
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<button onclick={increment}>
  Count: {count}, Doubled: {doubled}
</button>
```

## Key Runes in Svelte 5

### `$state` - Reactive State Management

The `$state` rune replaces simple reactive variables and provides better performance and debugging capabilities.

```javascript
// Svelte 4
let user = { name: 'John', age: 30 };
let items = ['apple', 'banana'];

// Svelte 5
let user = $state({ name: 'John', age: 30 });
let items = $state(['apple', 'banana']);

// Deep reactivity works automatically
function updateUser() {
  user.age += 1; // This triggers reactivity
  items.push('orange'); // This also triggers reactivity
}
```

### `$derived` - Computed Values

The `$derived` rune replaces reactive statements (`$:`) for computed values.

```javascript
// Svelte 4
let firstName = 'John';
let lastName = 'Doe';
$: fullName = `${firstName} ${lastName}`;
$: initials = `${firstName[0]}${lastName[0]}`;

// Svelte 5
let firstName = $state('John');
let lastName = $state('Doe');
let fullName = $derived(() => `${firstName} ${lastName}`);
let initials = $derived(() => `${firstName[0]}${lastName[0]}`);
```

### `$effect` - Side Effects

The `$effect` rune replaces reactive statements that perform side effects.

```javascript
// Svelte 4
let theme = 'light';
$: {
  document.body.className = theme;
}

// Svelte 5
let theme = $state('light');
$effect(() => {
  document.body.className = theme;
});
```

## Props and Binding Changes

### Component Props

Svelte 5 introduces the `$props` rune for handling component properties.

```javascript
<!-- Svelte 4 -->
<script>
  export let title;
  export let count = 0;
  export let items = [];
</script>

<!-- Svelte 5 -->
<script>
  let { title, count = 0, items = [] } = $props();
</script>
```

### Two-Way Binding

The binding syntax has been updated to use `bind:` more consistently.

```javascript
<!-- Svelte 4 -->
<Child bind:value />

<!-- Svelte 5 -->
<Child bind:value />
<!-- Still works, but the internal implementation is different -->
```

## Event Handling Updates

Event handling syntax has been modernized in Svelte 5.

```javascript
<!-- Svelte 4 -->
<button on:click={handleClick}>Click me</button>
<input on:input={handleInput} />

<!-- Svelte 5 -->
<button onclick={handleClick}>Click me</button>
<input oninput={handleInput} />
```

## Stores Evolution

While Svelte stores still work in Svelte 5, the new runes system provides better alternatives for most use cases.

### Svelte 4: Store-Heavy Approach

```javascript
// store.js
import { writable, derived } from 'svelte/store';

export const count = writable(0);
export const doubled = derived(count, $count => $count * 2);

// Component.svelte
<script>
  import { count, doubled } from './store.js';
  
  function increment() {
    count.update(n => n + 1);
  }
</script>

<p>Count: {$count}</p>
<p>Doubled: {$doubled}</p>
```

### Svelte 5: Runes-First Approach

```javascript
// state.js
import { $state, $derived } from 'svelte';

function createCounter() {
  let count = $state(0);
  let doubled = $derived(() => count * 2);
  
  return {
    get count() { return count; },
    get doubled() { return doubled; },
    increment: () => count += 1
  };
}

export const counter = createCounter();

// Component.svelte
<script>
  import { counter } from './state.js';
</script>

<p>Count: {counter.count}</p>
<p>Doubled: {counter.doubled}</p>
```

## Performance Improvements

Svelte 5's new reactivity system offers several performance benefits:

### Finer-Grained Reactivity

```javascript
// Svelte 4: Entire component re-runs when user changes
let user = { name: 'John', age: 30, email: 'john@example.com' };

// Svelte 5: Only affected parts update
let user = $state({ name: 'John', age: 30, email: 'john@example.com' });

// Changing user.age only updates components that depend on age
```

### Better Memory Management

```javascript
// Svelte 5 automatically handles cleanup
$effect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Cleanup happens automatically when effect is destroyed
  return () => clearInterval(interval);
});
```

## Migration Considerations

### Breaking Changes

1. **Reactive statements**: `$:` statements need to be converted to `$derived` or `$effect`
2. **Event handlers**: `on:` syntax changes to standard DOM event names
3. **Props**: `export let` changes to `$props()` destructuring
4. **Stores**: While still supported, runes are preferred for new code

### Gradual Migration Strategy

```javascript
// You can mix Svelte 4 and 5 patterns during migration
<script>
  // Legacy Svelte 4 style
  export let legacyProp;
  let oldCount = 0;
  $: oldDoubled = oldCount * 2;
  
  // New Svelte 5 style
  let newCount = $state(0);
  let newDoubled = $derived(() => newCount * 2);
</script>
```

## When to Upgrade

**Upgrade to Svelte 5 if you:**
- Want better performance and memory usage
- Need finer-grained reactivity control
- Are starting a new project
- Want to future-proof your codebase

**Stick with Svelte 4 if you:**
- Have a large existing codebase that's working well
- Need time to plan a migration strategy
- Rely heavily on third-party libraries that haven't updated yet

## Conclusion

Svelte 5 represents a major step forward in the framework's evolution. The new runes system provides more predictable reactivity, better performance, and improved developer experience. While the migration requires some effort, the benefits of finer-grained reactivity and improved performance make it worthwhile for most projects.

The transition from Svelte 4 to 5 is more than just a version bump - it's a paradigm shift that brings Svelte closer to modern reactive programming patterns while maintaining the simplicity and performance that made it popular in the first place.