import ProductGallery from "@/components/ProductDetails/ProductGallery";
import ProductInfo from "@/components/ProductDetails/ProductInfo";
import ProductTabs from "@/components/ProductDetails/ProductTabs";
import SimilarProducts from "@/components/ProductDetails/SimilarProducts";
import { getProductById, getProducts } from "@/lib/product.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const productData = await getProductById(id);
  const productsData = await getProducts();

  const product = productData.data;
  const products = productsData.data;

  return (
    <main className="py-6">
      {/* Product */}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}

          <ProductGallery product={product} />

          {/* Product Information */}

          <ProductInfo product={product} />
        </div>
      </div>

      {/* Product Tabs */}

      <ProductTabs product={product} />

      {/* Similar Products */}

      <SimilarProducts products={products} currentProductId={product._id} />
    </main>
  );
}
