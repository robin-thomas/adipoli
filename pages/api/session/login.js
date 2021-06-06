import CryptoJS from 'crypto-js';
import * as yup from 'yup';

import withSession from '../../../utils/session';
import AccountService from '../../../utils/db/account';

export default withSession(async (req, res) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().max(100).required(),
      password: yup.string().max(32).required(),
    });

    try {
      const isValid = await schema.isValid(req.body);
    } catch (err) {
      throw new Error('Required fields missing or invalid in request');
    }

    // Verify that the user exists.
    const { email, password } = req.body;
    const account = await AccountService.getAccountByEmail(email);
    if (!account) {
      return res.status(404).json({});
    }

    // Verify that the password matches.
    const hash = CryptoJS.SHA3(`${password}${account.salt}`).toString();
    if (hash !== account.hash) {
      throw new Error('Incorrect username or password!');
    }

    const user = {
      isLoggedIn: true,
      email,
      walletId: account.walletId,
      name: account.fullName,
    };
    req.session.set('user', user);
    await req.session.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ statusCode: 400, error: err.message });
  }
});
