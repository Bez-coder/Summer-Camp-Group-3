import { UserService } from "../services/userService.js";


export class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async verifyToken(req, res) {
    try {
      const result = await UserService.verifyToken(req.user);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
}