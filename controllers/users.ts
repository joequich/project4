import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async(req: Request, res: Response) => {
    const users = await User.findAll()
    res.json({users});
}

export const getUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if(id) {
        res.json({user});
    } else {
        res.status(400).json({
            message: 'User not found'
        });
    }
}

export const postUser = async(req: Request, res: Response) => {
    const { body } = req;
    try {
        const existEmail = await User.findOne({
            where: body.email
        });

        if(existEmail) {
            return res.status(400).json({
                message: 'A user with this email already exists'
            });
        }

        const user = new User();
        await user.save();

        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Talk to the administrator'
        });
    }
}

export const putUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await user.update(body);

        res.json({
            user,
            message: 'User updated'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Talk to the administrator'
        });
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // await user.destroy();
        await user.update({status: false});

        res.json({
            user,
            message: 'User deleted'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Talk to the administrator'
        });
    }
}
