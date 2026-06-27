import { http, HttpResponse, delay } from 'msw'
import { properties } from '../data/properties'
import { projects } from '../data/projects'
import { agents } from '../data/agents'
import { testimonials } from '../data/testimonials'
import { blogPosts } from '../data/blogPosts'
import { stats } from '../data/stats'
import type { PropertyFilter } from '../types/property'

export const handlers = [
  http.get('/api/properties', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const filter: PropertyFilter = {
      city: url.searchParams.getAll('city') as any,
      type: url.searchParams.getAll('type') as any,
      status: url.searchParams.get('status') as any,
      priceMin: Number(url.searchParams.get('priceMin')) || undefined,
      priceMax: Number(url.searchParams.get('priceMax')) || undefined,
      bedrooms: url.searchParams.getAll('bedrooms').map(Number),
      sortBy: (url.searchParams.get('sortBy') as any) || 'newest',
      page: Number(url.searchParams.get('page')) || 1,
      limit: Number(url.searchParams.get('limit')) || 12,
    }

    let filtered = [...properties]

    if (filter.city?.length) {
      filtered = filtered.filter(p => filter.city!.includes(p.city))
    }
    if (filter.type?.length) {
      filtered = filtered.filter(p => filter.type!.includes(p.type))
    }
    if (filter.status) {
      filtered = filtered.filter(p => p.status === filter.status)
    }
    if (filter.priceMin) {
      filtered = filtered.filter(p => p.price >= filter.priceMin!)
    }
    if (filter.priceMax) {
      filtered = filtered.filter(p => p.price <= filter.priceMax!)
    }
    if (filter.bedrooms?.length) {
      filtered = filtered.filter(p => filter.bedrooms!.includes(p.bedrooms))
    }

    switch (filter.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'area':
        filtered.sort((a, b) => b.area - a.area)
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const total = filtered.length
    const start = (filter.page! - 1) * filter.limit!
    const paged = filtered.slice(start, start + filter.limit!)

    return HttpResponse.json({ data: paged, total, page: filter.page, limit: filter.limit })
  }),

  http.get('/api/properties/:id', async ({ params }) => {
    await delay(200)
    const property = properties.find(p => p.id === params.id)
    if (!property) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ data: property })
  }),

  http.get('/api/projects', async () => {
    await delay(300)
    return HttpResponse.json({ data: projects })
  }),

  http.get('/api/projects/:id', async ({ params }) => {
    await delay(200)
    const project = projects.find(p => p.id === params.id)
    if (!project) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json({ data: project })
  }),

  http.get('/api/agents', async () => {
    await delay(200)
    return HttpResponse.json({ data: agents })
  }),

  http.get('/api/agents/:id', async ({ params }) => {
    await delay(200)
    const agent = agents.find(a => a.id === params.id)
    if (!agent) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json({ data: agent })
  }),

  http.get('/api/testimonials', async () => {
    await delay(200)
    return HttpResponse.json({ data: testimonials })
  }),

  http.get('/api/blog', async () => {
    await delay(300)
    return HttpResponse.json({ data: blogPosts })
  }),

  http.get('/api/blog/:id', async ({ params }) => {
    await delay(200)
    const post = blogPosts.find(p => p.id === params.id)
    if (!post) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json({ data: post })
  }),

  http.get('/api/stats', async () => {
    await delay(200)
    return HttpResponse.json({ data: stats })
  }),

  http.post('/api/contact', async () => {
    await delay(300)
    return HttpResponse.json({ success: true })
  }),

  http.post('/api/newsletter', async () => {
    await delay(200)
    return HttpResponse.json({ success: true })
  }),

  http.post('/api/book-visit', async () => {
    await delay(300)
    return HttpResponse.json({ success: true })
  }),

  http.post('/api/request-property', async () => {
    await delay(300)
    return HttpResponse.json({ success: true })
  }),

  http.post('/api/auth/login', async () => {
    await delay(300)
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: { id: 'admin-1', name: 'مشرف المنصة', email: 'admin@smartpodium.sa', role: 'admin' },
    })
  }),
]
