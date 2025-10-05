import mongoose, { Document } from 'mongoose'

export interface ITestimonial extends Document {
    name: string;
    email: string;
    designation: string;
    rating: number;
    likedMost: string;
    howHelped: string;
    feedback: string;
    canShow: boolean;
    displayPreference: string; // "nameAndDesignation", "nameOnly", "anonymous"
    date: Date;
}

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    likedMost: {
        type: String,
        required: true
    },
    howHelped: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: false
    },
    canShow: {
        type: Boolean,
        default: true,
        required: true
    },
    displayPreference: {
        type: String,
        enum: ['nameAndDesignation', 'nameOnly', 'anonymous'],
        default: 'nameAndDesignation',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)