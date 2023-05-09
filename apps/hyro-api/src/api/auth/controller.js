import httpStatus from 'http-status';

import { createUserAdmin, getUser } from '../../repositories';
import { compare, createToken, encode } from '../../services';

async function signIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await getUser({ email, role: req.body.user_type }, ['password']);
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'wrong_identifiers' });
  }

  const isPasswordChecked = await compare(password, user.password);
  if (!isPasswordChecked) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'wrong_identifiers' });
  }

  const token = createToken({
    issuerId: user._id,
    userId: user._id,
    role: user.role,
    givenName: `${user.first_name} ${user.last_name}`,
  });

  return res.send({ token });
}

async function adminSignUp(req, res) {
  const { first_name, last_name, email, phone, password } = req.body;

  const hashedPassword = await encode(password);

  const user = await createUserAdmin({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
  });

  if (!user) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  }

  const token = createToken({
    issuerId: user._id,
    userId: user._id,
    role: user.role,
    givenName: `${user.first_name} ${user.last_name}`,
  });

  return res.send({ token });
}

export default {
  signIn,
  adminSignUp,
};
