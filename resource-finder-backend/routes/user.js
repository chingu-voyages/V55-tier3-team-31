import express from 'express'
const router = express.Router()

router.get('/auth/me', (req, res) => {
    console.log("Session ID:", req.sessionID);
  console.log("Session Data:", req.session);
  console.log("User:", req.user);
    res.send(req.user)
})

router.patch('/auth/me', (req, res) => {
    const { name, email } = req.body
    if (!req.user) {
        return res.status(401).send('Unauthorized')
    }
    
    req.user.name = name || req.user.name
    req.user.email = email || req.user.email
    req.user.interests = req.body.interests || req.user.interests

    req.user.save()
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).send('Error updating user'))
})

export default router;