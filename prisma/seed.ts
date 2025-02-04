import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userIds = [
  'user_2sZHzi3YaB7rQ96GYZLxFzu2ohA',
  'user_2sOlLEREtn8GCYKpb4HARGxAg5u'
];

const titles = [
  'The Great Gatsby',
  'To Kill a Mockingbird',
  '1984',
  'Pride and Prejudice',
  'Moby Dick',
  'War and Peace',
  'The Catcher in the Rye',
  'The Hobbit',
  'Fahrenheit 451',
  'Brave New World'
];

const statuses = ['reading', 'completed', 'plan'];

const authors = [
  'F. Scott Fitzgerald',
  'Harper Lee',
  'George Orwell',
  'Jane Austen',
  'Herman Melville',
  'Leo Tolstoy',
  'J.D. Salinger',
  'J.R.R. Tolkien',
  'Ray Bradbury',
  'Aldous Huxley'
];

async function main() {
  const books = Array.from({ length: 50 }).map(() => {
    const userID = userIds[Math.floor(Math.random() * userIds.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const pageCount = Math.floor(Math.random() * 500) + 50; // 50～549ページ
    const currentPage = Math.floor(Math.random() * pageCount); // currentPageはpageCount以下

    return {
      userID,
      title,
      author,
      status,
      pageCount,
      currentPage
    };
  });

  await prisma.book.createMany({ data: books });
  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
