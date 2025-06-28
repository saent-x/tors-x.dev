---
title: 'Advanced TypeScript Patterns for Better Code Quality'
description: 'Discover advanced TypeScript patterns that will help you write more maintainable and type-safe code.'
date: '2024-01-05'
readingTime: 10
category: 'TypeScript'
---

TypeScript isn't just JavaScript with types sprinkled on top. It's a powerful tool that can catch bugs before they happen and make your code more self-documenting. Let's dive into the patterns that will level up your TypeScript game.

## Smart Type Checking with Conditional Types

Ever wanted your types to be smarter? Conditional types let you create types that adapt based on what you pass in.

```typescript
type ApiResponse<T> = T extends string
  ? { message: T; status: 'success' | 'error' }
  : { data: T; status: 'success'; timestamp: number };
```

Here's how it works in practice:

```typescript
// For objects, you get a data wrapper
type UserResponse = ApiResponse<{ id: number; name: string }>;
// Result: { data: { id: number; name: string }; status: 'success'; timestamp: number }

// For strings, you get a message wrapper
type ErrorResponse = ApiResponse<string>;
// Result: { message: string; status: 'success' | 'error' }
```

## Template Literal Types: String Manipulation at the Type Level

You can actually manipulate strings in TypeScript's type system. It's like having a mini programming language just for types.

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiVersion = 'v1' | 'v2' | 'v3';
type ResourceType = 'users' | 'posts' | 'comments';

type ApiEndpoint<V, R, M> = `${M} /api/${V}/${R}`;
```

This creates type-safe API endpoints:

```typescript
type UserEndpoints = 
  | ApiEndpoint<'v1', 'users', 'GET'>    // "GET /api/v1/users"
  | ApiEndpoint<'v1', 'users', 'POST'>   // "POST /api/v1/users"
  | ApiEndpoint<'v2', 'users', 'PUT'>;   // "PUT /api/v2/users"
```

Want to convert snake_case to camelCase automatically?

```typescript
type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
  : S;

type SnakeToCamel<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K];
};
```

```typescript
interface ApiUser {
  user_id: number;
  first_name: string;
  email_address: string;
}

type CamelCaseUser = SnakeToCamel<ApiUser>;
// Result: { userId: number; firstName: string; emailAddress: string }
```

## Practical Generic Utilities

### Making Some Fields Optional

Sometimes you need to make only certain fields optional, not the whole object:

```typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserUpdate = PartialBy<User, 'password'>;
// Result: { id: number; name: string; email: string; password?: string }
```

### Type-Safe Form Validation

Create validation rules that match your data structure perfectly:

```typescript
type ValidationRule<T> = {
  required?: boolean;
  min?: T extends string | number ? number : never;
  max?: T extends string | number ? number : never;
  pattern?: T extends string ? RegExp : never;
};

type FormValidation<T> = {
  [K in keyof T]: ValidationRule<T[K]>;
};
```

```typescript
const userValidation: FormValidation<User> = {
  id: { required: true, min: 1 },
  name: { required: true, min: 2, max: 50 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, min: 8 }
};
```

## Error Handling That Actually Works

Instead of throwing exceptions everywhere, use a Result type to handle errors gracefully:

```typescript
abstract class Result<T, E = Error> {
  abstract isSuccess(): this is Success<T, E>;
  abstract isFailure(): this is Failure<T, E>;
  abstract map<U>(fn: (value: T) => U): Result<U, E>;
  
  static success<T>(value: T): Result<T, Error> {
    return new Success(value);
  }
  
  static failure<T>(error: Error): Result<T, Error> {
    return new Failure(error);
  }
}
```

```typescript
class Success<T, E = Error> extends Result<T, E> {
  constructor(private value: T) { super(); }
  
  isSuccess(): this is Success<T, E> { return true; }
  isFailure(): this is Failure<T, E> { return false; }
  
  map<U>(fn: (value: T) => U): Result<U, E> {
    try {
      return Result.success(fn(this.value));
    } catch (error) {
      return Result.failure(error as E);
    }
  }
  
  getValue(): T { return this.value; }
}
```

```typescript
class Failure<T, E = Error> extends Result<T, E> {
  constructor(private error: E) { super(); }
  
  isSuccess(): this is Success<T, E> { return false; }
  isFailure(): this is Failure<T, E> { return true; }
  
