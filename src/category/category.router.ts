import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import {
  CategoryController,
  CategoryRepository,
  CategoryService,
} from "./index";
import { validate } from "../common/middlewares/validation.middleware";
import { createCategoryDto, updateCategoryDto } from "./dto";

const categoryController = new CategoryController(
  new CategoryService(new CategoryRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Rotas para operações relacionadas a categorias
 */
const categoryRoutes = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     summary: Cria uma categoria nova
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.post(
  "/category",
  validate(createCategoryDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.create(req, res);
  }),
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tasks
 *         required: false
 *         description: Retorna tarefas associadas as categorias
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *          description: Lista de categorias retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.get(
  "/category",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.findAll(req, res);
  }),
);

/**
 * @swagger
 * /category/id/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: categoria retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.get(
  "/category/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.findOne(req, res);
  }),
);

/**
 * @swagger
 * /category/id/{id}:
 *   patch:
 *     summary: Atualiza uma categoria existente pelo ID
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do categoria a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.patch(
  "/category/id/:id",
  validate(updateCategoryDto),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.update(req, res);
  }),
);

/**
 * @swagger
 * /category/id/{id}:
 *   delete:
 *     summary: Exclui uma categoria existente pelo ID
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: categoria excluída com sucesso
 */
categoryRoutes.delete(
  "/category/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.remove(req, res);
  }),
);

export default categoryRoutes;
