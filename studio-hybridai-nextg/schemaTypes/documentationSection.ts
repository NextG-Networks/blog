import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'documentationSection',
  title: 'Documentation Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this section',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this section appears (1, 2, 3, etc.)',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'reference', to: {type: 'documentationTopic'}}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection) {
      const {order} = selection
      return {...selection, subtitle: `Order: ${order}`}
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
})

