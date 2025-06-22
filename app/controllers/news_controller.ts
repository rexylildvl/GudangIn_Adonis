import News from '#models/news'
import NewsCategory from '#models/news_category'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'

export default class NewsController {
  async index({ inertia }: HttpContext) {
    const news = await News.query()
      .preload('category', (query) => query.orderBy('name', 'asc'))
      .orderBy('createdAt', 'desc')
      .paginate(1, 10)

    return inertia.render('news/index', {
      news: news.toJSON().data.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: item.content,
        category: {
          id: item.category.id,
          name: item.category.name,
          slug: item.category.slug,
        },
        imageUrl: item.imageUrl || null,
        createdAt: item.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: item.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss'),
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    const newsCategories = await NewsCategory.query().orderBy('name', 'asc')

    return inertia.render('news/create', {
      newsCategories: newsCategories.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
      })),
    })
  }

  async store({ request, response, session }: HttpContext) {
    logger.info('Starting news creation process') // <-- Log info

    const { title, content, categoryId, author } = request.only([
      'title',
      'content',
      'categoryId',
      'author',
    ])

    logger.debug('Request data received', { title, categoryId, author }) // <-- Log debug

    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'gif'],
    })

    let imageUrl: string | null = null

    if (image) {
      logger.info('Image upload detected', {
        originalName: image.clientName,
        size: image.size,
        extname: image.extname,
      })

      const fileName = `${cuid()}.${image.extname}`

      await image.move(app.makePath('storage/uploads'), {
        name: fileName,
      })

      if (image.state === 'moved') {
        imageUrl = `/uploads/${fileName}`
        logger.info('Image uploaded successfully', { fileName, imageUrl })
      } else {
        logger.error('Image upload failed', {
          errors: image.errors,
          state: image.state,
        })
        session.flash('error', 'Failed to upload image.')
        return response.redirect().back()
      }
    }

    try {
      const news = await News.create({
        title,
        content,
        categoryId,
        author,
        imageUrl,
      })

      logger.info('News article created successfully', {
        newsId: news.id,
        title: news.title,
        author: news.author,
      })

      session.flash('success', 'News article created successfully.')
      return response.redirect('/news')
    } catch (error) {
      logger.error('Failed to create news article', {
        error: error.message,
        stack: error.stack,
        requestData: { title, categoryId, author },
      })

      session.flash('error', 'Failed to create news article. Please try again.')
      return response.redirect().back()
    }
  }

  async edit({ inertia, params }: HttpContext) {
    const news = await News.query().where('id', params.id).preload('category').firstOrFail()
    const newsCategories = await NewsCategory.query().orderBy('name', 'asc')

    return inertia.render('news/edit', {
      news: {
        id: news.id,
        title: news.title,
        slug: news.slug,
        content: news.content,
        categoryId: news.categoryId,
        author: news.author,
        category: {
          id: news.category.id,
          name: news.category.name,
          slug: news.category.slug,
        },
        createdAt: news.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: news.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        imageUrl: news.imageUrl || null,
      },
      newsCategories: newsCategories.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
      })),
    })
  }

  async update({ request, response, session, params }: HttpContext) {
    const { title, content, slug, categoryId, author } = request.only([
      'title',
      'content',
      'slug',
      'categoryId',
      'author',
    ])

    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'gif'],
    })

    let imageUrl: string | null = null

    if (image) {
      const fileName = `${cuid()}.${image.extname}`

      await image.move(app.makePath('storage/uploads'), {
        name: fileName,
      })

      if (image.state === 'moved') {
        imageUrl = `/uploads/${fileName}`
      } else {
        session.flash('error', 'Failed to upload image.')
        return response.redirect().back()
      }
    }

    try {
      const news = await News.findOrFail(params.id)
      news.title = title
      news.content = content
      news.slug = slug
      news.categoryId = categoryId
      news.author = author
      news.imageUrl = imageUrl || news.imageUrl
      await news.save()

      session.flash('success', 'News article updated successfully.')
      return response.redirect('/news')
    } catch (error) {
      session.flash('error', 'Failed to update news article. Please try again.')
      return response.redirect().back()
    }
  }

  async destroy({ response, session, params }: HttpContext) {
    try {
      const news = await News.findOrFail(params.id)
      await news.delete()

      session.flash('success', 'News article deleted successfully.')
      return response.redirect('/news')
    } catch (error) {
      session.flash('error', 'Failed to delete news article. Please try again.')
      return response.redirect().back()
    }
  }

  async show({ inertia, params }: HttpContext) {
    const news = await News.query().where('id', params.id).preload('category').firstOrFail()

    return inertia.render('news/show', {
      news: {
        id: news.id,
        title: news.title,
        slug: news.slug,
        content: news.content,
        author: news.author,
        category: {
          id: news.category.id,
          name: news.category.name,
          slug: news.category.slug,
        },
        imageUrl: news.imageUrl || null,
        createdAt: news.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: news.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss'),
      },
    })
  }
}
