import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Categories, { schema } from './model'

const router = new Router()
const { name, description } = schema.tree

/**
 * @api {post} /categories Create categories
 * @apiName CreateCategories
 * @apiGroup Categories
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Categories's name.
 * @apiParam description Categories's description.
 * @apiSuccess {Object} categories Categories's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categories not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, description }),
  create)

/**
 * @api {get} /categories Retrieve categories
 * @apiName RetrieveCategories
 * @apiGroup Categories
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} categories List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /categories/:id Retrieve categories
 * @apiName RetrieveCategories
 * @apiGroup Categories
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} categories Categories's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categories not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /categories/:id Update categories
 * @apiName UpdateCategories
 * @apiGroup Categories
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Categories's name.
 * @apiParam description Categories's description.
 * @apiSuccess {Object} categories Categories's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categories not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, description }),
  update)

/**
 * @api {delete} /categories/:id Delete categories
 * @apiName DeleteCategories
 * @apiGroup Categories
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Categories not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
