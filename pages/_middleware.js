import { NextResponse , NextRequest} from "next/server";

export async function  middleware (req  ,  event ) {
    
    return NextResponse.next();

} 