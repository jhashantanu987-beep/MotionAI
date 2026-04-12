import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface Client {
  id: string
  name: string
  industry: string
  leads: number
  bookings: number
  conversions: number
  revenue: string
  noShowRate: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'inactive'
}

// In-memory storage (in production, use a real database)
let clients: Client[] = []

// Simulate realistic business fluctuations
function updateClientMetrics(client: Client): Client {
  const hour = new Date().getHours()
  const dayOfWeek = new Date().getDay()

  const businessHourMultiplier = (hour >= 9 && hour <= 17) ? 1.4 : 0.5
  const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.3 : 1.0

  const marketEvent = Math.random()
  let marketMultiplier = 1.0
  if (marketEvent < 0.05) marketMultiplier = 1.8
  else if (marketEvent < 0.2) marketMultiplier = 1.3
  else if (marketEvent < 0.5) marketMultiplier = 0.8

  const totalMultiplier = businessHourMultiplier * weekendMultiplier * marketMultiplier

  let industryMultiplier = 1.0
  if (client.industry === 'Consulting') industryMultiplier = 1.2
  else if (client.industry === 'E-commerce') industryMultiplier = 1.5
  else if (client.industry === 'SaaS') industryMultiplier = 1.3

  const leadChange = Math.round((Math.random() - 0.4) * 50 * totalMultiplier * industryMultiplier)
  client.leads = Math.max(0, client.leads + leadChange)

  const bookingProbability = Math.min(0.15, (client.leads / 1000) * 0.12 * totalMultiplier)
  if (Math.random() < bookingProbability) {
    client.bookings = Math.max(0, client.bookings + 1)
  }

  const conversionTrend = Math.random() > 0.7 ? 1 : 0
  client.conversions = Math.max(0, client.conversions + conversionTrend)

  let baseRevenuePerBooking = 2500
  if (client.industry === 'Consulting') baseRevenuePerBooking = 2800
  else if (client.industry === 'E-commerce') baseRevenuePerBooking = 2200
  else if (client.industry === 'SaaS') baseRevenuePerBooking = 3200

  const revenueChange = Math.round((Math.random() - 0.3) * 3000 * totalMultiplier)
  const currentRevenue = parseInt(client.revenue.replace(/[$,]/g, ''))
  const newRevenue = Math.max(10000, currentRevenue + revenueChange)
  client.revenue = `$${newRevenue.toLocaleString()}`

  const currentNoShow = parseInt(client.noShowRate.replace('%', ''))
  const noShowChange = Math.round((Math.random() - 0.5) * 2)
  const newNoShow = Math.max(0, Math.min(15, currentNoShow + noShowChange))
  client.noShowRate = `${newNoShow}%`

  client.updatedAt = new Date().toISOString()

  return client
}

export async function GET() {
  try {
    // Update metrics for all active clients
    clients = clients.map(client =>
      client.status === 'active' ? updateClientMetrics({ ...client }) : client
    )

    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, industry, leads = 0, bookings = 0, conversions = 0, revenue = '$0', noShowRate = '0%' } = body

    if (!name || !industry) {
      return NextResponse.json({ error: 'Name and industry are required' }, { status: 400 })
    }

    const newClient: Client = {
      id: Date.now().toString(),
      name,
      industry,
      leads,
      bookings,
      conversions,
      revenue,
      noShowRate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    }

    clients.push(newClient)

    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 })
    }

    const clientIndex = clients.findIndex(client => client.id === id)
    if (clientIndex === -1) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    clients[clientIndex] = {
      ...clients[clientIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(clients[clientIndex])
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 })
    }

    const clientIndex = clients.findIndex(client => client.id === id)
    if (clientIndex === -1) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const deletedClient = clients.splice(clientIndex, 1)[0]

    return NextResponse.json({ message: 'Client deleted successfully', client: deletedClient })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
  }
}