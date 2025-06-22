import News from '#models/news'
import NewsCategory from '#models/news_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
const NewsCategorySeeder = () => import('#database/seeders/news_category_seeder')
const NewsSeeder = () => import('#database/seeders/news_seeder')

export default class extends BaseSeeder {
  async run() {
    await NewsCategory.query().delete() // Clear existing categories
    await News.query().delete() // Clear existing categories

    // Import seeders dynamically
    const NewsCategorySeederModule = await NewsCategorySeeder()
    await new NewsCategorySeederModule.default(this.client).run()

    const NewsSeederModule = await NewsSeeder()
    await new NewsSeederModule.default(this.client).run()
  }
}
