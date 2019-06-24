import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy, resume } from './controller'
import { schema } from './model'
export Operations, { schema } from './model'

const router = new Router()
const { categories, type, description, value, currency } = schema.tree

/**
 * @api {post} /operations Create operations
 * @apiName CreateOperations
 * @apiGroup Operations
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam categories Operations's categories.
 * @apiParam type Operations's type.
 * @apiParam description Operations's description.
 * @apiParam value Operations's value.
 * @apiParam currency Operations's currency.
 * @apiSuccess {Object} operations Operations's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Operations not found.
 * @apiError 401 master access only.
 */
router.post(
  '/',
  master(),
  body({ categories, type, description, value, currency }),
  create
)

/**
 * @api {get} /operations Retrieve operations
 * @apiName RetrieveOperations
 * @apiGroup Operations
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} operations List of operations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/', master(), query(), index)

/**
 * @api {get} /operations/:id Retrieve operations
 * @apiName RetrieveOperations
 * @apiGroup Operations
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} operations Operations's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Operations not found.
 * @apiError 401 master access only.
 */
router.get('/:id', master(), show)

/**
 * @api {put} /operations/:id Update operations
 * @apiName UpdateOperations
 * @apiGroup Operations
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam categories Operations's categories.
 * @apiParam type Operations's type.
 * @apiParam description Operations's description.
 * @apiParam value Operations's value.
 * @apiParam currency Operations's currency.
 * @apiSuccess {Object} operations Operations's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Operations not found.
 * @apiError 401 master access only.
 */
router.put(
  '/:id',
  master(),
  body({ categories, type, description, value, currency }),
  update
)

/**
 * @api {delete} /operations/:id Delete operations
 * @apiName DeleteOperations
 * @apiGroup Operations
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Operations not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', master(), destroy)

/**
 * @api {get} /operations Retrieve operations
 * @apiName RetrieveOperations
 * @apiGroup Operations
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} operations List of operations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/resume/', master(), query(), resume)

export default router
