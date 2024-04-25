import Trips from '../models/trips.model';
import axios from 'axios';

const getTrova = async (url) => {
    const response = await axios.get(
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
    if (response && response.data)
        return response.data
    return false;
}

export const fetchData = async () => {
    console.log("[SYNC STARTED]:", new Date().toISOString())
    // Get all active trips
    const tripsArray = await getTrova('/trip-details');
    if (!tripsArray || !tripsArray.data) return;
    console.log(tripsArray.data.length, 'active trip(s) found!')

    await Promise.all(tripsArray.data.map(async trip => {
        if (!trip || !trip.id || !trip.tripPath) return;

        // Check for duplicate trip
        const duplicate = await Trips.findOne({ tripId: trip.id });
        if (duplicate) return;

        const tripDetail = await getTrova(`/trip-page-details${trip.tripPath}`);
        if (!tripDetail || !tripDetail.data) return;
        trip = {...tripDetail.data, operator: trip.operator.name};
        
        if (!trip._id) return console.log("INVALID TRIP", trip)
        await Trips.create(trip);

        // Check for previous host trips
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

                const hostTripDetail = await getTrova(`/trip-page-details${hostTrip.tripPath}`);
                if (!hostTripDetail || !hostTripDetail.data) return;
                hostTrip = {...hostTripDetail.data, operator: hostTrip.operator.name};
        
                if (!hostTrip._id) return console.log("INVALID HOST TRIP", hostTrip)
                await Trips.create(hostTrip);
            }));
        }));
    }));

    console.log("[SYNC COMPLETED]:", new Date().toISOString())
}