import { Categories } from '.'

let categories

beforeEach(async () => {
  categories = await Categories.create({ name: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = categories.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(categories.id)
    expect(view.name).toBe(categories.name)
    expect(view.description).toBe(categories.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = categories.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(categories.id)
    expect(view.name).toBe(categories.name)
    expect(view.description).toBe(categories.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
