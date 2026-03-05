const { connectToDb, getBooksCollection } = require('./db');

async function seed() {
  try {
    await connectToDb();
    const booksCol = await getBooksCollection();

    const sampleBooks = [
      {
        title: 'JavaScript Essentials',
        author: 'John Smith',
        category: 'Programming',
        price: 450,
        rating: 4.5,
        year: 2023,
      },
      {
        title: 'MongoDB Basics',
        author: 'Alice Brown',
        category: 'Database',
        price: 380,
        rating: 4.2,
        year: 2022,
      },
      {
        title: 'Advanced Node.js',
        author: 'Daniel Green',
        category: 'Programming',
        price: 520,
        rating: 4.7,
        year: 2024,
      },
      {
        title: 'Web Development with HTML & CSS',
        author: 'Emma White',
        category: 'Programming',
        price: 300,
        rating: 3.9,
        year: 2021,
      },
      {
        title: 'Data Structures in JavaScript',
        author: 'Ravi Kumar',
        category: 'Programming',
        price: 410,
        rating: 4.1,
        year: 2020,
      },
      {
        title: 'NoSQL Databases Explained',
        author: 'Maria Garcia',
        category: 'Database',
        price: 430,
        rating: 4.0,
        year: 2023,
      },
      {
        title: 'Science of Everyday Things',
        author: 'Liam Wilson',
        category: 'Science',
        price: 280,
        rating: 4.3,
        year: 2019,
      },
      {
        title: 'Fictional Realities',
        author: 'Sophia Davis',
        category: 'Fiction',
        price: 350,
        rating: 4.6,
        year: 2018,
      },
    ];

    const existingCount = await booksCol.countDocuments();
    if (existingCount === 0) {
      const result = await booksCol.insertMany(sampleBooks);
      console.log(`Inserted ${result.insertedCount} sample books.`);
    } else {
      console.log(
        `Books collection already has ${existingCount} document(s); skipping seed.`
      );
    }
  } catch (err) {
    console.error('Failed to seed books', err);
  } finally {
    process.exit(0);
  }
}

seed();

