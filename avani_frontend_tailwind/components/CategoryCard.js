import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { baseUrl } from "../config";

const CategoryCard = ({ value }) => {
  const [isLoading, setLoading] = useState(true);
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <div className="w-full overflow-hidden bg-gray-200 h-56 relative">
        <Image
          class="rounded-t-sm"
          src={`${baseUrl}/${value.image}`}
          layout="fill"
          objectFit="cover"
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h1 className="text-center text-xl mt-3">
        {value.child_category.replace(/_/g, " ").charAt(0).toUpperCase() +
          value.child_category.replace(/_/g, " ").slice(1)}
      </h1>
      <div className="text-center">
        <Link href={`/products?search=&sort=&category=${value.child_category}`}>
          <a className="text-lg font-normal underline">View More</a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
