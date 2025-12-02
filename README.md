# টাইপস্ক্রিপ্টে Interface vs Type এর পার্থক্য

## Interface vs Type নিয়ে আমি যা শিখলাম

টাইপস্ক্রিপ্ট শিখতে গিয়ে `interface` vs `type` নিয়ে কনফিউজড হয়েছিলাম। এখন যা বুঝলাম:

### মূল পার্থক্য

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

দেখতে একই রকম মনে হয়, কিন্তু কিছু গুরুত্বপূর্ণ পার্থক্য আছে:

### ১. এক্সটেন্ড করা vs ইন্টারসেকশন

**Interface Extend করা (উত্তরাধিকারের মতো):**
```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}
```

**Type ইন্টারসেকশন:**
```typescript
type Animal = {
    name: string;
}

type Dog = Animal & {
    breed: string;
}
```

### ২. ডিক্লারেশন মার্জিং

**Interface রি-ওপেন করা যায়:**
```typescript
interface User {
    name: string;
}

interface User {
    email: string;
}

// User now has both name and email!
```

**Type এটা করতে পারে না - এরর দেয়:**
```typescript
type User = { name: string; }
type User = { email: string; } // Error!
```

### ৩. কোনটা কী করতে পারে

**Type বেশি ফ্লেক্সিবল - এটা দিয়ে করা যায়:**
- প্রিমিটিভ টাইপ: `type ID = string;`
- ইউনিয়ন টাইপ: `type Status = "loading" | "success" | "error";`
- টাপল: `type Coordinates = [number, number];`

**Interface মূলত অবজেক্ট শেপের জন্য:**
```typescript
interface User {
    id: number;
    name: string;
    isActive: boolean;
}
```

### ৪. পারফরম্যান্স

Interface সাধারণত TypeScript এর জন্য ফাস্টার, বিশেষ করে বড় প্রোজেক্টে, কারণ এগুলো অবজেক্ট শেপ চেকিং এর জন্য অপটিমাইজড।

### আমি কখন কোনটা ব্যবহার করি

**আমি interface ব্যবহার করি যখন:**
- অবজেক্ট শেপ ডিফাইন করতে (আমাদের Product interface এর মতো)
- ক্লাস-লাইক স্ট্রাকচার বিল্ড করতে
- এক্সটেন্ড/মার্জ করতে চাই

**আমি type ব্যবহার করি যখন:**
- ইউনিয়ন টাইপ লাগে (উপরের Status এর মতো)
- প্রিমিটিভ বা টাপল নিয়ে কাজ করি
- কমপ্লেক্স টাইপ ট্রান্সফরমেশন করি

### আমাদের কোডের রিয়েল উদাহরণ

```typescript
// Interface used (what we did):
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

## ২. `keyof` কী এবং এটা দিয়ে কী করা যায়?

### মূল ধারণা

`keyof` কোনো অবজেক্ট টাইপের কীগুলোকে স্ট্রিং ইউনিয়ন হিসেবে দেয়। কী মানে?

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserKeys = keyof User; // "name" | "age" | "email"
```

তো `keyof User` হয়ে গেল `"name" | "age" | "email"` টাইপ। মানে TypeScript কে জিজ্ঞেস করা "এই অবজেক্টের প্রপার্টি নামগুলো কী?"

### এটা দিয়ে কী করা যায়

প্রথমে মনে হতেই পারে "ঠিক আছে, কিন্তু এটা দিয়ে কী করব?" কিছু উদাহরণ দেখি:

**উদাহরণ ১: getProperty ফাংশন বানানো**
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // TypeScript knows this is string
const age = getProperty(user, "age");   // TypeScript knows this is number
```

**উদাহরণ ২: টাইপো ঠেকানো**
```typescript
function updateUserProperty(user: User, key: keyof User, value: any) {
    user[key] = value;
}

// This works
updateUserProperty(user, "name", "Jane");

// This gives an error - "nmae" doesn't exist!
updateUserProperty(user, "nmae", "Jane");
```

### রিয়েল লাইফ উদাহরণ

আমি একটা ফর্ম বানাচ্ছি এবং চাই আমার ফিল্ড নাম ডাটা স্ট্রাকচারের সাথে মিলুক:

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

### কুল পার্ট

`keyof` আমাদের অ্যাসাইনমেন্টের Product interface এর সাথেও কাজ করে:

```typescript
// From our previous code
interface Product {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

// I can make a function that only accepts valid Product keys
function getProductKey(key: keyof Product): string {
    return key; // This will only accept "name", "price", "quantity", or "discount"
}

getProductKey("name");     // ✓ Works
getProductKey("price");    // ✓ Works  
getProductKey("invalid");  // ✗ Error - TypeScript catches the mistake!
```

### সারাংশ

`keyof` মূলত TypeScript এর উপায় যেন আপনি অবজেক্ট প্রপার্টি নামগুলো টাইপ হিসেবে ব্যবহার করতে পারেন। এটা সুপার কাজের:
- জেনেরিক ফাংশন বানাতে যা অবজেক্ট প্রপার্টি নিয়ে কাজ করে
- টাইপো ঠেকাতে
- টাইপ-সেফফ ইউটিলিটি বানাতে যা অবজেক্ট নিয়ে কাজ করে

