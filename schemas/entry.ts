export default {
  name: 'entry',
  title: 'Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'cost',
      title: 'Cost',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
  ],
};