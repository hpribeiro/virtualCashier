import { Decimal } from 'decimal.js-light'
import { success, notFound } from '../../services/response/'
import { Operations } from '.'
import { Categories } from '../categories'

const findCategoryByName = (name) =>
  Categories.findOne({name})
    .lean()
    .exec()

const findAllCategories = (categories) => Promise.resolve()
  .then(() => {
    let promises = categories.map(category => findCategoryByName(category))
    return Promise.all(promises)
  })

const verifyIfAllCategoriesExists = (categories) => {
  const categoriesNotFound = categories.filter(category => !category).length > 0
  const error = categories.find(category => category instanceof Error)
  if (error || categoriesNotFound) return Promise.reject(error)
}

export const create = ({ bodymen: { body } }, res, next) => {
  return findAllCategories(body.categories)
    .then(verifyIfAllCategoriesExists)
    .then(() => Operations.create(body))
    .then((operations) => operations.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Operations.find(query, select, cursor)
    .then((operations) => operations.map((operations) => operations.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Operations.findById(params.id)
    .then(notFound(res))
    .then((operations) => operations ? operations.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Operations.findById(params.id)
    .then(notFound(res))
    .then((operations) => operations ? ({...operations, ...body}).save() : null)
    .then((operations) => operations ? operations.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Operations.findById(params.id)
    .then(notFound(res))
    .then((operations) => operations ? operations.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const resume = ({ params }, res, next) =>
  Operations.find({
    $where: function () {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      return (this._id.getTimestamp() >= today)
    }
  })
    .then((operations) => operations.map((operations) => operations.view()))
    .then((operations) => {
      const totalBalance = operations
        .map((operation) => new Decimal(operation.value).times(operation.type))
        .reduce((accumulator, currentValue) => currentValue.add(accumulator))
        .todp(2)
        .toNumber()
      return {
        operations,
        totalBalance
      }
    })
    .then(success(res))
    .catch(next)
