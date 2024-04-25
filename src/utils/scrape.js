import Trips from '../models/trips.model';
import {post, get, put, del} from 'request-promise';

const getTrova = async (url) => await get(
    `https://my.trovatrip.com/public${url}`,
    {
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://trovatrip.com',
            'Accept': '*/*'
        }
    }
)

export const fetchData = async () => {
    console.log("[SYNC STARTED]:", new Date().toISOString())

    // Get all active trips
    const tripsArray = await getTrova('/trip-details');
    console.log("tripsArray", tripsArray);
    if (!tripsArray || !tripsArray.data) return;

    await Promise.all(tripsArray.data.slice(0, 1).map(async trip => {
        console.log("trip", trip);
        if (!trip || !trip.id || !trip.tripPath) return;

        // Check for duplicate trip
        const duplicate = await Trips.findOne({ tripId: trip.id });
        if (duplicate) return;

        const tripDetail = await getTrova(`/trip-page-details${trip.tripPath}`);
        console.log("tripDetail", tripDetail);
        if (!tripDetail || !tripDetail.data) return;
        
        await Trips.create(tripDetail.data);

        // Check for previous host trips
        console.log("trip.hosts", trip.hosts)
        if (!trip.hosts) return;

        await Promise.all(trip.hosts.map(async host => {
            if (!host) return;

            // Check if host has already been synced
            const duplicateHost = await Trips.findOne({ "host.hostId": host.hostId });
            if (duplicateHost) return;
    
            const hostTripsArray = await getTrova(`/host/${host.hostId}/trips`);
            if (!hostTripsArray || !hostTripsArray.data) return;
    
            await Promise.all(hostTripsArray.data.map(async hostTrip => {
                if (!hostTrip || !hostTrip.tripPath) return;

                // Check for duplicate host trip path
                const duplicate = await Trips.findOne({ tripPath: hostTrip.tripPath });
                if (duplicate) return;

                console.log("hostTrip.tripPath", hostTrip.tripPath)
                const hostTripDetail = await getTrova(`/trip-page-details${hostTrip.tripPath}`);
                if (!hostTripDetail || !hostTripDetail.data) return;
        
                await Trips.create(hostTripDetail.data);
            }));
        }));
    }));

    console.log("[SYNC COMPLETED]:", new Date().toISOString())
}