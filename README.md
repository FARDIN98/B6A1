# Differences Between Interfaces and Types in TypeScript

### Basic Difference

**Interface:**
```typescript
interface Person {
    name: string;
    age: number;
}
```

**Type:**
```typescript
type Person = {
    name: string;
    age: number;
};
```

They look similar but have some key differences:

### 1. Extending vs Intersection

**Interface extending (like inheritance):**
```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}
```

**Type intersection:**
```typescript
type Animal = {
    name: string;
}

type Dog = Animal & {
    breed: string;
}
```

### 2. Declaration Merging

**Interfaces can be reopened:**
```typescript
interface User {
    name: string;
}

interface User {
    email: string;
}

// User now has both name and email!
```

**Types can't do this - you get an error:**
```typescript
type User = { name: string; }
type User = { email: string; } // Error!
```

### 3. What Each Can Do

**Types are more flexible - they can represent:**
- Primitive types: `type ID = string;`
- Union types: `type Status = "loading" | "success" | "error";`
- Tuples: `type Coordinates = [number, number];`

**Interfaces are mainly for object shapes:**
```typescript
interface User {
    id: number;
    name: string;
    isActive: boolean;
}
```

### 4. Performance

Interfaces are generally faster for TypeScript to process, especially with large codebases, because they're optimized for object shape checking.



**Use interfaces when:**
- Defining object shapes (like our Product interface)
- Building class-like structures
- Want to extend/merge definitions

**Use types when:**
- Needing union types (like Status above)
- Working with primitives or tuples
- Doing complex type transformations

### Real Example from Our Code

```typescript
// Using interface (what we did):
interface Product {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

// Could also use type:
type Product = {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
};

// Both work the same for this use case!
```

---

## 2. What is the use of `keyof` keyword in TypeScript?

### The Basic Idea

`keyof` gives you the keys of an object type as a union of strings. Here's what it means:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserKeys = keyof User; // "name" | "age" | "email"
```

So `keyof User` becomes the type `"name" | "age" | "email"`. It's like asking TypeScript "what are the property names of this object?"

### Why This is Actually Useful

**Example 1: Making a getProperty function**
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // TypeScript knows this is a string
const age = getProperty(user, "age");   // TypeScript knows this is a number
```

**Example 2: Make sure not to typo property names**
```typescript
function updateUserProperty(user: User, key: keyof User, value: any) {
    user[key] = value;
}

// This works
updateUserProperty(user, "name", "Jane");

// This gives an error - "nmae" doesn't exist!
updateUserProperty(user, "nmae", "Jane");
```

### Real World Example 

Lets assume, building a form and want to make sure field names match data structure:

```typescript
interface Product {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

// Make sure form field names are valid Product properties
type FormField = keyof Product; // "name" | "price" | "quantity" | "discount"

function handleFormField(field: FormField, value: string) {
    // Now I know field is definitely a valid Product property
    console.log(`Updating ${field} with ${value}`);
}
```
`keyof` works with our existing Product interface from the assignment:

```typescript
// earlier code
interface Product {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

// make a function that only accepts valid Product keys
function getProductKey(key: keyof Product): string {
    return key; // This will only accept "name", "price", "quantity", or "discount"
}

getProductKey("name");     // ✓ Works
getProductKey("price");    // ✓ Works  
getProductKey("invalid");  // ✗ Error - TypeScript catches the mistake!
```

### Summary

`keyof` is basically TypeScript's way of letting you work with object property names as types. It's super useful for:
- Making generic functions that work with object properties
- Preventing typos in property names
- Building type-safe utilities that work with objects

Once I started using it, I realized how much safer it makes my code - TypeScript catches so many dumb mistakes I would have made otherwise!
```
