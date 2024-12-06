import React from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { categoryData } from "../../data/categoryData";

const CategoryScreen = () => {
  return (
    <Layout>
      <PageTitle title="List Category" />
      <div className="card">
        <div className="card-body">
          <ol>
            {categoryData.map((value) => (
              <>
                <li className="mt-4 category_font">{value.categoryName}</li>
                <ol className="row mt-2">
                  {value.subCategory.map((value) => (
                    <div className="col-xl-3 col-md-6">
                      <li className="category_font">{value.subCategoryName}</li>
                      <ol>
                        {value.childCategory.map((value) => (
                          <li className="category_font">
                            {value.childCategoryName}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                  {/* <div className="col-xl-3 col-md-6">
                      <li>Shop By Concern</li>
                      <ol>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                      </ol>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <li>Shop By Concern</li>
                      <ol>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                      </ol>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <li>Shop By Concern</li>
                      <ol>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                        <li>jdlfkajd</li>
                      </ol>
                    </div> */}
                </ol>
              </>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryScreen;
