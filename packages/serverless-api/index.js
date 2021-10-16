addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

const allowedOrigins = ['*']
const corsHeaders = (origin = ['*']) => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
})
const checkOrigin = (request) => {
  const origin = request.headers.get('Origin')
  const foundOrigin = allowedOrigins.find((allowedOrigin) =>
    allowedOrigin.includes(origin),
  )
  return foundOrigin ? foundOrigin : allowedOrigins[0]
}
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(event) {
  const { request } = event
  if (request.method === 'OPTIONS') {
    // Check that the request's origin is a valid origin, allowed to access this API
    const allowedOrigin = checkOrigin(event.request)
    return new Response('OK', { headers: corsHeaders(allowedOrigin) })
  }
  if (request.method === 'POST') {
    return createPost(request)
  } else {
    return getPosts(request)
  }
}
const defaultData = {
  posts: [
    {
      _id: 20201001,
      title: 'My First Post',
      username: 'coolguy123',
      content: "Hey Y'all!",
      images: [
        {
          url: 'https://picsum.photos/200/300',
          alt: 'A picture of a cat',
        },
      ],
      createdAt: '2020-01-01T00:00:00.000Z',
    },
    {
      _id: 20201002,
      title: 'Story About my Dogs',
      username: 'kn0thing',
      content: 'So the other day I was in the yard, and...',
      images: [
        {
          url: 'https://picsum.photos/200/300',
          alt: 'A picture of a cat',
        },
        {
          url: 'https://picsum.photos/200/300',
          alt: 'A picture of a cat',
        },
      ],
      createdAt: '2020-01-01T00:00:00.000Z',
    },
  ],
}
const setCache = (key, data) => SOCIAL_MEDIA.put(key, data)
const getCache = (key) => SOCIAL_MEDIA.get(key)

async function createPost(request) {
  const body = await request.text()
  const ip = request.headers.get('CF-Connecting-IP')
  const cacheKey = `data-${ip}`
  try {
    JSON.parse(body)
    await setCache(cacheKey, body)
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(),
      },
    })
  } catch (err) {
    return new Response(err, { status: 500 })
  }
}

async function getPosts(request) {
  const ip = request.headers.get('CF-Connecting-IP')
  const cacheKey = `data-${ip}`
  let data
  const cache = await getCache(cacheKey)
  if (!cache) {
    await setCache(cacheKey, JSON.stringify(defaultData))
    data = defaultData
  } else {
    data = JSON.parse(cache)
  }
  const body = JSON.stringify({ posts: data.posts || [] })
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  })
}
