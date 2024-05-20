import { NextResponse } from 'next/server';

export async function GET(request) {
    console.log('Get Club Request Recieved')
  return NextResponse.json({ message: 'Heavy Club Created' });
}

// export async function POST(request) {
//   const { title, description, level, link } = await request.json();
//   //   console.log(title, description, level, link);
//   const newCourse = {
//     id: uuidv4(),
//     title,
//     description,
//     level,
//     link,
//   };

//   courses.push(newCourse);

//   return NextResponse.json({ msg: 'New Facility Training Module Created' });
// }
