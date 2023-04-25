import { defineAbility } from '@casl/ability'

export default function defineAbilityFor(author) {
  return defineAbility((can, cannot) => {
    can('read', 'Post')
    can('read', 'Comment')
    if(author.admin) {
      can('manage', 'all')
      cannot('delete', 'Author', { id: author.id })
    } else if(author) {
      can('create', 'Post')
      can('manage', 'Post', { author_id: author.id })
      cannot('delete', 'Post')

      can('create', 'Comment')
      can('manage', 'Comment', { author_id: author.id })

      can('manage', 'Author', { id: author.id })
      cannot('delete', 'Author')
    }
  })
}
