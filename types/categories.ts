interface Cover {
  _id: string;
  url: string;
}

export interface ChildCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  cover: Cover;
  subCategory: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  cover: Cover;
  parentCategory: string;
  childCategories: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  cover: Cover;
  subCategories: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesData {
  category: Category[];
  subCategory: SubCategory[];
  childCategory: ChildCategory[];
}
