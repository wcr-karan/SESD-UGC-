import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api/products';

async function runTests() {
    console.log('--- Starting API Verification ---');

    // 1. Create Product 1
    console.log('\n[1] Creating Product 1 (Laptop)...');
    const p1 = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "MacBook Pro",
            description: "High-end laptop",
            price: 1999,
            category: "Electronics",
            stock: 50,
            sku: "MBP-2023"
        })
    }).then(r => r.json());
    console.log('Result:', p1);

    // 2. Create Product 2
    console.log('\n[2] Creating Product 2 (Phone)...');
    const p2 = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "iPhone 15",
            description: "Latest smartphone",
            price: 999,
            category: "Electronics",
            stock: 100,
            sku: "IPH-15"
        })
    }).then(r => r.json());
    console.log('Result:', p2);

    // 3. List Products
    console.log('\n[3] Listing Products...');
    const list = await fetch(BASE_URL).then(r => r.json());
    console.log(`Found ${(list as any).total} products`);
    console.log('Data:', (list as any).data);

    if ((list as any).total < 2) {
        console.error('ERROR: Expected at least 2 products');
    }

    // 4. Update Product
    if ((p1 as any)._id) {
        console.log('\n[4] Updating Product 1 Price...');
        const updated = await fetch(`${BASE_URL}/${(p1 as any)._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: 1899 })
        }).then(r => r.json());
        console.log('Updated Result:', updated);
    }

    // 5. Delete Product
    if ((p2 as any)._id) {
        console.log('\n[5] Deleting Product 2...');
        const deleted = await fetch(`${BASE_URL}/${(p2 as any)._id}`, { method: 'DELETE' }).then(r => r.json());
        console.log('Delete Result:', deleted);
    }

    // 6. Verify Final Count
    console.log('\n[6] Verifying Final Count...');
    const finalList = await fetch(BASE_URL).then(r => r.json());
    console.log(`Final Count: ${(finalList as any).total}`);

    console.log('--- API Verification Complete ---');
}

// Wait for server to start roughly
setTimeout(runTests, 2000);
