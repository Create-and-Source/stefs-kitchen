const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE || 'stefs-kitchen.myshopify.com';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = '2024-01';

const PLACEHOLDER_PRODUCTS = [
  {
    id: 'chef-hat-shirt',
    title: 'Chef Hat Shirt',
    handle: 'chef-hat-shirt',
    description: 'Rep the kitchen with the signature chef hat tee. Premium cotton, bold print.',
    priceRange: { minVariantPrice: { amount: '38.00', currencyCode: 'USD' } },
    images: [{ url: '/images/IMG_0511.PNG', altText: 'Chef Hat Shirt' }],
    variants: [
      { id: 'v1', title: 'S', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v2', title: 'M', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v3', title: 'L', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v4', title: 'XL', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v5', title: 'XXL', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'eughhh-hoodie',
    title: 'EUGHHH! Hoodie',
    handle: 'eughhh-hoodie',
    description: 'The signature EUGHHH! hoodie. Heavyweight fleece, oversized fit, loud energy.',
    priceRange: { minVariantPrice: { amount: '44.50', currencyCode: 'USD' } },
    images: [{ url: '/images/IMG_0512.PNG', altText: 'EUGHHH! Hoodie' }],
    variants: [
      { id: 'v6', title: 'S', price: { amount: '44.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v7', title: 'M', price: { amount: '44.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v8', title: 'L', price: { amount: '44.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v9', title: 'XL', price: { amount: '44.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v10', title: 'XXL', price: { amount: '44.50', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'eughhh-sticker-sheet',
    title: 'EUGHHH! Sticker Sheet',
    handle: 'eughhh-sticker-sheet',
    description: 'Pack of EUGHHH! stickers. Vinyl, waterproof, stick em everywhere.',
    priceRange: { minVariantPrice: { amount: '9.00', currencyCode: 'USD' } },
    images: [{ url: '/images/IMG_0523.PNG', altText: 'EUGHHH! Sticker Sheet' }],
    variants: [
      { id: 'v11', title: 'Default', price: { amount: '9.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: [],
  },
  {
    id: 'eughhh-tshirt',
    title: 'EUGHHH! T-Shirt',
    handle: 'eughhh-tshirt',
    description: 'The classic EUGHHH! tee. 100% cotton, premium weight, built different.',
    priceRange: { minVariantPrice: { amount: '29.50', currencyCode: 'USD' } },
    images: [{ url: '/images/IMG_0513.PNG', altText: 'EUGHHH! T-Shirt' }],
    variants: [
      { id: 'v12', title: 'S', price: { amount: '29.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v13', title: 'M', price: { amount: '29.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v14', title: 'L', price: { amount: '29.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v15', title: 'XL', price: { amount: '29.50', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v16', title: 'XXL', price: { amount: '29.50', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
];

async function shopifyFetch(query, variables = {}) {
  if (!STOREFRONT_TOKEN) return null;

  const response = await fetch(
    `https://${SHOPIFY_STORE}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  return response.json();
}

export async function getProducts() {
  if (!STOREFRONT_TOKEN) return PLACEHOLDER_PRODUCTS;

  const query = `{
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch(query);
  if (!data?.data?.products) return PLACEHOLDER_PRODUCTS;

  return data.data.products.edges.map(({ node }) => ({
    ...node,
    images: node.images.edges.map(({ node: img }) => img),
    variants: node.variants.edges.map(({ node: v }) => v),
  }));
}

export async function getProduct(handle) {
  if (!STOREFRONT_TOKEN) {
    return PLACEHOLDER_PRODUCTS.find((p) => p.handle === handle) || null;
  }

  const query = `query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch(query, { handle });
  if (!data?.data?.product) return null;

  const product = data.data.product;
  return {
    ...product,
    images: product.images.edges.map(({ node: img }) => img),
    variants: product.variants.edges.map(({ node: v }) => v),
  };
}

export async function createCart() {
  if (!STOREFRONT_TOKEN) return { id: 'placeholder-cart', lines: [], checkoutUrl: '#' };

  const query = `mutation {
    cartCreate {
      cart {
        id
        checkoutUrl
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch(query);
  const cart = data?.data?.cartCreate?.cart;
  return cart
    ? { ...cart, lines: cart.lines.edges.map(({ node }) => node) }
    : { id: null, lines: [], checkoutUrl: '#' };
}

export async function addToCart(cartId, variantId, quantity = 1) {
  if (!STOREFRONT_TOKEN) return null;

  const query = `mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });

  const cart = data?.data?.cartLinesAdd?.cart;
  return cart
    ? { ...cart, lines: cart.lines.edges.map(({ node }) => node) }
    : null;
}

export function formatPrice(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}
