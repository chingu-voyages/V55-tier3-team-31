import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
        author: String,
        name: String,
        appliedTags: [String],
        appliedTagsName: [String],
        url: String,
        createdAt: Date,
        id: String,
        interestedUsers: [{id: String, name: String}],
});

const ResourceModel = mongoose.model("Resource", resourceSchema);

export default ResourceModel;