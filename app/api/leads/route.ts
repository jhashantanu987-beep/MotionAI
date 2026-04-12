import { NextResponse } from 'next/server'

const leads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp Inc.',
    avatar: 'SJ',
    tags: ['hot', 'enterprise'],
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    avatar: 'MC',
    tags: ['warm', 'startup'],
    email: 'michael@startupxyz.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'VP Sales',
    company: 'Global Solutions',
    avatar: 'ED',
    tags: ['hot', 'enterprise'],
    email: 'emma@globalsolutions.com',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Founder',
    company: 'InnovateLab',
    avatar: 'JW',
    tags: ['cold', 'startup'],
    email: 'james@innovatelab.com',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'Lisa Rodriguez',
    role: 'Product Manager',
    company: 'DataFlow Systems',
    avatar: 'LR',
    tags: ['warm', 'enterprise'],
    email: 'lisa@dataflow.com',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'CEO',
    company: 'NextGen Tech',
    avatar: 'DK',
    tags: ['hot', 'startup'],
    email: 'david@nextgen.com',
    phone: '+1 (555) 678-9012'
  }
]

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json(leads)
}