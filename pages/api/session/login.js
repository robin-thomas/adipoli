import withSession from '../../../utils/session'
import AccountService from '../../../utils/db/account';

export default withSession(async (req, res) => {
  try {
    // Verify that the user exists.
    const { email } = req.body;
    const account = await AccountService.getAccount(email);
    if (!account) {
      return res.status(404).json({});
    }

    const user = { isLoggedIn: true, email, walletId: account.walletId };
    req.session.set('user', user);
    await req.session.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ statusCode:400, error: err.message });
  }
})
