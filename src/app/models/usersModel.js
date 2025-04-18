import mongoose from "mongoose";

delete mongoose.models['users'];

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    avatar: { type: String, required: false },
    password: { type: String, required: true },
    gruppi: [{
        id: { type: String, required: true },
        title: { type: String, required: true },
        links: [{
            id: { type: String, required: true},
            name: { type: String, required: true},
            link: { type: String, required: true},
        }]
    }],
});

const usersModel = mongoose.model('users', usersSchema);

export { usersModel };
