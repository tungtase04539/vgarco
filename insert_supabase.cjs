// Insert projects into Supabase (authenticated) with Cloudinary URLs
const {createClient} = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  'https://chqzzfumbjgznmkdbxat.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocXp6ZnVtYmpnem5ta2RieGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjc3OTUsImV4cCI6MjA4ODYwMzc5NX0.qA58Y8e1tpvKVh6c8JjC_3jmBuICIvhD-vXjpU2Gsp0'
);

const CLOUD_NAME = 'dmjrk2fov';
const extractedDir = path.join(__dirname, 'extracted_projects');
const projects = JSON.parse(fs.readFileSync(path.join(extractedDir, 'projects_summary.json'), 'utf-8'));

const CATEGORIES = {
  'truong-tieu-hoc-co-nhue-2b': 'Bildung',
  'truong-trung-hoc-co-so-chat-luong-cao': 'Bildung',
  'nha-may-nhua-grand-plastic': 'Gewerbe',
  'trung-hoc-co-so-tay-tuu': 'Bildung',
  'to-ngoc-van': 'Gewerbe',
  'trung-tam-boi-duong-chinh-tri-bac-tu-liem': 'Kultur',
  'bao-tang-lich-su-qdnd-lao': 'Kultur',
  'cuc-thi-hanh-an-dan-su-binh-chanh': 'Gewerbe',
  'khu-nghi-duong-hidumi': 'Wohnen',
  'tieu-doan-dac-cong-phan-ung-nhanh-qdnd-lao': 'Kultur',
  'truong-ly-luan-chinh-tri-qdnd-lao': 'Bildung',
  'apartment-building': 'Wohnen',
};

async function main() {
  // 1. Sign in as admin
  console.log('Signing in...');
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'admin@fbnstudio.de',
    password: 'FbnStudio2026!'
  });
  if (authErr) { console.error('Auth failed:', authErr.message); return; }
  console.log('Signed in as:', auth.user.email);

  // 2. Delete old demo projects
  console.log('\nDeleting old projects...');
  const { error: delErr } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log(delErr ? `Delete error: ${delErr.message}` : 'Old projects deleted');

  // 3. Build Cloudinary URLs from uploaded images
  // Read the actual uploaded file names from each project folder
  const results = [];

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const folderPath = path.join(extractedDir, p.slug);
    const imageFiles = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .sort();

    // Build Cloudinary URLs for each uploaded image
    const cloudinaryUrls = imageFiles.map(f => {
      const nameWithoutExt = f.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/vgarco/projects/${p.slug}/${nameWithoutExt}`;
    });

    const featuredFile = imageFiles.find(f => f.startsWith('FEATURED_'));
    let featuredUrl = null;
    if (featuredFile) {
      const n = featuredFile.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      featuredUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/vgarco/projects/${p.slug}/${n}`;
    } else if (cloudinaryUrls.length > 0) {
      featuredUrl = cloudinaryUrls[0];
    }

    const projectData = {
      code: p.slug.substring(0, 3).toUpperCase(),
      title: p.title,
      slug: p.slug,
      category: CATEGORIES[p.slug] || 'Gewerbe',
      status: 'Abgeschlossen',
      description: `${p.title} - VGARCO CO.,LTD`,
      is_featured: i < 4,
      display_order: i + 1,
      location: p.slug.includes('lao') ? 'Laos' : 'Vietnam',
    };

    console.log(`\n[${i+1}/${projects.length}] ${p.title}`);
    console.log(`  Category: ${projectData.category}`);
    console.log(`  Images: ${cloudinaryUrls.length}`);
    console.log(`  Featured: ${featuredUrl ? 'yes' : 'no'}`);

    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select();

    if (error) {
      console.log(`  ✗ Insert failed: ${error.message}`);
    } else {
      console.log(`  ✓ Inserted: ${data[0].id}`);
      results.push({
        id: data[0].id,
        slug: p.slug,
        title: p.title,
        featuredUrl,
        gallery: cloudinaryUrls,
      });
    }
  }

  // Save results
  fs.writeFileSync(
    path.join(__dirname, 'import_results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n=== DONE: ${results.length} projects inserted ===`);
}

main().catch(console.error);
