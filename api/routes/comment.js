import { Router } from 'express';
import * as commentController from '../controllers/commentController.js';

const router = Router();

router.get('/', commentController.getComments);

router.get('/:commentId', commentController.getCommentById);

router.post('/', commentController.createComment);

router.put('/:commentId', commentController.updateComment);

router.delete('/:commentId', commentController.deleteComment);

export default router;
