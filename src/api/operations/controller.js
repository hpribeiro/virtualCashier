import { success, notFound } from '../../services/response/'
import { Operations } from '.'
import { findCategoryByName } from '../categories/controller'

export const create = ({ bodymen: { body } }, res, next) => {
  return Promise.resolve()
    .then(() => {
      let promises = body.categories.map(category => findCategoryByName(category))
      return Promise.all(promises)
    })
    .then((categories) => {
      const error = categories.find(category => category instanceof Error)
      if (error) return Promise.reject(error)
    })
    .then((categories) => categories.map(category => ({_id: category._id, name: category.name})))
    .then((categories) => {
      let operationBody = {...body}
      operationBody.categories = [...categories]
      return Operations.create(operationBody)
    })
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

export const resume = ({ querymen: { query, select, cursor } }, res, next) => {
  query = {
    $where: () => {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      return (this._id.getTimestamp() >= today)
    }
  }
  return Operations.find(query, select, cursor)
    .then((operations) => operations.map((operations) => operations.view()))
    .then((operations) => {
      const totalBalance = operations
        .map((operation) => operation.value)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
      Promise.resolve({
        operations,
        totalBalance
      })
    })
    .then(success(res))
    .catch(next)
}
