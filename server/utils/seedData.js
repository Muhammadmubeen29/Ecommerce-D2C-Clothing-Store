import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Subscription from '../models/Subscription.js';

dotenv.config();

// Sample products data
const products = [
  {
    name: 'Elegant Embroidered Kurta',
    description: 'Beautiful hand-embroidered kurta with intricate designs. Perfect for casual wear and special occasions. Made from premium cotton fabric.',
    price: 89,
    category: 'Casual',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/34182933/pexels-photo-34182933.jpeg?_gl=1*8wslvg*_ga*NDExMDgyNDAzLjE3NTk5OTg1MDY.*_ga_8JE65Q40S6*czE3NTk5OTg1MDYkbzEkZzEkdDE3NTk5OTg1MjkkajM3JGwwJGgw',
      },
    ],
    stock: 50,
    isFeatured: true,
    material: 'Cotton',
    colors: ['White', 'Beige', 'Light Blue'],
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Luxury Silk Shalwar Kameez',
    description: 'Exquisite silk shalwar kameez with delicate embellishments. A perfect blend of tradition and elegance.',
    price: 159,
    category: 'Formal',
    sizeOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/20777181/pexels-photo-20777181.jpeg',
      },
    ],
    stock: 30,
    isFeatured: true,
    material: 'Silk',
    colors: ['Green', 'Gold', 'Maroon'],
    rating: 4.8,
    numReviews: 24,
  },
  {
    name: 'Traditional Lawn Collection',
    description: 'Lightweight and breathable lawn fabric with vibrant prints. Perfect for summer wear.',
    price: 69,
    category: 'Casual',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/31874432/pexels-photo-31874432.jpeg',
      },
    ],
    stock: 100,
    isFeatured: false,
    material: 'Lawn',
    colors: ['Pink', 'Blue', 'Yellow'],
    rating: 4.3,
    numReviews: 8,
  },
  {
    name: 'Premium Chiffon Outfit',
    description: 'Graceful chiffon outfit with stunning embroidery. Ideal for weddings and formal events.',
    price: 189,
    category: 'Formal',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/25288426/pexels-photo-25288426.jpeg',
      },
    ],
    stock: 20,
    isFeatured: true,
    material: 'Chiffon',
    colors: ['Purple', 'Red', 'Navy Blue'],
    rating: 4.9,
    numReviews: 35,
  },
  {
    name: 'Hand-woven Cotton Suit',
    description: 'Authentic hand-woven cotton suit with traditional patterns. Comfortable and stylish.',
    price: 75,
    category: 'Ethnic',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/34183002/pexels-photo-34183002.jpeg',
      },
    ],
    stock: 40,
    isFeatured: false,
    material: 'Cotton',
    colors: ['Brown', 'Beige', 'Orange'],
    rating: 4.4,
    numReviews: 15,
  },
  {
    name: 'Bridal Collection Set',
    description: 'Luxurious bridal outfit with heavy embroidery and embellishments. A dream come true for your special day.',
    price: 299,
    category: 'Bridal',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/18860925/pexels-photo-18860925.jpeg',
      },
    ],
    stock: 10,
    isFeatured: true,
    material: 'Silk & Net',
    colors: ['Red', 'Gold', 'Maroon'],
    rating: 5.0,
    numReviews: 18,
  },
  {
    name: 'Summer Lawn Print',
    description: 'Fresh summer lawn with colorful prints. Light, airy, and perfect for hot days.',
    price: 55,
    category: 'Summer',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.pexels.com/photos/20614162/pexels-photo-20614162.jpeg',
      },
    ],
    stock: 80,
    isFeatured: false,
    material: 'Lawn',
    colors: ['Multi-color', 'Floral'],
    rating: 4.2,
    numReviews: 22,
  },
  {
    name: 'Festive Ethnic Dress',
    description: 'Vibrant ethnic dress for festivals and celebrations. Features traditional embroidery and mirror work.',
    price: 129,
    category: 'Ethnic',
    sizeOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      {
        url: 'https://media.istockphoto.com/id/691374214/photo/fashion-woman-wearing-indian-costume-and-jewelry-set.jpg?b=1&s=612x612&w=0&k=20&c=i21J6JhOdkz2MSBebxAXzSt3BdIl6_aVG5CvdxiEPbA=',
      },
    ],
    stock: 35,
    isFeatured: false,
    material: 'Cotton Silk',
    colors: ['Green', 'Pink', 'Orange'],
    rating: 4.6,
    numReviews: 19,
  },
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@ecommerce.com',
  password: 'admin123',
  role: 'admin',
};

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Subscription.deleteMany();

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create(adminUser);
    console.log('✅ Admin user created:', admin.email);

    // Create products
    console.log('📦 Creating products...');
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products created`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email:', adminUser.email);
    console.log('   Password:', adminUser.password);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase();
}

export default seedDatabase;


