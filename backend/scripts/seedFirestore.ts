import fs from 'fs-extra';
import { globby } from 'globby';
import { db } from './firebase';// make sure you create this file

const readJsonFiles = async (pattern: string) => {
  const files = await globby(pattern);
  const data = await Promise.all(
    files.map(async (filePath) => {
      const contents = await fs.readJson(filePath);
      const id = contents.id; // use the ID from the JSON itself
      return { id, data: contents };
    })
  );
  return data;
};

const main = async () => {
  console.log("🟡 Current working directory:", process.cwd());
  const majors = await readJsonFiles('./data/majors/*.json');
  const minors = await readJsonFiles('./data/minors/*.json');
  const courses = await readJsonFiles('./data/courses/*/*.json');
  console.log(`📘 Majors:`, majors.map(m => m.id));
  console.log(`📗 Minors:`, minors.map(m => m.id));
  console.log(`📙 Courses:`, courses.map(c => c.id));

  for (const major of majors) {
    try {
      await db.collection('majors').doc(major.id).set(major.data);
      console.log(`✅ Uploaded major: ${major.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload major: ${major.id}`, err);
    }
  }

  for (const minor of minors) {
    try {
      await db.collection('minors').doc(minor.id).set(minor.data);
      console.log(`✅ Uploaded minor: ${minor.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload minor: ${minor.id}`, err);
    }
  }

  for (const course of courses) {
    try {
      await db.collection('courses').doc(course.id).set(course.data);
      console.log(`✅ Uploaded course: ${course.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload course: ${course.id}`, err);
    }
  }
};

main().catch((err) => {
  console.error('Unexpected error:', err);
});