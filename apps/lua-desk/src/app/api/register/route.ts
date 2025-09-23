import { auth } from 'apps/lua-desk/auth';
import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../_actions/registerUser';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.name !== 'Admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { email, name, password } = await req.json();
  if (!email || !name || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const result = await registerUser({ email, name, password });
  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
}
