"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        id: 1,
        uuid: "8cb9f1a5-256c-4633-a70f-100f29fed6d4",
        slug: "product-one",
        name: "product one",
        image: "uploads/image-1657298128941.jpg",
        main_category: "skin",
        sub_category: "shop_by_category",
        child_category: "cleansers",
        price: 3000,
        price_discount: 0,
        imageArray:
          '[{"fieldname":"image","originalname":"product2.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140279.jpg","path":"uploads/image-1657298140279.jpg","size":20285},{"fieldname":"image","originalname":"product3.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140280.jpg","path":"uploads/image-1657298140280.jpg","size":26350},{"fieldname":"image","originalname":"product4.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140280.jpg","path":"uploads/image-1657298140280.jpg","size":16551},{"fieldname":"image","originalname":"product5.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140280.jpg","path":"uploads/image-1657298140280.jpg","size":26948}]',
        isFeatured: true,
        isPublished: true,
        description: "<p>hello product one</p>",
        bestSeller: 2,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        uuid: "8cb9f1b5-256c-4633-a70f-100f29fed6d4",
        slug: "product-two",
        name: "product two",
        image: "uploads/image-1657298128941.jpg",
        main_category: "skin",
        sub_category: "shop_by_category",
        child_category: "cleansers",
        price: 3000,
        price_discount: 20,
        imageArray:
          '[{"fieldname":"image","originalname":"product2.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140279.jpg","path":"uploads/image-1657298140279.jpg","size":20285},{"fieldname":"image","originalname":"product3.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140280.jpg","path":"uploads/image-1657298140280.jpg","size":26350},{"fieldname":"image","originalname":"product4.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140280.jpg","path":"uploads/image-1657298140280.jpg","size":16551},{"fieldname":"image","originalname":"product5.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298140280.jpg","path":"uploads/image-1657298140280.jpg","size":26948}]',
        isFeatured: true,
        isPublished: true,
        description: "<p>hello product two</p>",
        bestSeller: 2,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        uuid: "12e1fba0-f6cc-4aa0-bf8c-0f874fa491a6",
        slug: "product-three",
        name: "product three",
        image: "uploads/image-1657298275575.jpg",
        main_category: "skin",
        sub_category: "shop_by_skin_type",
        child_category: "oily/combination_skin",
        price: 300,
        price_discount: 10,
        imageArray:
          '[{"fieldname":"image","originalname":"product1.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288083.jpg","path":"uploads/image-1657298288083.jpg","size":26213},{"fieldname":"image","originalname":"product2.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288090.jpg","path":"uploads/image-1657298288090.jpg","size":20285},{"fieldname":"image","originalname":"product3.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288093.jpg","path":"uploads/image-1657298288093.jpg","size":26350},{"fieldname":"image","originalname":"product4.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288094.jpg","path":"uploads/image-1657298288094.jpg","size":16551},{"fieldname":"image","originalname":"product5.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288096.jpg","path":"uploads/image-1657298288096.jpg","size":26948}]',
        isFeatured: false,
        isPublished: true,
        description: "<p>product three</p>",
        bestSeller: 5,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        uuid: "12e1fba0-f6cc-4ag0-bf8c-0f874fa491a6",
        slug: "product-four",
        name: "product Four",
        image: "uploads/image-1657298275575.jpg",
        main_category: "skin",
        sub_category: "shop_by_skin_type",
        child_category: "oily/combination_skin",
        price: 300,
        price_discount: 0,
        imageArray:
          '[{"fieldname":"image","originalname":"product1.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288083.jpg","path":"uploads/image-1657298288083.jpg","size":26213},{"fieldname":"image","originalname":"product2.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288090.jpg","path":"uploads/image-1657298288090.jpg","size":20285},{"fieldname":"image","originalname":"product3.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288093.jpg","path":"uploads/image-1657298288093.jpg","size":26350},{"fieldname":"image","originalname":"product4.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288094.jpg","path":"uploads/image-1657298288094.jpg","size":16551},{"fieldname":"image","originalname":"product5.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298288096.jpg","path":"uploads/image-1657298288096.jpg","size":26948}]',
        isFeatured: false,
        isPublished: true,
        description: "<p>product four</p>",
        bestSeller: 0,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        uuid: "355cbf18-43a1-4ad0-b563-4e8941786a50",
        slug: "product-five",
        name: "product five",
        image: "uploads/image-1657298385177.jpg",
        main_category: "hair",
        sub_category: "shop_by_category",
        child_category: "hair_mask",
        price: "200",
        price_discount: "50",
        imageArray:
          '[{"fieldname":"image","originalname":"product1.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393184.jpg","path":"uploads/image-1657298393184.jpg","size":26213},{"fieldname":"image","originalname":"product2.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393190.jpg","path":"uploads/image-1657298393190.jpg","size":20285},{"fieldname":"image","originalname":"product3.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393191.jpg","path":"uploads/image-1657298393191.jpg","size":26350},{"fieldname":"image","originalname":"product4.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393193.jpg","path":"uploads/image-1657298393193.jpg","size":16551},{"fieldname":"image","originalname":"product5.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393196.jpg","path":"uploads/image-1657298393196.jpg","size":26948}]',
        isFeatured: false,
        isPublished: true,
        description: "<p>hello product five</p>",
        bestSeller: 2,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        uuid: "355cbf18-42a1-4ad0-b563-4e8941786a50",
        slug: "product-six",
        name: "product six",
        image: "uploads/image-1657298385177.jpg",
        main_category: "hair",
        sub_category: "shop_by_category",
        child_category: "hair_mask",
        price: 200,
        price_discount: 10,
        imageArray:
          '[{"fieldname":"image","originalname":"product1.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393184.jpg","path":"uploads/image-1657298393184.jpg","size":26213},{"fieldname":"image","originalname":"product2.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393190.jpg","path":"uploads/image-1657298393190.jpg","size":20285},{"fieldname":"image","originalname":"product3.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393191.jpg","path":"uploads/image-1657298393191.jpg","size":26350},{"fieldname":"image","originalname":"product4.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393193.jpg","path":"uploads/image-1657298393193.jpg","size":16551},{"fieldname":"image","originalname":"product5.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"image-1657298393196.jpg","path":"uploads/image-1657298393196.jpg","size":26948}]',
        isFeatured: false,
        isPublished: true,
        description: "<p>hello product six</p>",
        bestSeller: 2,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        uuid: "e04e5dd4-ac57-4c75-a458-6700d635d548",
        slug: "product-seven",
        name: "product seven",
        image: "uploads/image-1658595292471.jpg",
        main_category: "hair",
        sub_category: "shop_by_concerns",
        child_category: "volume",
        price: 250,
        price_discount: 0,
        imageArray: "[]",
        isFeatured: false,
        isPublished: true,
        description: "<p>product seven</p>",
        bestSeller: 0,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        uuid: "9f6fdb2f-31bf-40c5-b757-71df2e41ada6",
        slug: "product-eight",
        name: "product eight",
        image: "uploads/image-1658935534671.jpg",
        main_category: "hair",
        sub_category: "shop_by_hair_type",
        child_category: "dry_to_normal_scalp",
        price: 300,
        price_discount: 0,
        imageArray: "[]",
        isFeatured: false,
        isPublished: true,
        description: "<p>dfasdf</p>",
        bestSeller: 0,
        trending: 0,
        mostLoved: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Products", null, {});
  },
};