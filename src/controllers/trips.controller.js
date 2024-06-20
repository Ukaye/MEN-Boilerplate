import dotenv from "dotenv";
import Trips from '../models/trips.model';

dotenv.config();

//
// ─── MANAGE ALL ACTIONS REGARDING TRIPS ───────────────────────────────
//

class TripsController {
    async getTrips(req, res) {
        try {
            const trips = await Trips.find();
            return res.send({ trips });
        } catch (error) {
            return res.status(500).send({message: 'An error occured'});
        }
    }

    async getHosts(req, res) {
        try {
            let hosts = [];
            const trips = await Trips.find().select("hosts");
            for (let trip of trips) {
                for (let host of trip.hosts) {
                    const duplicate = hosts.find(e => e.id === host.hostId);
                    if (duplicate) continue;
                    hosts.push({
                        name: host.displayName,
                        facebook: host.socialChannels?.facebook,
                        instagram: host.socialChannels?.instagram,
                        tiktok: host.socialChannels?.tiktok,
                        youtube: host.socialChannels?.youtube,
                        id: host.hostId,
                        bio: host.bio
                    })
                }
            }
            return res.send({ hosts });
        } catch (error) {
            return res.status(500).send({message: 'An error occured'});
        }
    }
}

export default TripsController;