import { BaseSeeder } from '@adonisjs/lucid/seeders'
import News from '#models/news'
import NewsCategory from '#models/news_category'

export default class extends BaseSeeder {
  async run() {
    // Get categories to reference
    const categories = await NewsCategory.all()

    if (categories.length === 0) {
      console.log('No categories found. Please run NewsCategory seeder first.')
      return
    }

    const news = [
      {
        title: 'New JavaScript Framework Released',
        content:
          'A revolutionary new JavaScript framework has been released that promises to change how we build web applications. This framework focuses on simplicity and performance, making it easier for developers to create fast and scalable applications.',
        categoryId: categories.find((c) => c.name === 'Technology')?.id || 1,
        author: 'John Smith',
        imageUrl: '/uploads/js-framework-release.jpg',
      },
      {
        title: 'Football World Cup 2024 Updates',
        content:
          'The latest updates from the Football World Cup 2024. Teams are preparing for the biggest tournament in football, with new strategies and player acquisitions making headlines across the sports world.',
        categoryId: categories.find((c) => c.name === 'Sports')?.id || 2,
        author: 'Mike Johnson',
        imageUrl: '/uploads/world-cup-2024.jpg',
      },
      {
        title: 'Stock Market Reaches New Heights',
        content:
          'The stock market has reached unprecedented levels this quarter, with technology stocks leading the charge. Investors are optimistic about the future of the market despite global economic uncertainties.',
        categoryId: categories.find((c) => c.name === 'Business')?.id || 3,
        author: 'Sarah Davis',
        imageUrl: '/uploads/stock-market-high.jpg',
      },
      {
        title: 'New Movie Breaks Box Office Records',
        content:
          'The latest blockbuster movie has broken multiple box office records in its opening weekend. The film, which features cutting-edge special effects and an all-star cast, has exceeded all expectations.',
        categoryId: categories.find((c) => c.name === 'Entertainment')?.id || 4,
        author: 'Emily Brown',
        imageUrl: '/uploads/movie-box-office.jpg',
      },
      {
        title: 'Breakthrough in Medical Research',
        content:
          'Scientists have made a significant breakthrough in medical research that could lead to new treatments for various diseases. This discovery represents years of dedicated research and collaboration.',
        categoryId: categories.find((c) => c.name === 'Health')?.id || 5,
        author: 'Dr. Robert Wilson',
        imageUrl: '/uploads/medical-research-breakthrough.jpg',
      },
    ]

    for (const item of news) {
      await News.firstOrCreate(
        { title: item.title }, // Search criteria
        item
      )
    }
  }
}
