import {Router} from "express"
import {getTask, addTask,deleteTask,updateTask,updatedTask } from "../controllers/task.controller.js";
const router = Router();

router.route("/task").get(getTask)

router.route("/task").post(addTask)
router.route("/updatetask/:id").get(updateTask)
router.route("/updatetask/:id").post(updatedTask)
router.route("/deletetask/:id").get(deleteTask)

export default router