import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Supplier from '#models/supplier'

export default class SupplierController {
  // Menampilkan daftar semua supplier
  public async index({ view }: HttpContextContract) {
    const suppliers = await Supplier.query().withCount('produk')
    return view.render('supplier', { supplierList: suppliers })
  }

  // Menampilkan form tambah supplier
  public async create({ view }: HttpContextContract) {
    return view.render('add_supplier')
  }

  // Menyimpan data supplier baru
  public async store({ request, response, session }: HttpContextContract) {
    const data = request.only(['id', 'nama_supplier', 'alamat', 'telepon'])

    // Cek jika ID sudah ada
    const existing = await Supplier.find(data.id)
    if (existing) {
      session.flash({ error: 'ID supplier sudah digunakan' })
      return response.redirect().back()
    }

    await Supplier.create({
      id: data.id,
      nama_supplier: data.nama_supplier,
      alamat: data.alamat,
      telepon: data.telepon,
    })

    return response.redirect('/supplier')
  }

  // Menampilkan form edit supplier
  public async edit({ params, view }: HttpContextContract) {
    const supplier = await Supplier.findOrFail(params.id)
    return view.render('edit_supplier', { supplier })
  }

  // Menyimpan perubahan supplier
  public async update({ params, request, response }: HttpContextContract) {
    const supplier = await Supplier.findOrFail(params.id)
    const data = request.only(['nama_supplier', 'alamat', 'telepon'])

    supplier.nama_supplier = data.nama_supplier
    supplier.alamat = data.alamat
    supplier.telepon = data.telepon

    await supplier.save()
    return response.redirect('/supplier')
  }

  // Menghapus supplier
  public async destroy({ params, response }: HttpContextContract) {
    const supplier = await Supplier.findOrFail(params.id)
    await supplier.delete()
    return response.redirect('/supplier')
  }
}
