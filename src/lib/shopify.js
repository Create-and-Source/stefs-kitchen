const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE || 'stefs-kitchen.myshopify.com';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = '2024-01';

const PLACEHOLDER_PRODUCTS = [
  {
    id: 'the-kitchens-cookin-jacket',
    title: "The Kitchen's Cookin' Jacket",
    handle: 'the-kitchens-cookin-jacket',
    description: '"The Kitchen\'s Cookin\'" back graphic with neon mixer, lightning bolts, and "Home Studio Vibes" tagline. Black heavyweight jacket. NYC energy.',
    priceRange: { minVariantPrice: { amount: '68.00', currencyCode: 'USD' } },
    images: [{ url: '/images/kitchens-cookin-jacket.png', altText: "The Kitchen's Cookin' Jacket" }],
    variants: [
      { id: 'v1', title: 'S', price: { amount: '68.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v2', title: 'M', price: { amount: '68.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v3', title: 'L', price: { amount: '68.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v4', title: 'XL', price: { amount: '68.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v5', title: 'XXL', price: { amount: '68.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'bad-breath-kickback-hoodie',
    title: 'Bad Breath Kickback Hoodie',
    handle: 'bad-breath-kickback-hoodie',
    description: '"Bad Breath Kickback" retro beach graphic. "Breath In Such A Blessing — Get Up Outta Here." White heavyweight pullover hoodie.',
    priceRange: { minVariantPrice: { amount: '58.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/bad-breath-hoodie-studio.png', altText: 'Bad Breath Kickback Hoodie - Studio' },
      { url: '/images/bad-breath-hoodie-dock.png', altText: 'Bad Breath Kickback Hoodie - Dock' },
    ],
    variants: [
      { id: 'v6', title: 'S', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v7', title: 'M', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v8', title: 'L', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v9', title: 'XL', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v10', title: 'XXL', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'chef-stef-still-cookin-tee',
    title: "Chef Stef Still Cookin' Tee",
    handle: 'chef-stef-still-cookin-tee',
    description: '"Chef Stef — Still Cookin\'" neon back graphic with chrome microphone, "Jingle King" badge, and city skyline. Black premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '38.00', currencyCode: 'USD' } },
    images: [{ url: '/images/chef-stef-tee-city.png', altText: "Chef Stef Still Cookin' Tee" }],
    variants: [
      { id: 'v11', title: 'S', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v12', title: 'M', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v13', title: 'L', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v14', title: 'XL', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v15', title: 'XXL', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'the-kitchen-is-open-tee',
    title: 'The Kitchen Is Open Tee',
    handle: 'the-kitchen-is-open-tee',
    description: '"THE KITCHEN IS OPEN" bold block print. Cream oversized tee. Hooks, Hotlines, Holy Ground.',
    priceRange: { minVariantPrice: { amount: '34.00', currencyCode: 'USD' } },
    images: [{ url: '/images/kitchen-is-open-tee.png', altText: 'The Kitchen Is Open Tee' }],
    variants: [
      { id: 'v16', title: 'S', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v17', title: 'M', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v18', title: 'L', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v19', title: 'XL', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v20', title: 'XXL', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'too-blessed-tee',
    title: 'Too Blessed 2 Be Stressed Tee',
    handle: 'too-blessed-tee',
    description: '"Too Blessed 2 Be Stressed" graphic with mixer illustration. White premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '34.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/too-blessed-tee-studio.png', altText: 'Too Blessed Tee - Studio' },
      { url: '/images/too-blessed-tee-club.png', altText: 'Too Blessed Tee - Club' },
    ],
    variants: [
      { id: 'v21', title: 'S', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v22', title: 'M', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v23', title: 'L', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v24', title: 'XL', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v25', title: 'XXL', price: { amount: '34.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'put-that-sofa-tee',
    title: 'Put That Ash In The Sofa Tee',
    handle: 'put-that-sofa-tee',
    description: '"Put That Ash In The Sofa" couple graphic tee. White oversized fit, premium cotton.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [{ url: '/images/put-that-sofa-tee.png', altText: 'Put That Ash In The Sofa Tee' }],
    variants: [
      { id: 'v26', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v27', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v28', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v29', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v30', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
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
