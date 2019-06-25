import mongoose, { Schema } from 'mongoose'

const operationsSchema = new Schema({
  categories: {
    type: String
  },
  type: {
    type: Number,
    enum: [-1, 1]
  },
  description: {
    type: String
  },
  value: {
    type: Number
  },
  currency: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

operationsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      categories: this.categories,
      type: this.type,
      description: this.description,
      value: this.value,
      currency: this.currency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Operations', operationsSchema)

export const schema = model.schema
export default model
