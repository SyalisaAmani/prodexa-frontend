import { Info } from "lucide-react";

function ProductCard({ product, onDetailClick  }) {
    
    return (
    <article className="group overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <img src={product.thumbnail} alt={product.title} className="mb-4 h-48 w-full rounded-xl bg-[#FAF8F4] object-contain p-4 transition duration-300 group-hover:scale-105" />

        <h3 className="mb-2 line-clamp-2 min-h-12 text-base font-semibold leading-snug text-[#242424]">{product.title}</h3>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#77736C]">{product.category}</p>

        <div className="mb-3 flex items-center gap-1.5 text-sm">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-[#242424]">
                {product.rating}
            </span>
            <span className="text-[#77736C]">/ 5</span>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-[#77736C]">{product.description}</p>

        <hr className="my-4 border-gray-200" />

        <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-lg font-bold tracking-tight text-[#242424]">Rp {product.price.toLocaleString('id-ID')}</p>
            <button type="button"  onClick={() => onDetailClick(product)} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#242424] px-3 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-[#3A3A3A] active:scale-95">
                <Info size={14} />
                Detail
            </button>
        </div>

    </article>
    )
}

export default ProductCard;