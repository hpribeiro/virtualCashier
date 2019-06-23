import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Operations } from '.'

const app = () => express(apiRoot, routes)

let operations

beforeEach(async () => {
  operations = await Operations.create({})
})

test('POST /operations 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, categories: 'test', type: 'test', description: 'test', value: 1, currency: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.categories).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.value).toEqual(1)
  expect(body.currency).toEqual('test')
})

test('POST /operations 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /operations 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /operations 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /operations/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${operations.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(operations.id)
})

test('GET /operations/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${operations.id}`)
  expect(status).toBe(401)
})

test('GET /operations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /operations/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${operations.id}`)
    .send({ access_token: masterKey, categories: 'test', type: 'test', description: 'test', value: 'test', currency: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(operations.id)
  expect(body.categories).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.value).toEqual('test')
  expect(body.currency).toEqual('test')
})

test('PUT /operations/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${operations.id}`)
  expect(status).toBe(401)
})

test('PUT /operations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, categories: 'test', type: 'test', description: 'test', value: 'test', currency: 'test' })
  expect(status).toBe(404)
})

test('DELETE /operations/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${operations.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /operations/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${operations.id}`)
  expect(status).toBe(401)
})

test('DELETE /operations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
