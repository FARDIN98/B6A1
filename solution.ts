function formatValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        return value * 10;
    } else if (typeof value === 'boolean') {
        return !value;
    }
    return value;
}


function getLength(value: string | any[]): number {
    if (typeof value === "string") {
        return value.length
    }
    if (Array.isArray(value)) {
        return value.length
    }
    return 0
}


class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return '\'Name: ' + this.name + ', Age: ' + this.age + '\'';
    }
}


function filterByRating(items: { title: string; rating: number }[]): { title: string; rating: number }[] {
    const result: { title: string; rating: number }[] = [];
    
    for (let i = 0; i < items.length; i++) {
        if (items[i].rating >= 4) {
            result.push(items[i]);
        }
    }
    
    return result;
}


function filterActiveUsers(users: { id: number; name: string; email: string; isActive: boolean }[]): { id: number; name: string; email: string; isActive: boolean }[] {
    const activeUsers: { id: number; name: string; email: string; isActive: boolean }[] = [];
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].isActive === true) {
            activeUsers.push(users[i]);
        }
    }
    
    return activeUsers;
}


interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

function printBookDetails(book: Book): void {
    const availableText = book.isAvailable ? "Yes" : "No";
    console.log("Title: " + book.title + ", Author: " + book.author + ", Published: " + book.publishedYear + ", Available: " + availableText);
}


function getUniqueValues(arr1: (string | number)[], arr2: (string | number)[]): (string | number)[] {
    let result: (string | number)[] = [];
    let resultLength = 0;
    
    for (let i = 0; i < arr1.length; i++) {
        let found = false;
        for (let j = 0; j < resultLength; j++) {
            if (arr1[i] === result[j]) {
                found = true;
                break;
            }
        }
        if (found == false) {
            result[resultLength] = arr1[i];
            resultLength = resultLength + 1;
        }
    }
    
    for (let i = 0; i < arr2.length; i++) {
        let found = false;
        for (let j = 0; j < resultLength; j++) {
            if (arr2[i] === result[j]) {
                found = true;
                break;
            }
        }
        if (found == false) {
            result[resultLength] = arr2[i];
            resultLength = resultLength + 1;
        }
    }
    
    return result;
}

function calculateTotalPrice(products: { name: string; price: number; quantity: number; discount?: number }[]): number {
    if (products.length === 0) {
        return 0;
    }
    
    const total = products.reduce((sum, product) => {
        const subtotal = product.price * product.quantity;
        
        if (product.discount) {
            const discountAmount = subtotal * (product.discount / 100);
            return sum + (subtotal - discountAmount);
        } else {
            return sum + subtotal;
        }
    }, 0);
    
    return total;
}









