import type { HttpContext } from '@adonisjs/core/http'
import NewsCategory from '#models/news_category'

export default class NewsCategoriesController {
  async index({ inertia }: HttpContext) {
    const newsCategories = await NewsCategory.query().orderBy('name', 'desc')

    return inertia.render('news-categories/index', {
      newsCategories: newsCategories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        createdAt: category.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: category.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss'),
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('news-categories/create')
  }

  async store({ request, response, session }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])

    try {
      await NewsCategory.create({
        name,
        description: description || null,
      })

      session.flash('success', 'News category created successfully.')
      return response.redirect('/news-categories')
    } catch (error) {
      session.flash('error', 'Failed to create news category. Please try again.')
      return response.redirect().back()
    }
  }

  async edit({ inertia, params }: HttpContext) {
    const newsCategory = await NewsCategory.findOrFail(params.id)

    return inertia.render('news-categories/edit', {
      newsCategory: {
        id: newsCategory.id,
        name: newsCategory.name,
        slug: newsCategory.slug,
        description: newsCategory.description,
        createdAt: newsCategory.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: newsCategory.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss'),
      },
    })
  }

  async update({ request, response, session, params }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])

    try {
      const newsCategory = await NewsCategory.findOrFail(params.id)
      newsCategory.name = name
      newsCategory.description = description || null
      await newsCategory.save()

      session.flash('success', 'News category updated successfully.')
      return response.redirect('/news-categories')
    } catch (error) {
      session.flash('error', 'Failed to update news category. Please try again.')
      return response.redirect().back()
    }
  }

  async destroy({ response, session, params }: HttpContext) {
    try {
      const newsCategory = await NewsCategory.findOrFail(params.id)
      await newsCategory.delete()

      session.flash('success', 'News category deleted successfully.')
      return response.redirect('/news-categories')
    } catch (error) {
      session.flash('error', 'Failed to delete news category. Please try again.')
      return response.redirect().back()
    }
  }

  async show({ inertia, params }: HttpContext) {
    const newsCategory = await NewsCategory.findOrFail(params.id)

    return inertia.render('news-categories/show', {
      newsCategory: {
        id: newsCategory.id,
        name: newsCategory.name,
        slug: newsCategory.slug,
        description: newsCategory.description,
        createdAt: newsCategory.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: newsCategory.updatedAt.toFormat('yyyy-MM-dd HH:mm:ss'),
      },
    })
  }
}
