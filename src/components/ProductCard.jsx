import { Info } from "lucide-react";

function ProductCard({ product, onDetailClick  }) {
    
    return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md active:scale-[0.99] active:shadow-sm">
        <img src={product.thumbnail} alt={product.title} className="mb-4 h-48 w-full rounded-xl bg-gray-50 object-contain p-3 transition duration-300 hover:scale-105" />

        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-800">{product.title}</h3>

        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">{product.category}</p>

        <div className="mb-3 flex items-center gap-1 text-sm text-stone-600">
            <span className="text-amber-500">★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-stone-400">/ 5</span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{product.description}</p>

        <hr className="my-4 border-gray-200" />

        <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-lg font-bold text-[#242424]">Rp {product.price.toLocaleString('id-ID')}</p>
            <button type="button"  onClick={() => onDetailClick(product)} className="inline-flex items-center gap-2 rounded-lg border border-[#242424] px-3 py-2 text-sm text-[#242424] transition-all duration-200 ease-out hover:bg-[#242424] hover:text-white active:scale-90 active:bg-[#1A1A1A]">
                <Info size={10} />
                Lihat Detail
            </button>
        </div>

    </article>
    )
}

export default ProductCard;