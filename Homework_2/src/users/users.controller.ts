import { Router, Request, Response } from 'express';

import { UsersService } from './users.service';
import { usersValidations } from './users.validations';

export class UsersController {
    public router: Router;
    private usersService: UsersService;

    constructor() {
        this.router = Router();
        this.usersService = new UsersService();
        this.routes();
    }

    public async create({ body }: Request, res: Response) {
        const validate = usersValidations.validate(body);
        if (validate.error) res.status(400).json({ error: validate.error })
        const user = await this.usersService.add(body);
        res.status(201).json(user);
    }

    public async list({ body }: Request, res: Response){
        const user = await this.usersService.getAutoSuggestUsers(body);
        res.status(200).json(user);
    }

    public async findById({ params }: Request, res: Response) {
        const user = await this.usersService.findById(params.id);
        user
            ? res.status(200).json(user)
            : res.status(404).json({ message: 'User not found' });
    }

    public async update({ params, body }: Request, res: Response) {
        const validate = usersValidations.validate(body);
        if (validate.error) res.status(400).json({ error: validate.error })
        const user = await this.usersService.update(params.id, body);
        user
            ? res.status(200).json(user)
            : res.status(404).json({ message: 'User not found' });
    }

    public async delete({ params }: Request, res: Response) {
        const user = await this.usersService.remove(params.id);
        user
            ? res.status(200).json(user)
            : res.status(404).json({ message: 'User not found' });
    }

    public routes() {
        this.router.get('/', this.list);
        this.router.post('/', this.create);
        this.router.get('/:id', this.findById);
        this.router.patch('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
