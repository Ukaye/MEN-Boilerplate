 //
 // ─── TRIPS MODEL ─────────────────────────────────────────────────────────
 //
 
 //setup dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const tripsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tripId: mongoose.Schema.Types.ObjectId,
    __v: Number,
    activities: mongoose.Schema.Types.Mixed,
    activityLevel: Number,
    areLegacyServices: Boolean,
    cities: mongoose.Schema.Types.Mixed,
    createdDate: Date,
    dateRangeFormatted: String,
    exclusions: mongoose.Schema.Types.Mixed,
    hostNamesFormatted: String,
    hosts: mongoose.Schema.Types.Mixed,
    inclusions: mongoose.Schema.Types.Mixed,
    initialPrice: Number,
    legacyServicesByDay: mongoose.Schema.Types.Mixed,
    lengthDays: Number,
    logistics: mongoose.Schema.Types.Mixed,
    mapImage: String,
    mapUrl: mongoose.Schema.Types.Mixed,
    mealsFormatted: String,
    minimumCostPerTraveler: Number,
    minimumSpots: Number,
    optionalActivities: mongoose.Schema.Types.Mixed,
    photos: mongoose.Schema.Types.Mixed,
    remainingPrice: Number,
    servicesByDay: mongoose.Schema.Types.Mixed,
    tripPath: String,
    tripPathNormalized: String,
    tripSummary: String,
    name: String,
    status: String,
    startDate: Date,
    categories: mongoose.Schema.Types.Mixed,
    pendingTravelers: Number,
    confirmedTravelers: Number,
    onHoldTravelers: Number,
    maximumSpots: Number,
    minimumTripThreshold: Number,
    minimumTripThreshold: Number,
    price: Number,
    itineraryId: mongoose.Schema.Types.ObjectId,
    isClosed: Boolean,
    isPreLive: Boolean,
    isSoldOut: Boolean,
    remainingSpots: Number,
    hasReachedMinSpots: Boolean,
    operator: String
},
    {
        timestamps: true
    }
)

const Trips = mongoose.model('Trips', tripsSchema);

export default Trips;