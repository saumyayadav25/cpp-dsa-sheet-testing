import { NextResponse, NextRequest } from "next/server";
import {connect} from 'db/config';
import Testimonials from "@/models/Testimonials";
export async function GET() {
    try {
        await connect();
        const testimonials = await Testimonials.find({ canShow: true }).sort({ date: -1 });
        return NextResponse.json(testimonials, { status: 200 });
    } catch (error) {
        console.log("Testimonials service temporarily unavailable");
        return NextResponse.json([], { status: 200 });
    }
}