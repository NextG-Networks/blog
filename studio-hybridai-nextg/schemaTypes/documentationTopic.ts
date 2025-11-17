import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'documentationTopic',
  title: 'Documentation Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Topic Title',
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
      name: 'section',
      title: 'Section',
      type: 'reference',
      to: {type: 'documentationSection'},
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order within the section (1, 2, 3, etc.)',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'brief',
      title: 'Brief Description',
      type: 'text',
      description: 'Short description of this topic',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Optional duration (e.g., "14:36")',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional video URL',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      section: 'section.title',
      order: 'order',
    },
    prepare(selection) {
      const {section, order} = selection
      return {...selection, subtitle: `${section || 'No section'} - Order: ${order}`}
    },
  },
  orderings: [
    {
      title: 'Section & Order',
      name: 'sectionOrderAsc',
      by: [
        {field: 'section.title', direction: 'asc'},
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
})

