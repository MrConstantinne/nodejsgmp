import {Router, Request} from 'express';

import {add, findById, getAutoSuggestUsers, remove, update} from './users.service';
import {schemaValidations} from './schema.validations';

const users = Router();

users.post('/user', async ({ body }, res) => {
    const validate = schemaValidations.validate(body);
    if (validate.error) res.status(400).json({ error: validate.error })
    const user = await add(body);
    res.status(200).json(user);
});

users.get('/user', async ({ body }: Request, res) => {
    const user = await getAutoSuggestUsers(body);
    res.status(200).json(user);
})

users.get('/user/:id', async ({ params }: Request, res) => {
    const user = await findById(params.id);
    if (!user) res.status(404).json({message: 'User not found'});
    res.json(user);
})

users.patch('/user/:id', async ({ params, body }: Request, res) => {
    const validate = schemaValidations.validate(body);
    if (validate.error) res.status(400).json({ error: validate.error })
    const user = await update(params.id, body);
    if (!user) res.status(404).json({message: 'User not found'});
    res.json(user);
})

users.delete('/user/:id', async ({ params }: Request, res) => {
    const user = await remove(params.id);
    if (!user) res.status(404).json({message: 'User not found'});
    res.json(user);
})

export { users };
