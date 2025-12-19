import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    metaTitle: {
      type: String,
      default: '',
      trim: true,
    },
    metaKeywords: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Casual', 'Formal', 'Ethnic', 'Bridal', 'Summer', 'Winter'],
    },
    sizeOptions: [
      {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
    ],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
        },
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    material: {
      type: String,
      default: '',
    },
    colors: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create index for better search performance
productSchema.index({ name: 'text', description: 'text' });

// Helper to generate slugs
function generateSlug(name) {
  return name
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Set slug on save when name changes
productSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// Also set slug on insertMany
productSchema.pre('insertMany', function (docs, next) {
  // Mongoose may call this hook with either (docs, next) or (next, docs)
  // depending on version/context. Guard against the case where `docs`
  // is actually the callback function.
  let documents = docs;
  let cb = next;

  if (typeof docs === 'function') {
    cb = docs;
    documents = undefined;
  }

  if (Array.isArray(documents)) {
    documents.forEach((doc) => {
      if (!doc.slug && doc.name) {
        doc.slug = generateSlug(doc.name);
      }
    });
  }

  if (typeof cb === 'function') cb();
});

const Product = mongoose.model('Product', productSchema);

export default Product;



