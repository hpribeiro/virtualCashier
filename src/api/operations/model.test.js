import { Operations } from '.'

let operations

beforeEach(async () => {
  operations = await Operations.create({ categories: 'test', type: 'test', description: 'test', value: 'test', currency: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = operations.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(operations.id)
    expect(view.categories).toBe(operations.categories)
    expect(view.type).toBe(operations.type)
    expect(view.description).toBe(operations.description)
    expect(view.value).toBe(operations.value)
    expect(view.currency).toBe(operations.currency)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = operations.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(operations.id)
    expect(view.categories).toBe(operations.categories)
    expect(view.type).toBe(operations.type)
    expect(view.description).toBe(operations.description)
    expect(view.value).toBe(operations.value)
    expect(view.currency).toBe(operations.currency)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
