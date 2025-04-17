import mongoose from "mongoose";

delete mongoose.models['users'];

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gruppi: [{
        title: { type: String, required: true },
        links: [{
            name: { type: String, required: true},
            link: { type: String, required: true},
        }]
    }],
});

const usersModel = mongoose.model('users', usersSchema);

export { usersModel };
