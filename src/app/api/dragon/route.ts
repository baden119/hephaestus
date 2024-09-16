import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log('Dungeon Dragon! GEET')
  return NextResponse.json({ message: 'Raow Roaw like a dungeon dragon!' });
}

export async function POST(request: Request) {
    console.log('Get Club Post Request Recieved')
    const res = await request.json()
    console.log(res.package)
    return NextResponse.json({ message: 'Package recieved: ' + res.package });
  }
  