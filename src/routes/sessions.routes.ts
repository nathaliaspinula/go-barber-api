import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const autheticateUser = new AuthenticationUserService();

    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (exception) {
    return response.status(400).json({ error: exception.message });
  }
});

export default sessionsRouter;
