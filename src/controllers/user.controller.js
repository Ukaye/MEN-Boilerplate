import dotenv from "dotenv";
import User from '../models/user.model';

dotenv.config();

//
// ─── MANAGE ALL ACTIONS REGARDING TO USER ACCOUNT ───────────────────────────────
//

class UserController {
    async listUsers(req, res) {
        try {
            const users = await User.find({"host.ID": 1234});
            return res.send({ users });
        } catch (error) {
            return res.status(500).send({message: 'An error occured'});
        }
    }
}

export default UserController;