  map<U>(_fn: (value: T) => U): Result<U, E> {
    return Result.failure(this.error);
  }
  
  getError(): E { return this.error; }
}
```

Now you can chain operations safely:

```typescript
const fetchUser = async (id: number): Promise<Result<User, string>> => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return Result.failure(`HTTP ${response.status}`);
    }
    const user = await response.json();
    return Result.success(user);
  } catch (error) {
    return Result.failure(`Network error: ${error.message}`);
  }
};
```

```typescript
const processUser = async (id: number) => {
  const result = await fetchUser(id);
  
  if (result.isSuccess()) {
    const user = result.getValue();
    console.log('Got user:', user.name);
  } else {
    console.error('Failed:', result.getError());
  }
};
```

## Null-Safe Operations with Option Types

Handle nullable values without the constant null checks:

```typescript
abstract class Option<T> {
  abstract isSome(): this is Some<T>;
  abstract isNone(): this is None<T>;
  abstract map<U>(fn: (value: T) => U): Option<U>;
  abstract getOrElse(defaultValue: T): T;
  
  static some<T>(value: T): Option<T> {
    return new Some(value);
  }
  
  static none<T>(): Option<T> {
    return new None<T>();
  }
  
  static fromNullable<T>(value: T | null | undefined): Option<T> {
    return value != null ? Option.some(value) : Option.none();
  }
}
```

```typescript
class Some<T> extends Option<T> {
  constructor(private value: T) { super(); }
  
  isSome(): this is Some<T> { return true; }
  isNone(): this is None<T> { return false; }
  
  map<U>(fn: (value: T) => U): Option<U> {
    return Option.some(fn(this.value));
  }
  
  getOrElse(_defaultValue: T): T {
    return this.value;
  }
}
```

```typescript
class None<T> extends Option<T> {
  isSome(): this is Some<T> { return false; }
  isNone(): this is None<T> { return true; }
  
  map<U>(_fn: (value: T) => U): Option<U> {
    return Option.none();
  }
  
  getOrElse(defaultValue: T): T {
    return defaultValue;
  }
}
```

Use it like this:

```typescript
const findUserById = (users: User[], id: number): Option<User> => {
  const user = users.find(u => u.id === id);
  return Option.fromNullable(user);
};

const getUserName = (users: User[], id: number): string => {
  return findUserById(users, id)
    .map(user => user.name)
    .getOrElse('Unknown User');
};
```

## Type-Safe Builder Pattern

Force the correct order of operations at compile time:

```typescript
class UserBuilder {
  private user: Partial<User> = {};

  setId(id: number): UserWithId {
    return new UserWithId({ ...this.user, id });
  }
}

class UserWithId {
  constructor(private user: Partial<User> & { id: number }) {}

  setName(name: string): UserWithIdAndName {
    return new UserWithIdAndName({ ...this.user, name });
  }
}
```

```typescript
class UserWithIdAndName {
  constructor(private user: Partial<User> & { id: number; name: string }) {}

  setEmail(email: string): CompleteUser {
    return new CompleteUser({ ...this.user, email });
  }
}

class CompleteUser {
  constructor(private user: Omit<User, 'password'>) {}

  setPassword(password: string): this {
    (this.user as User).password = password;
    return this;
  }

  build(): User {
    return this.user as User;
  }
}
```

Usage is enforced by TypeScript:

```typescript
const user = new UserBuilder()
  .setId(1)           // Must be first
  .setName('John')    // Must be second
  .setEmail('john@example.com')  // Must be third
  .setPassword('secret')         // Optional
  .build();
```

## Deep Object Manipulation

Sometimes you need to work with nested objects:

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]>
    : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
```

## Key Takeaways

These patterns help you:

- **Catch errors early** - Types catch bugs at compile time, not runtime
- **Self-document code** - Types tell you exactly what functions expect
- **Build safer APIs** - Impossible states become impossible to represent
- **Get better IDE support** - Autocomplete and refactoring just work

Start with the simpler patterns like `PartialBy` and conditional types. Once you're comfortable, move on to Result types and Option types for better error handling. The builder pattern is great for complex object creation.

Remember: advanced doesn't always mean better. Use these patterns when they solve real problems, not just because they're cool. Your future self (and your teammates) will thank you for writing clear, type-safe code that prevents bugs before they happen.
