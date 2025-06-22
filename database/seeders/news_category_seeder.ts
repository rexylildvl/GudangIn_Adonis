import { BaseSeeder } from '@adonisjs/lucid/seeders'
import NewsCategory from '#models/news_category'

export default class extends BaseSeeder {
  async run() {
    const categories = [
      {
        name: 'Technology',
        description: 'Technology related news and updates',
      },
      {
        name: 'Sports',
        description: 'Sports news and updates',
      },
      {
        name: 'Business',
        description: 'Business and finance news',
      },
      {
        name: 'Entertainment',
        description: 'Entertainment and celebrity news',
      },
      {
        name: 'Health',
        description: 'Health and medical news',
      },
      {
        name: 'Politics',
        description: 'Political news and updates',
      },
    ]

    for (const category of categories) {
      await NewsCategory.firstOrCreate(
        { name: category.name }, // Search criteria
        category // Data to create if not found
      )
    }
  }
}
