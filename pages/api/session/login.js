import withSession from '../../../utils/session'

export default withSession(async (req, res) => {
  // Verify that the user exists.

  try {
    const user = { isLoggedIn: true }
    req.session.set('user', user)
    await req.session.save()

    res.json(user)
  } catch (error) {
    res.status(400).json({ statusCode:400, error: err.message });
  }
})
