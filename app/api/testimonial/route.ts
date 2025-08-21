import { NextResponse, NextRequest } from "next/server";
import {connect} from 'db/config';
import Testimonials from "@/models/Testimonials";
export async function GET() {
    try {
        await connect();
        console.log("In testimonial get route, db connected");
        const testimonials = await Testimonials.find({ canShow: true }).sort({ date: -1 });
        console.log("Testimonials retrieved successfully:", testimonials);
        return NextResponse.json(testimonials, { status: 200 });
    } catch (error) {
        console.error("Error in testimonial get route:", error);
        return NextResponse.json({ error: "Failed to retrieve testimonials" }, { status: 500 });
    }
}