const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE || 'stefs-kitchen.myshopify.com';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = '2024-01';

const PLACEHOLDER_PRODUCTS = [
  {
    id: 'put-that-sofa-tee',
    title: 'Put That Ah On The Sofa Tee',
    handle: 'put-that-sofa-tee',
    description: '"Put That Ah On The Sofa" couple graphic tee. White oversized fit, premium cotton.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/put-that-sofa-tee-woman.png', altText: 'Put That Ah On The Sofa Tee - Studio' },
      { url: '/images/put-that-sofa-tee-studio.png', altText: 'Put That Ah On The Sofa Tee - Studio 2' },
      { url: '/images/put-that-sofa-tee.png', altText: 'Put That Ah On The Sofa Tee' },
    ],
    variants: [
      { id: 'v26', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v27', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v28', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v29', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v30', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'the-kitchens-cookin-jacket',
    title: "The Kitchen's Cookin' Jacket",
    handle: 'the-kitchens-cookin-jacket',
    description: '"The Kitchen\'s Cookin\'" back graphic with neon mixer, lightning bolts, and "Home Studio Vibes" tagline. Black heavyweight jacket. NYC energy.',
    priceRange: { minVariantPrice: { amount: '68.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/kitchens-cookin-jacket-street.png', altText: "The Kitchen's Cookin' Jacket - NYC Street" },
      { url: '/images/kitchens-cookin-jacket.png', altText: "The Kitchen's Cookin' Jacket" },
      { url: '/images/kitchens-cookin-jacket-nyc.png', altText: "The Kitchen's Cookin' Jacket - NYC" },
    ],
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
      { url: '/images/bad-breath-hoodie-dock-couple.png', altText: 'Bad Breath Kickback Hoodie - Dock Couple' },
      { url: '/images/bad-breath-hoodie-studio-woman.png', altText: 'Bad Breath Kickback Hoodie - Studio Woman' },
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
    images: [
      { url: '/images/chef-stef-tee-city.png', altText: "Chef Stef Still Cookin' Tee" },
      { url: '/images/chef-stef-tee-bridge.png', altText: "Chef Stef Still Cookin' Tee - Bridge" },
    ],
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
    images: [
      { url: '/images/kitchen-is-open-tee.png', altText: 'The Kitchen Is Open Tee' },
      { url: '/images/kitchen-is-open-tee-night.png', altText: 'The Kitchen Is Open Tee - Night Street' },
    ],
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
      { url: '/images/too-blessed-tee-neonbar.png', altText: 'Too Blessed Tee - Neon Bar' },
      { url: '/images/too-blessed-tee-mixing.png', altText: 'Too Blessed Tee - Mixing Desk' },
      { url: '/images/too-blessed-tee-neon.png', altText: 'Too Blessed Tee - Neon Club' },
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
    id: 'still-cookin-hoodie',
    title: "Chef Stef Still Cookin' Hoodie",
    handle: 'still-cookin-hoodie',
    description: '"Chef Stef — Still Cookin\'" neon back graphic with chrome microphone, "Jingle King" badge. Black heavyweight pullover hoodie.',
    priceRange: { minVariantPrice: { amount: '58.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/still-cookin-hoodie-studio.png', altText: "Chef Stef Still Cookin' Hoodie - Studio Crew" },
    ],
    variants: [
      { id: 'v31', title: 'S', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v32', title: 'M', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v33', title: 'L', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v34', title: 'XL', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v35', title: 'XXL', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'chef-stef-portrait-tee',
    title: 'Chef Stef Portrait Tee',
    handle: 'chef-stef-portrait-tee',
    description: 'Chef Stef portrait graphic with starry neon glow. Black oversized premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '38.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/chef-stef-portrait-tee-night.png', altText: 'Chef Stef Portrait Tee - Nightlife' },
    ],
    variants: [
      { id: 'v36', title: 'S', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v37', title: 'M', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v38', title: 'L', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v39', title: 'XL', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v40', title: 'XXL', price: { amount: '38.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'kitchens-cookin-tee',
    title: "The Kitchen's Cookin' Tee",
    handle: 'kitchens-cookin-tee',
    description: '"The Kitchen\'s Cookin\'" back graphic with lightning bolts, Est. 1999. White oversized premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/kitchens-cookin-tee-club.png', altText: "The Kitchen's Cookin' Tee - Club" },
    ],
    variants: [
      { id: 'v41', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v42', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v43', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v44', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v45', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'smooth-ride-hoodie',
    title: 'Smooth Ride Hoodie',
    handle: 'smooth-ride-hoodie',
    description: '"Smooth Ride All The Time" front graphic with "Shake That Bass" sleeve prints. Tan heavyweight pullover hoodie.',
    priceRange: { minVariantPrice: { amount: '58.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/smooth-ride-hoodie-cars.png', altText: 'Smooth Ride Hoodie' },
      { url: '/images/smooth-ride-hoodie-frontback.png', altText: 'Smooth Ride Hoodie - Front & Back' },
    ],
    variants: [
      { id: 'v46', title: 'S', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v47', title: 'M', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v48', title: 'L', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v49', title: 'XL', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v50', title: 'XXL', price: { amount: '58.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'my-crocs-tee',
    title: "Can't Leave Without My Crocs Tee",
    handle: 'my-crocs-tee',
    description: '"I Cannot Leave The Crib Without My Crocs — Comfy Is A Lifestyle." Cream/pink oversized premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/my-crocs-tee-bar.png', altText: 'My Crocs Tee - Bar' },
    ],
    variants: [
      { id: 'v51', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v52', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v53', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v54', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v55', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'eughhh-speaker-tee',
    title: 'EUGHHH! Speaker Tee',
    handle: 'eughhh-speaker-tee',
    description: '"EUGHHH!" neon text with bass speaker graphic. Black oversized premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/eughhh-speaker-tee-studio.png', altText: 'EUGHHH! Speaker Tee - Studio' },
    ],
    variants: [
      { id: 'v56', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v57', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v58', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v59', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v60', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'eughhh-neon-tee',
    title: 'EUGHHH! Neon Music Tee',
    handle: 'eughhh-neon-tee',
    description: '"EUGHHH!" rainbow neon back graphic with treble clef and music notes. Black oversized premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/eughhh-neon-tee-club.png', altText: 'EUGHHH! Neon Music Tee - Club' },
    ],
    variants: [
      { id: 'v61', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v62', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v63', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v64', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v65', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
    ],
    tags: ['featured'],
  },
  {
    id: 'sip-community-tee',
    title: 'Sip On Community, Baby Tee',
    handle: 'sip-community-tee',
    description: '"Sip On Community, Baby — Good For Your Soul." Coffee cup graphic. Cream oversized premium cotton tee.',
    priceRange: { minVariantPrice: { amount: '36.00', currencyCode: 'USD' } },
    images: [
      { url: '/images/sip-community-tee-cafe.png', altText: 'Sip On Community Tee - Cafe' },
      { url: '/images/sip-community-tee-back.png', altText: 'Sip On Community Tee - Back' },
      { url: '/images/sip-community-tee-mug.png', altText: 'Sip On Community Tee - With Mug' },
    ],
    variants: [
      { id: 'v66', title: 'S', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v67', title: 'M', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v68', title: 'L', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v69', title: 'XL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
      { id: 'v70', title: 'XXL', price: { amount: '36.00', currencyCode: 'USD' }, availableForSale: true },
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
