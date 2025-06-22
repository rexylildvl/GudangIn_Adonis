import type { HttpContextContract } from '@adonisjs/core/http'
import Produk from '#models/produk'
import Kategori from '#models/kategori'
import Supplier from '#models/supplier'

export default class ProdukController {
  // GET /produk
  public async index({ view }: HttpContextContract) {
    const produkList = await Produk.query()
      .preload('kategori')
      .preload('supplier')

    return view.render('produk', { produkList })
  }

  // GET /produk/tambah
  public async create({ view }: HttpContextContract) {
    const kategoriList = await Kategori.all()
    const supplierList = await Supplier.all()

    return view.render('add_produk', {
      kategoriList,
      supplierList,
    })
  }

  // POST /produk
  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'id',
      'nama_produk',
      'harga',
      'stok',
      'kategori_id',
      'supplier_id',
    ])

    await Produk.create({
      id: data.id,
      namaProduk: data.nama_produk,
      harga: data.harga,
      stok: data.stok,
      kategoriId: data.kategori_id,
      supplierId: data.supplier_id,
    })

    return response.redirect('/produk')
  }

  // GET /produk/:id/edit
  public async edit({ params, view }: HttpContextContract) {
    const produk = await Produk.findOrFail(params.id)
    const kategoriList = await Kategori.all()
    const supplierList = await Supplier.all()

    return view.render('produk/edit', {
      produk,
      kategoriList,
      supplierList,
    })
  }

  // POST /produk/:id/update
  public async update({ params, request, response }: HttpContextContract) {
    const produk = await Produk.findOrFail(params.id)

    const data = request.only([
      'nama_produk',
      'harga',
      'stok',
      'kategori_id',
      'supplier_id',
    ])

    produk.merge({
      id: data.id,
      namaProduk: data.nama_produk,
      harga: data.harga,
      stok: data.stok,
      kategoriId: data.kategori_id,
      supplierId: data.supplier_id,
    })

    await produk.save()

    return response.redirect('/produk')
  }

  // POST /produk/:id/delete
  public async destroy({ params, response }: HttpContextContract) {
    const produk = await Produk.findOrFail(params.id)
    await produk.delete()

    return response.redirect('/produk')
  }
}
