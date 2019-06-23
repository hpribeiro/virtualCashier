import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Categories } from '.'

const app = () => express(apiRoot, routes)

let categories

beforeEach(async () => {
  categories = await Categories.create({})
})

test('POST /categories 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
})

test('POST /categories 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /categories 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /categories 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /categories/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${categories.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(categories.id)
})

test('GET /categories/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${categories.id}`)
  expect(status).toBe(401)
})

test('GET /categories/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /categories/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${categories.id}`)
    .send({ access_token: masterKey, name: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(categories.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /categories/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${categories.id}`)
  expect(status).toBe(401)
})

test('PUT /categories/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /categories/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${categories.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /categories/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${categories.id}`)
  expect(status).toBe(401)
})

test('DELETE /categories/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
