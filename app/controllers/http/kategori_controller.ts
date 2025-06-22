import Kategori from '#models/kategori'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KategoriController {
  // Tampilkan semua kategori
  public async index({ view }: HttpContextContract) {
    const kategori = await Kategori.all()
    return view.render('kategori', { kategori }) // contoh: resources/views/kategori/index.edge
  }

  // Tampilkan form tambah kategori
  public async create({ view }: HttpContextContract) {
    return view.render('add_kategori') // contoh: resources/views/kategori/create.edge
  }

  // Simpan kategori baru
public async store({ request, response }: HttpContextContract) {
  const id = request.input('id') // ambil dari form
  const nama_kategori = request.input('nama_kategori')

  await Kategori.create({ id, nama_kategori })

  return response.redirect('/kategori')
}


  // Tampilkan form edit kategori
  public async edit({ params, view, response }: HttpContextContract) {
    const kategori = await Kategori.find(params.id)
    if (!kategori) {
      return response.redirect('/kategori')
    }
    return view.render('kategori/edit', { kategori })
  }

  // Simpan perubahan kategori
  public async update({ params, request, response }: HttpContextContract) {
    const kategori = await Kategori.find(params.id)
    if (!kategori) {
      return response.redirect('/kategori')
    }
    kategori.nama_kategori = request.input('nama_kategori')
    await kategori.save()
    return response.redirect('/kategori')
  }

  // Hapus kategori
  public async destroy({ params, response }: HttpContextContract) {
    const kategori = await Kategori.find(params.id)
    if (kategori) {
      await kategori.delete()
    }
    return response.redirect('/kategori')
  }
}
