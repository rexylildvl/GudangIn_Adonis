import type { HttpContextContract } from '@adonisjs/core/http'
import Penjualan from '#models/penjualan'
import Produk from '#models/produk'
import { DateTime } from 'luxon'

export default class SalesInventoryController {
  // GET /salesinventory
  public async index({ view }: HttpContextContract) {
    // Total penjualan harian (group by tanggal)
    const totalPenjualanHarian = await Penjualan.query()
      .select('tanggal')
      .sum('jumlah as total')
      .groupBy('tanggal')

    // Stok tersisa per produk
    const stokProduk = await Produk.all()

    return view.render('salesinventory', {
      totalPenjualanHarian,
      stokProduk,
    })
  }

  // POST /salesinventory
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['produk_id', 'jumlah'])

    await Penjualan.create({
      id: crypto.randomUUID().slice(0, 5).toUpperCase(), // auto generate ID
      produkId: data.produk_id,
      jumlah: Number(data.jumlah),
      tanggal: DateTime.now().toISODate(),
    })

    // Kurangi stok produk
    const produk = await Produk.findOrFail(data.produk_id)
    produk.stok -= Number(data.jumlah)
    await produk.save()

    return response.redirect('/salesinventory')
  }
}
