import { NextRequest, NextResponse } from "next/server";
import Testimonials from "@/models/Testimonials";
import { connect } from "db/config"
export async function POST(request: NextRequest) {
    try {
        await connect();
        console.log("In testimonial post route, db connected")
        const { name, email, designation, rating, likedMost, howHelped, feedback, canShow, displayPreference, date } = await request.json();

        // Basic field validation
        if (!name || !email || !designation || !rating || !likedMost || !howHelped || canShow === undefined || !date) {
            return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 });
        }

        // If canShow is true, displayPreference is required
        if (canShow && !displayPreference) {
            return NextResponse.json({ error: "Display preference is required when allowing public display" }, { status: 400 });
        }

        // Set default displayPreference if canShow is false
        const finalDisplayPreference = canShow ? displayPreference : "nameAndDesignation";

        const testimonial = new Testimonials({
            name,
            email,
            designation,
            rating,
            likedMost,
            howHelped,
            feedback,
            canShow,
            displayPreference: finalDisplayPreference,
            date
        });
        await testimonial.save();
        console.log("Testimonial saved successfully:", testimonial);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        console.error("Error in testimonial post route:", error);
        return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
    }
}