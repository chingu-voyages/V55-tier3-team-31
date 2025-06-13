import express from 'express';
import ResourceModel from '../models/resource.js';
const router = express.Router();

router.post('/api/resources/like', async (req, res) => {
  try {
    const resource = req.body.resource; 
    const user = req.body.user;

    if (!user) {
        return res.status(400).json({ error: 'User is not logged in' });
      }
      if (!resource || !resource.appliedTags || !Array.isArray(resource.appliedTags || !resource.name || !resource.url || !resource.author)) {
        return res.status(400).json({ error: 'Invalid resource data' });
      }

      const existingResource = await ResourceModel.findOne({ url: resource.url });

        if (existingResource) {
            const isAlreadyLiked = existingResource.interestedUsers.some(userI => userI._id.equals(user._id));
            if (isAlreadyLiked) {
                return res.status(400).json({ error: 'Resource already liked by this user' });
            }
            existingResource.interestedUsers.push({
                id: user.id,
                name: user.name
            });
            await existingResource.save();
            return res.status(200).json(existingResource);
        } else {
            const popularResource = {
                ...resource,
                interestedUsers: [
                    {
                        id: user.id,
                        name: user.name
                    }
                ]
            };
            const newResource = new ResourceModel(popularResource);
            await newResource.save();
            return res.status(201).json(newResource);
        }  

  } catch (error) {
    console.error('Error fetching recommended resources:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/resources/popular', async (req, res) => {
  try {
    const resources = await ResourceModel.find();
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;